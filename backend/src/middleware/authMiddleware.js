const jwt = require('jsonwebtoken');
const StatusCode = require('../constants/statusCode');
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_SECRET_KEY_ADMIN = process.env.JWT_SECRET_KEY_ADMIN;

const authMiddleware = (userType) => (req,res,next) =>{
   
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCode.FORBIDDEN).json({
            success : false,
            message : "Error: Missing or invalid Authorization Token"
        })
    }

    const authToken  = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(authToken,userType === 'admin' ? JWT_SECRET_KEY_ADMIN : JWT_SECRET_KEY)

        if (userType === 'admin') {
            req.adminId = decoded.adminId;
        } else {
            req.userId = decoded.userId;
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

module.exports = {
    adminAuthMiddleware , userAuthMiddleware
}