const express = require("express");
const { PrismaClient } = require('@prisma/client');
const zod = require('zod');
const StatusCode = require('../constants/statusCode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const { generateOtp, sendOtp } = require("../services/otpService");
const { userAuthMiddleware } = require("../middleware/authMiddleware");


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

        const { success } = signupSchema.safeParse(body);

        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: "Invalid Inputs"
            });
        }

        const userExist = await prisma.user.findUnique({
            where: {
                mobileNumber: body.mobileNumber
            }
        });
        if (userExist && userExist.verification === "pending") {
            const otp = await generateOtp(6, userExist);
            const response = await sendOtp(userExist.mobileNumber, otp);
            return res.json({
                message: "Pending verification",
                id: userExist.userId
            });
        }
        if (userExist && userExist.verification === "verified") {
            return res.status(StatusCode.NOT_FOUND).json({
                message: "User already Exist"
            });
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


        const generated_otp = await generateOtp(6, user);
        await sendOtp(user.mobileNumber, generated_otp);


        return res.status(StatusCode.OK).json({
            message: `User Created - OTP Sent to ${user.mobileNumber}`,
            id: user.userId
        });
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }
});


const signinSchema = zod.object({
    mobileNumber: zod.string(),
    password: zod.string().min(6),
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
            user: userDetails

        });

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }
});

router.post('/otp-verification', async (req, res) => {
    try {
        const { otp } = req.body;

        const userId = parseInt(req.headers.userid)



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
        console.log(otp_response.otp)
        console.log(otp)
        const token = jwt.sign({
            userId: user_response.userId
        }, JWT_SECRET_KEY)

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
                    status: "success",
                    authToken: token
                })
            } else {
                return res.status(StatusCode.UNAUTHORIZED).json({
                    status: "failed",
                    message: "Incorrect OTP"
                })
            }
        } else if (otp_response.status === "expired") {
            return res.status(StatusCode.EXPIRED).json({
                message: "OTP is expired"
            })
        } else {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: "Enter Valid OTP"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }

});
 

 

const eventApplicationSchema = zod.object({
     eventName: zod.string(),
    eventDescription: zod.string(),
    eventType : zod.string(),
    mobileNumber: zod.string(),
    email: zod.string().email(),
    expectedAudience: zod.number(),
    venue: zod.string(),
    
});

router.post('/event-application', userAuthMiddleware, async (req, res) => {
    try {

        const body = req.body
       
        const { success } = eventApplicationSchema.safeParse(body)
        console.log(success)
        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                message: "zod validation failed"
            });
        }

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
                status : "pending"
            }
        })

        return res.status(StatusCode.OK).json({
            success : true,
            message: "Your Application is Submitted",
            application : application
        })


    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }

    // const application = await prisma.eventApplication.create({
    //     data :{

    //     }
    // })

})
module.exports = router;
