const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


function generateRandomPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

function generateRandomNumber(length) {
    let randomNumber = '';
    for (let i = 0; i < length; i++) {
        randomNumber += Math.floor(Math.random() * 10); // Generates a random digit (0-9) and appends it to the string
    }
    return randomNumber;
}

async function generateCredentials(name) {
    let username
    while (true) {
        username = name.toLowerCase().replace(/\s/g, '') + generateRandomNumber(4);

        const organizer = await prisma.organizer.findUnique({
            where: {
                organizerUsername: username
            }
        })

        if (!organizer) {
            break
        }
    }

    const password = generateRandomPassword(8);

    return { username, password };
}


module.exports = {
    generateCredentials
}