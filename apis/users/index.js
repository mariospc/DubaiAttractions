const router = require('express').Router();

const {
    signUp,
    logIn,
    logOut
} = require ('../../functions');

router.post('/signup', async (req, res) => {
    await signUp(req, res);
});

router.post('/login', async (req, res) => {
    await logIn(req, res);
});

router.get('/logout', async (req, res) => {
    await logOut(req, res);
});


module.exports = router
