const router = require('express').Router();
const attractionRouter = require('./attractions');
const userRouter = require('./users');

router.use('/attractions', attractionRouter);
router.use('/users', userRouter);

module.exports = { 
    router
}