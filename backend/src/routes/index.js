const express = require('express');
const userRouter = require('./user');
const adminRouter = require('./admin')
const organizerRouter = require('./organizer')
const ticketRouter = require('./ticket')

const router = express.Router();

router.use("/user", userRouter);
router.use("/admin",adminRouter);
router.use("/organizer",organizerRouter)
router.use("/user/ticket",ticketRouter)

module.exports = router;


