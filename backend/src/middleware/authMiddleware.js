const jwt = require('jsonwebtoken');
const StatusCode = require('../constants/statusCode');
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_SECRET_KEY_ADMIN = process.env.JWT_SECRET_KEY_ADMIN;
const JWT_SECRET_KEY_ORGANIZER = process.env.JWT_SECRET_KEY_ORGANIZER;
const JWT_SECRET_KEY_VOLUNTEER = process.env.JWT_SECRET_KEY_VOLUNTEER;

const authMiddleware = (userType) =>  (req,res,next) =>{
   
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCode.FORBIDDEN).json({
            success : false,
            message : "Error: Missing or invalid Authorization Token"
        })
    }

    const authToken  = authHeader.split(' ')[1]

    try {

        let secretKey;

        if (userType === "admin") {
            secretKey = JWT_SECRET_KEY_ADMIN
        }else if (userType === "organizer") {
            secretKey = JWT_SECRET_KEY_ORGANIZER
        }else if(userType === "user"){
            secretKey = JWT_SECRET_KEY
        }else if(userType === "volunteer"){
            secretKey = JWT_SECRET_KEY_VOLUNTEER
        }else {
            return res.status(StatusCode.FORBIDDEN).json({
                success : false,
                message : "Error : Invalid User Type"
            })
        }
        const decoded = jwt.verify(authToken,secretKey)
     

        if (userType === 'admin') {
            req.adminId = decoded.adminId;
        } else if(userType === "organizer"){
            req.organizerId = decoded.organizerId;
        }else if (userType === 'volunteer') {
            req.eventId = decoded.eventId
        } else {
            req.userId = decoded.userId
        }

        next();
    } catch (error) {
        console.error(error)
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success : false ,
            message: "Internal Error in Authorization  Middleware"
        })
    }
}

const userAuthMiddleware = authMiddleware('user');
const adminAuthMiddleware = authMiddleware('admin');
const organizerAuthMiddleware = authMiddleware('organizer');
const volunteerAuthMiddleware = authMiddleware('volunteer');

module.exports = {
    adminAuthMiddleware , userAuthMiddleware , organizerAuthMiddleware , volunteerAuthMiddleware
}