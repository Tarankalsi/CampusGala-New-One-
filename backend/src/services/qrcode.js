const qr = require('qrcode');
const fs = require('fs');
const { uploadOnCloudinary } = require('./cloudinary');


const generateQr = async (ticketInfo) => {
    try {

        const qrCodeData = await qr.toDataURL(JSON.stringify(ticketInfo))
        const base64Data = qrCodeData.replace(/^data:image\/png;base64,/, '');

        const dir = '../public/temp/qrcodes';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        const localPath = `../public/temp/qrcodes/${ticketInfo.ticketId}.png`
        fs.writeFileSync(localPath, base64Data, 'base64');

        const qrCode = await uploadOnCloudinary(localPath)
        console.log(qrCode.url)
        return qrCode
        
    } catch (error) {
        console.error("Error While Generating QR", error);
        throw error;
    }
}

const deleteQrFile = async (ticketId) => {

    const filePath = `../public/temp/qrcodes/${ticketId}.png`;
    
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting QR code:', err);
        } else {
            console.log('QR code deleted successfully');
        }
    });

}

module.exports = { generateQr , deleteQrFile};
