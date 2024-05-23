const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getuser(userId) {
    const user = await prisma.user.findUnique({
        where:{
            userId : userId
        }
    })
    return user
}

module.exports = {
    getuser
}