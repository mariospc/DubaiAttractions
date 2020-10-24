const router = require('express').Router();

const {
    signUp,
    logIn
} = require ('../../functions');

router.post('/', async (req, res) => {
    await signUp(req, res);
});

router.get('/', async (req, res) => {
    await logIn(req, res);
});

module.exports = router
