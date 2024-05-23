const express = require("express");
const { PrismaClient } = require('@prisma/client');
const zod = require('zod');
const dotenv = require("dotenv");
const StatusCode = require('../constants/statusCode');
const { userAuthMiddleware, volunteerAuthMiddleware } = require("../middleware/authMiddleware");
const { generateQr, deleteQrFile } = require("../services/qrcode");
const { sendQrCode } = require("../services/otpService");
const { v2: cloudinary } = require('cloudinary')
const jwt = require('jsonwebtoken');


dotenv.config();
const JWT_SECRET_KEY_VOLUNTEER = process.env.JWT_SECRET_KEY_VOLUNTEER;


const prisma = new PrismaClient();
const router = express.Router();


const ticketPurchaseSchema = zod.object({
    mobileNumber: zod.string()
})

router.post('/purchase/:eventId', userAuthMiddleware, async (req, res) => {
    try {
        const body = req.body
        const eventId = req.params.eventId

        const { success } = ticketPurchaseSchema.safeParse(body)

        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                message: "zod validation failed"
            })
        }

        const event = await prisma.event.findUnique({
            where: {
                eventId: parseInt(eventId)
            }
        })

        if (!event) {
            return res.status(StatusCode.NOT_FOUND).json({
                success: false,
                message: "Event Not Found"
            })
        }

        const ticket = await prisma.ticket.create({
            data: {
                userId: parseInt(req.userId),
                eventId: event.eventId,
                mobileNumber: body.mobileNumber,
                ticketPrice: event.ticketPrice
            }
        })


        const qrCode = await generateQr({
            ticketId: ticket.ticketId,
            eventId: ticket.eventId,
            userId: ticket.userId
        })
        console.log(qrCode.secure_url)

        const updateTicket = await prisma.ticket.update({
            where: {
                ticketId: ticket.ticketId
            },
            data: {
                qrCodeId: qrCode.public_id,
                qrCodeUrl : qrCode.secure_url
            }
        })

        const messageBody = "Congratulations for your Tickets, Scan the qrCode ticket at entry time"
        const mobileNumber = "+918287193995"

        await sendQrCode(messageBody, mobileNumber, qrCode.url)

        await deleteQrFile(ticket.ticketId)

        return res.status(StatusCode.OK).json({
            success: true,
            ticket: updateTicket
        })

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }
})

const checkInSchema = zod.object({
    ticketId  : zod.string()
})

router.post('/check-in',volunteerAuthMiddleware, async (req, res) => {
    try {
        const { ticketId } = req.body

        const {success} = checkInSchema.safeParse(req.body)

        if (!success) {
            return res.status(StatusCode.BAD_REQUEST).json({
                success : false , 
                message : "zod validation failed"
            })
        }

        const ticket = await prisma.ticket.findUnique({
            where: {
                ticketId: ticketId
            }
        })

        if (!ticket) {
            return res.status(StatusCode.NOT_FOUND).json({
                success: false,
                message: "Ticket Not Found"
            })
        }

        if (ticket.checkInStatus === "used") {
            return res.status(StatusCode.CONFLICT).json({
                success: false,
                message: "Ticket already used"
            })
        }

        await prisma.ticket.update({
            where: {
                ticketId: ticketId
            },
            data: {
                checkInStatus: "used"
            }
        })

        return res.status(StatusCode.OK).json({
            success: true,
            message: "check-in successfully"
        })

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }
})


router.post('/check-in/signin', async (req, res) => {
    try {

        const {eventCode} = req.body

        const event = await prisma.event.findUnique({
            where : {
                eventCode :  eventCode
            }
        })

        if (event) {
            const token = jwt.sign({ eventId: event.eventId }, JWT_SECRET_KEY_VOLUNTEER)

            return res.status(StatusCode.OK).json({
                success : true , 
                token : token
            })
        }

        return res.status(StatusCode.UNAUTHORIZED).json({
            success : false , 
            message : "Invalid Token"
        })

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }
})

router.get('/:ticketId' , userAuthMiddleware, async (req,res)=>{
    try {
        const ticketId = req.params.ticketId
        const ticket = await prisma.ticket.findUnique({
            where : {
                ticketId :  ticketId,
                userId : req.userId
            }
        })
        
        if (!ticket) {
            return res.status(StatusCode.NOT_FOUND).json({
                success : false ,
                 message :  "Ticket Not Found"
            })
        }

        return res.status(StatusCode.OK).json({
            success : true, 
            ticket : ticket
        })

    } catch (error) {
        console.error(error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal Error"
        });
    }
})

router.get('/' , userAuthMiddleware, async (req,res)=>{
    try {
   
        const ticket = await prisma.ticket.findMany({
            where : {
                userId :  req.userId,
                checkInStatus : ""
            }
        })
        
        if (!ticket) {
            return res.status(StatusCode.NOT_FOUND).json({
                success : false ,
                 message :  "Ticket Not Found"
            })
        }

        return res.status(StatusCode.OK).json({
            success : true, 
            ticket : ticket
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