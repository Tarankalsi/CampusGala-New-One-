const express = require("express");
const { PrismaClient } = require('@prisma/client');
const zod = require('zod');
const StatusCode = require('../constants/statusCode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const { organizerAuthMiddleware, userAuthMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/multer");
const { uploadOnCloudinary } = require("../services/cloudinary");
const { generateRandomNumber, generateRandomPassword, generateEventCode } = require("../services/generate");



dotenv.config();
const JWT_SECRET_KEY_ORGANIZER = process.env.JWT_SECRET_KEY_ORGANIZER;

const prisma = new PrismaClient();
const router = express.Router();



const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(6)
});


router.post('/signin', async (req, res) => {
    try {
        const body = req.body

        const { success } = signinSchema.safeParse(body)

        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                message: "zod validation failed"
            })
        }

        const organizer = await prisma.organizer.findUnique({
            where: {
                organizerUsername: body.username
            }
        })
        console.log(organizer)

        const password_compare = await bcrypt.compare(body.password, organizer.organizerPassword)

        if (!password_compare) {
            return res.status(StatusCode.UNAUTHORIZED).json({
                success: false,
                message: "Incorrect Password"
            })
        }

        const token = jwt.sign({ organizerId: organizer.organizerId }, JWT_SECRET_KEY_ORGANIZER)

        return res.status(StatusCode.OK).json({
            success: true,
            token: token

        });
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }

})

const createEventSchema = zod.object({
    eventName: zod.string(),
    avatar: zod.string().url(),
    coverImage: zod.string().url(),
    collegeName: zod.string(),
    eventType: zod.string(),
    eventDescription: zod.string(),
    eventTermsAndCondition: zod.string(),
    eventDate: zod.date(),
    ticketPrice: zod.number(),
    venue: zod.string(),
    phoneNumber1: zod.string(),
    phoneNumber2: zod.string().optional(),
    startTime: zod.string(),
    duration: zod.number()
})

router.post('/create-event', organizerAuthMiddleware, async (req, res) => {
    try {
        const organizerId = parseInt(req.organizerId)
        router.post('/create-event', organizerAuthMiddleware, async (req, res) => {
            try {
                const organizerId = parseInt(req.organizerId)
                const event_exist = await prisma.event.findFirst({
                    where: {
                        organizerId: organizerId
                    }
                })
        
                if (event_exist) {
                    return res.status(StatusCode.CONFLICT).json({
                        success: false,
                        message: "Event Already exist for this organizer"
                    })
                }
                
                const body = req.body
                const eventDate = new Date(body.eventDate)
                const { success } = createEventSchema.safeParse({ ...body, eventDate })
                
        
                if (!success) {
                    return res.status(StatusCode.BAD_REQUEST).json({
                        success: false,
                        message: "zod validation failed"
        
                    })
                }
        
                const event = await prisma.event.create({
                    data: {
                        organizerId: organizerId,
                        eventName: body.eventName,
                        avatar: body.avatar,
                        coverImage: body.coverImage,
                        collegeName: body.collegeName,
                        eventType: body.eventType,
                        eventDescription: body.eventDescription,
                        eventTermsAndCondition: body.eventTermsAndCondition,
                        eventDate: eventDate,
                        ticketPrice: body.ticketPrice,
                        venue: body.venue,
                        phoneNumber1: body.phoneNumber1,
                        phoneNumber2: body.phoneNumber2,
                        startTime: body.startTime,
                        duration: body.duration
                    }
                })
        
                return res.status(StatusCode.OK).json({
                    success: true,
                    message: "Created Event Successfully",
                    event: event
        
                })
            } catch (error) {
                console.error(error);
                res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                    message: "Internal Error"
                });
            }
        })
        
        const event_exist = await prisma.event.findFirst({
            where: {
                organizerId: organizerId
            }
        })

        if (event_exist) {
            return res.status(StatusCode.CONFLICT).json({
                success: false,
                message: "Event Already exist for this organizer"
            })
        }
        
        const body = req.body
        const eventDate = new Date(body.eventDate)
        const { success } = createEventSchema.safeParse({ ...body, eventDate })
        

        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                message: "zod validation failed"

            })
        }

        const event = await prisma.event.create({
            data: {
                organizerId: organizerId,
                eventName: body.eventName,
                avatar: body.avatar,
                coverImage: body.coverImage,
                collegeName: body.collegeName,
                eventType: body.eventType,
                eventDescription: body.eventDescription,
                eventTermsAndCondition: body.eventTermsAndCondition,
                eventDate: eventDate,
                ticketPrice: body.ticketPrice,
                venue: body.venue,
                phoneNumber1: body.phoneNumber1,
                phoneNumber2: body.phoneNumber2,
                startTime: body.startTime,
                duration: body.duration
            }
        })

        return res.status(StatusCode.OK).json({
            success: true,
            message: "Created Event Successfully",
            event: event

        })
    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }
})



router.post('/create-event/upload-file', organizerAuthMiddleware,
    upload.fields([
        {
            name: "avatar"
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]), async (req, res) => {

        try {
            const avatarLocalPath = req.files?.avatar[0]?.path
            const coverImageLocalPath = req.files?.coverImage[0]?.path

            console.log(avatarLocalPath)
            if (!avatarLocalPath || !coverImageLocalPath) {
                return res.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Avatar and coverImage file is required"
                })
            }
            const avatar = await uploadOnCloudinary(avatarLocalPath)
            const coverImage = await uploadOnCloudinary(coverImageLocalPath)
            console.log(avatar)

            if (!avatar || !coverImage) {
                return res.status(StatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Avatar and coverImage cloudinary url is required"
                })
            }

            res.status(StatusCode.OK).json({
                success: true,
                message: "File Uploaded",
                avatar: avatar.url,
                coverImage: coverImage.url
            })
        } catch (error) {
            console.error(error);
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                message: "Internal Error"
            });
        }

    })

const updateEvent = zod.object({
    eventName: zod.string().optional(),
    avatar: zod.string().url().optional(),
    coverImage: zod.string().url().optional(),
    collegeName: zod.string().optional(),
    eventType: zod.string().optional(),
    eventDescription: zod.string().optional(),
    eventTermsAndCondition: zod.string().optional(),
    eventDate: zod.date().optional(),
    ticketPrice: zod.number().optional(),
    venue: zod.string().optional(),
    phoneNumber1: zod.string().optional(),
    phoneNumber2: zod.string().optional(),
    startTime: zod.string().optional(),
    duration: zod.number().optional()
})

router.post('/update-event', organizerAuthMiddleware, async (req,res) => {
    try {
        const body = req.body
        if (body.eventDate) {
            body.eventDate = new Date(body.eventDate)
        }

        const {success , data } = updateEvent.safeParse(body)

        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                message: "zod validation failed"
            })
        }

        const organizerId = req.organizerId
        const eventExist = await prisma.event.findFirst({
            where : {
                organizerId : organizerId
            }
        })

        if (!eventExist) {
            return res.status(StatusCode.NOT_FOUND).json({
                success :  false , 
                message : "Event Not Found"
            })
        }

        const event = await prisma.event.update({
            where : {
                eventId : eventExist.eventId
            },
            data : data
        })
        return res.status(StatusCode.OK).json({
            succcess : true , 
            message : "Event Updated",
            event :  event
        })

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }
})


router.post('/generate-event-code',organizerAuthMiddleware,async (req,res)=>{
    try {

        const code = await generateEventCode(8)
        console.log(typeof(code))

        if (!code) {
            return res.status(StatusCode.CONFLICT).json({
                success : false,
                message  : "Reach maximum attempts to generate unique code"
            })
        }

        const eventExist = await prisma.event.findFirst({
            where : {
                organizerId : req.organizerId
            }
        })
        if (!eventExist) {
            return res.status(StatusCode.NOT_FOUND).json({
                success : false , 
                message : "Event Not Found"
            })
        }

        const event = await prisma.event.update({
            where : {
                eventId : eventExist.eventId
            },
            data : {
                eventCode : code
            }
        })
        
        return res.status(StatusCode.OK).json({
            succcess :true,
            code : event.eventCode
        })

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }
})


router.get('/event',organizerAuthMiddleware,async (req,res)=>{
    try {
        
        const event = await prisma.event.findFirst({
            where : {
                organizerId :  req.organizerId
            }
        })

        if (!event) {
            return res.status(StatusCode.NOT_FOUND).json({
                success : false ,
                message : "Event Not Found"
            })
        }

        return res.status(StatusCode.OK).json({
            success : true , 
            event : event
        })

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }
})


module.exports = router