const express = require("express");
const { PrismaClient } = require('@prisma/client');
const zod = require('zod');
const StatusCode = require('../constants/statusCode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const { generateOtp, sendOtp, sendLoginCredentials } = require("../services/otpService");
const { adminAuthMiddleware } = require("../middleware/authMiddleware");
const { generateCredentials, generateRandomNumber, generateRandomPassword } = require("../services/generate");

dotenv.config();
const JWT_SECRET_KEY_ADMIN = process.env.JWT_SECRET_KEY_ADMIN;

const prisma = new PrismaClient();
const router = express.Router();

const admin_signupSchema = zod.object({
    name: zod.string(),
    username: zod.string(),
    password: zod.string().min(6),
    mobileNumber: zod.string(),
    position: zod.string()

});

router.post('/signup', adminAuthMiddleware, async (req, res) => {
    try {
        const login_admin = await prisma.admin.findFirst({
            where: {
                adminId: req.adminId
            }
        })
        if (login_admin.position === "administrator") {

            const { name, username, password, mobileNumber, position } = req.body

            const { success } = admin_signupSchema.safeParse(req.body)

            if (!success) {
                return res.status(StatusCode.BAD_REQUEST).json({
                    message: "Invalid Inputs"
                });
            }

            const adminExist = await prisma.admin.findUnique({
                where: {
                    username: username
                }
            })

            if (adminExist) {
                return res.json({
                    message: "Admin Already Exist",
                    id: adminExist.userId
                });
            }


            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            const admin = await prisma.admin.create({
                data: {
                    name: name,
                    username: username,
                    password: secPass,
                    mobileNumber: mobileNumber,
                    position: position
                }
            })

            sendLoginCredentials(username, password, mobileNumber)

            return res.status(StatusCode.OK).json({
                success: true,
                message: `New Admin Created and Login Credentials Send to ${admin.mobileNumber}`,


            })

        } else {
            return res.status(StatusCode.NOT_ALLOWED).json({
                success: false,
                message: "You're Not Allowed to Create another admin"
            })
        }


    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }
    res.send("Admin signup")
})

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(6),
});
router.post('/signin', async (req, res) => {

    try {

        const { username, password } = req.body

        const { success } = signinSchema.safeParse(req.body)

        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: "Invalid Inputs"
            });
        }

        const admin = await prisma.admin.findUnique({
            where: {
                username: username
            }
        })


        if (!admin) {
            return res.status(StatusCode.NOT_FOUND).json({
                success: false,
                message: "Admin doesn't exist"
            })
        }

        const password_compare = await bcrypt.compare(password, admin.password)

        if (!password_compare || admin.username !== username) {
            return res.status(StatusCode.UNAUTHORIZED).json({
                success: false,
                message: "Incorrect Password"
            })
        }

        const token = jwt.sign({ adminId: admin.adminId }, JWT_SECRET_KEY_ADMIN)

        return res.status(StatusCode.OK).json({
            success: true,
            token: token,
            username: admin.username,
            adminName: admin.name
        });

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }

})
router.get('/event-application/applications', adminAuthMiddleware, async (req, res) => {
    const applications = await prisma.eventApplication.findMany()
    res.status(StatusCode.OK).json({
        applications: applications
    })
})
router.post('/event-application/:id/approved', adminAuthMiddleware, async (req, res) => {


    try {
        const applicationId = parseInt(req.params.id)

        const application = await prisma.eventApplication.findUnique({
            where: {
                applicationId: applicationId
            }
        })

        if (application.status === "approved") {
            return res.status(StatusCode.CONFLICT).json({
                success: false,
                message: "Application already approved"
            })
        }

        await prisma.eventApplication.update({
            where: {
                applicationId: applicationId
            },
            data: {
                status: "approved"
            }
        })


        const organizer_credentials = await generateCredentials(application.eventName)
        console.log(organizer_credentials)

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(organizer_credentials.password, salt);


        const organizer = await prisma.organizer.create({
            data: {
                userId: application.userId,
                organizerUsername: organizer_credentials.username,
                organizerPassword: secPass,
                mobileNumber: application.mobileNumber
            }
        })

        await sendLoginCredentials(organizer.organizerUsername, organizer_credentials.password, organizer.mobileNumber)

        res.status(StatusCode.CREATED).json({
            success: true,
            message: `Organizer Login credentials send to ${organizer.mobileNumber}`
        })
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }

})

router.post('/organizer/:id/resend-credentials', adminAuthMiddleware, async (req, res) => {
    try {
        const organizerId = parseInt(req.params.id)

        const organizer = await prisma.organizer.findUnique({
            where: {
                organizerId: organizerId
            }
        })

        if (!organizer) {
            return res.status(StatusCode.NOT_FOUND).json({
                success: true,
                message: "organizer not exist"
            })
        }

        const generated_password = generateRandomPassword(8)

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(generated_password, salt);

        const update_organizer = await prisma.organizer.update({
            where: {
                organizerId: organizerId
            },
            data: {
                organizerPassword: secPass
            },
        })

        if (!update_organizer) {
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "An error occurred while updating the organizer's password."
            })
        }

        await sendLoginCredentials(
            update_organizer.organizerUsername,
            generated_password,
            update_organizer.mobileNumber
        )

        return res.status(StatusCode.OK).json({
            success: true,
            message: `Login Credentials Sent to ${update_organizer.mobileNumber}`
        })

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }
})
router.post('/event-application/:id/rejected', async (req, res) => {

    try {
        const applicationId = parseInt(req.params.id)

        await prisma.$transaction(async (prisma) => {
            const eventApplication = await prisma.eventApplication.update({
                where: {
                    applicationId: applicationId
                },
                data: {
                    status: "rejected"
                }
            })



            await prisma.archivedEventApplication.create({
                data: {
                    userId: eventApplication.userId,
                    eventName: eventApplication.eventName,
                    eventType: eventApplication.eventType,
                    eventDescription: eventApplication.eventDescription,
                    mobileNumber: eventApplication.mobileNumber,
                    email: eventApplication.email,
                    status: eventApplication.status,
                    expectedAudience: eventApplication.expectedAudience,
                    venue: eventApplication.venue,
                    proposedDate: eventApplication.proposedDate
                }
            })



            await prisma.eventApplication.delete({
                where: {
                    applicationId: applicationId
                }
            })

        });

        return res.status(StatusCode.OK).json({
            success: true,
            message: "Application rejected"
        })
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }
})
module.exports = router;