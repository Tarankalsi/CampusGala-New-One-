const dotenv = require("dotenv");
const twilio = require("twilio");
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();
dotenv.config();

const accountSid = process.env.accountSid;
const twilioAuthToken = process.env.authToken;
const twilioNumber = process.env.twilioNumber;

const client = twilio(accountSid, twilioAuthToken);


async function generateOtp(length, user) {
    try {

        let digits = "0123456789";
        let OTP = "";

        for (let i = 0; i < length; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        const otpExist = await prisma.otp.findUnique({
            where: {
                userId: user.userId
            }
        });

        if (otpExist) {
            const update_OTP = await prisma.otp.update({
                where: {
                    userId: user.userId
                },
                data: {
                    otp: OTP,
                    status: "valid"
                }
            });
        } else {
            const create_otp = await prisma.otp.create({
                data: {
                    otp: OTP,
                    status: "valid",
                    userId: user.userId
                }
            });
            console.log("create otp")
            console.log(create_otp)
        }

        // Schedule expiration update
        setTimeout(async () => {
            const expired_otp = await prisma.otp.update({
                where: {
                    userId: user.userId,
                    status: "valid" // Only update valid OTPs
                },
                data: {
                    status: "expired"
                }
            });
            console.log("OTP expired for user:", user.userId);

        }, 60000); // 2 minutes

        return OTP;

    } catch (error) {
        console.error("Error generating OTP:", error);
        throw error;
    }
}



async function sendOtp(mobileNumber, otp) {
    const messageBody = `Your OTP is ${otp}`;

    try {
        const respone = await client.messages.create({
            body: messageBody,
            from: twilioNumber,
            to: mobileNumber
        });
        return respone;
    } catch (error) {
        console.error("Error Sending OTP", error);
        throw error;
    }
}


async function sendLoginCredentials(username, password, mobileNumber, message) {
    const messageBody = `Congratulations ${message}
     Login Credentials username : ${username} and password :${password}`;

    try {
        const respone = await client.messages.create({
            body: messageBody,
            from: twilioNumber,
            to: mobileNumber
        });
        return respone;
    } catch (error) {
        console.error("Error Sending OTP", error);
        throw error;
    }
}

const sendQrCode = async (messageBody, mobileNumber, url) =>{
    try {

        // const base64Data = fs.readFileSync(qrCodePath , {encoding : 'base64'} )
        // const mediaUrl = `data:image/png;base64,${base64Data}`

        const response = await client.messages.create({
            to: mobileNumber ,
            from : twilioNumber,
            mediaUrl  : url,
            body : messageBody
        })
        
        return response
    } catch (error) {
        console.error('Error sending QR code via Twilio:', error);
        throw error;
    }
}



module.exports = { generateOtp, sendOtp, sendLoginCredentials , sendQrCode};
