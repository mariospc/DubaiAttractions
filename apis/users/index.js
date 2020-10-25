const router = require('express').Router();

const {
    signUp,
    logIn,
    logOut
} = require ('../../functions');

router.post('/', async (req, res) => {
    await signUp(req, res);
});

router.get('/login', async (req, res) => {
    await logIn(req, res);
});

router.get('/logout', async (req, res) => {
    await logOut(req, res);
});


module.exports = router