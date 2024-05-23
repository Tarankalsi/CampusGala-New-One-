const express = require("express");
const { PrismaClient } = require('@prisma/client');
const zod = require('zod');
const StatusCode = require('../constants/statusCode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const { generateOtp, sendOtp } = require("../services/otpService");
const { userAuthMiddleware } = require("../middleware/authMiddleware");
const { getuser } = require("../controllers/userController");


dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const prisma = new PrismaClient();
const router = express.Router();

const signupSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    mobileNumber: zod.string(),
    password: zod.string().min(6)
});

router.post('/signup', async (req, res) => {
    try {
        const body = req.body;
        const { firstName, lastName, mobileNumber, password } = body;
        const verification = "pending";

        const { success ,error } = signupSchema.safeParse(body);

        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                message: "Invalid Inputs",
                error : error.errors
            });
        }

        const userExist = await prisma.user.findUnique({
            where: {
                mobileNumber: body.mobileNumber
            }
        });

        if (userExist) {
            if (userExist.verification === "pending") {
                return res.status(StatusCode.CONFLICT).json({
                    success: false,
                    message: "User already exists and verification is pending"
                });
            } else {
                return res.status(StatusCode.CONFLICT).json({
                    success: false,
                    message: "User already exists"
                });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);


        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                mobileNumber,
                password: secPass,
                verification,
            }
        });

        await prisma.personalDetails.create({
            data: {
                userId: user.userId
            }
        })

        const token = jwt.sign({ userId: user.userId }, JWT_SECRET_KEY)


        const generated_otp = await generateOtp(6, user);
        await sendOtp(user.mobileNumber, generated_otp);


        return res.status(StatusCode.OK).json({
            success  : true,
            message: `User Created - OTP Sent to ${user.mobileNumber}`,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success : false,
            message: "Internal Error",
            error : error.message
        });
    }
});


const signinSchema = zod.object({
    mobileNumber: zod.string(),
    password: zod.string(),
});

// Login User
router.post('/signin', async (req, res) => {
    try {

        const { mobileNumber, password } = req.body

        const { success } = signinSchema.safeParse(req.body)

        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: "Invalid Inputs"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                mobileNumber: mobileNumber
            }
        })

        if (!user) {
            return res.status(StatusCode.NOT_FOUND).json({
                success: false,
                message: "User Not Exist"
            })
        }
        if (user.verification === "pending") {
            const token = jwt.sign({ userId: user.userId }, JWT_SECRET_KEY)
            const otp = await generateOtp(6, user);
            await sendOtp(user.mobileNumber, otp);

            return res.status(StatusCode.OK).json({
                success : true,
                message: "Verification Pending  - OTP Send",
                verification : user.verification,
                token : token
            })
        }

        const userDetails = {
            userId: user.userId,
            mobileNumber: user.mobileNumber,
            firstName: user.firstName,
            lastName: user.lastName,
            created_at: user.createdAt,
            updated_at: user.updatedAt
        }
        const password_compare = await bcrypt.compare(password, user.password)

        if (!password_compare) {
            return res.status(StatusCode.UNAUTHORIZED).json({
                success: false,
                message: "Incorrect Password"
            })
        }

        const token = jwt.sign({ userId: user.userId }, JWT_SECRET_KEY)
        return res.status(StatusCode.OK).json({
            success: true,
            token: token,
            verification : user.verification,
            message : "Sign in Successfully"

        });

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }
});

router.post('/otp-verification', userAuthMiddleware, async (req, res) => {
    try {
        const { otp } = req.body;

        const userId = parseInt(req.userId)

        const user_response = await prisma.user.findUnique({
            where: {
                userId: userId
            }
        })

        const otp_response = await prisma.otp.findFirst({
            where: {
                userId: userId
            }
        })


        if (otp_response.status == "valid") {
            if (otp === otp_response.otp) {
                await prisma.user.update({
                    where: {
                        userId: userId
                    },
                    data: {
                        verification: "resolved"
                    }
                })
                return res.status(StatusCode.OK).json({
                    success: true,
                    message: "OTP - Verification Completed"
                })
            } else {
                return res.status(StatusCode.UNAUTHORIZED).json({
                    success: false,
                    message: "Incorrect OTP"
                })
            }
        } else if (otp_response.status === "expired") {
            return res.status(StatusCode.EXPIRED).json({
                success: false,
                message: "OTP is expired"
            })
        } else {
            return res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                message: "Enter Valid OTP"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }

});


router.post('/otp-verification/resend-otp', userAuthMiddleware, async (req, res) => {
    try {
        const user = await getuser(req.userId)
        const otp = await generateOtp(6, user)
        await sendOtp(user.mobileNumber, otp)

        return res.status(StatusCode.OK).json({
            success: true,
            message: `Resent Otp at ${user.mobileNumber}`,
            otp: otp
        })
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }
})



const eventApplicationSchema = zod.object({
    eventName: zod.string(),
    eventDescription: zod.string(),
    eventType: zod.string(),
    mobileNumber: zod.string(),
    email: zod.string().email(),
    expectedAudience: zod.number(),
    venue: zod.string(),
    proposedDate: zod.date()
});


router.post('/event-application', userAuthMiddleware, async (req, res) => {
    try {

        const body = req.body
        const proposedDate = new Date(body.proposedDate)

        const { success } = eventApplicationSchema.safeParse({ ...body, proposedDate })
        console.log(success)
        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                message: "zod validation failed"
            });
        }
        console.log(body)
        console.log(proposedDate)

        const application = await prisma.eventApplication.create({
            data: {
                userId: req.userId,
                eventName: body.eventName,
                eventType: body.eventType,
                eventDescription: body.eventDescription,
                mobileNumber: body.mobileNumber,
                email: body.email,
                expectedAudience: body.expectedAudience,
                venue: body.venue,
                proposedDate: proposedDate,
                status: "pending"
            }
        })

        return res.status(StatusCode.OK).json({
            success: true,
            message: "Your Application is Submitted",
            application: application
        })


    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }

    // const application = await prisma.eventApplication.create({
    //     data :{

    //     }
    // })

})

router.get('/event-application', userAuthMiddleware, async (req, res) => {
    try {
        const applications = await prisma.eventApplication.findMany({
            where: {
                userId: req.userId
            }
        })

        if (!applications) {
            return res.status(StatusCode.OK).json({
                success: false,
                message: "No Application Exist"
            })
        }

        return res.status(StatusCode.OK).json({
            success: true,
            applications: applications
        })

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }
})


router.get('/details', userAuthMiddleware, async (req, res) => {
    try {
        console.log(req.userId)

        const user = await prisma.user.findUnique({
            where: { userId: req.userId }
            ,
            select: {
                firstName: true,
                lastName: true,
                mobileNumber: true,
                userDetails: true
            }
        })

        if (!user) {
            return res.status(StatusCode.NOT_FOUND).json({
                success: false,
                message: "User Not Found"
            })
        }

        return res.status(StatusCode.OK).json({
            success: true,
            user: user
        })

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }
})


const updateProfileSchema = zod.object({
    email: zod.string().email().optional(),
    dateOfBirth: zod.date().optional(),
    gender: zod.string().optional(),
    pincode: zod.number().optional(),
    houseNumber: zod.string().optional(),
    street: zod.string().optional(),
    landmark: zod.string().optional(),
    city: zod.string().optional(),
    nationality: zod.string().optional(),
})
router.post('/update-profile', userAuthMiddleware, async (req, res) => {
    try {
        const body = req.body
        if (body.dateOfBirth) {
            body.dateOfBirth = new Date(body.dateOfBirth)
        }

        const { success } = updateProfileSchema.safeParse(body)

        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                message: "zod validation failed"
            })
        }

        await prisma.personalDetails.update({
            where: {
                userId: req.userId
            },
            data: body
        })

        return res.status(StatusCode.OK).json({
            succcess: true,
            message: "User Profile Updated"
        })

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }
})

router.get('/events', async (req, res) => {
    try {
        const events = await prisma.event.findMany()

        if (!events) {
            return res.status(StatusCode.NOT_FOUND).json({
                success: false,
                message: "Not Found any Event"
            })
        }

        return res.status(StatusCode.OK).json({
            success: true,
            events: events
        })
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }
})

router.get('/events/:id', async (req, res) => {
    try {
        const eventId = parseInt(req.params.id)
        const event = await prisma.event.findUnique({
            where: {
                eventId: eventId
            }
        })

        if (!event) {
            return res.status(StatusCode.NOT_FOUND).json({
                success: false,
                message: "Event Not Found"
            })
        }

        return res.status(StatusCode.OK).json({
            success: true,
            event: event
        })
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }
})

router.post('/waste-delete', async (req, res) => {
    try {


        const org = await prisma.event.delete({
           where:{
            eventId : 11
           }
        })

        return res.json({
            message: 'updated'
        })
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }


})
module.exports = router;
