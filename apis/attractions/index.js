const router = require('express').Router();

const {
    listAttraction,
    getAttraction,
    updateAttraction
} = require('../../functions');

router.get('/', async (req, res) => {
    await listAttraction(req, res);
});

router.get('/:id', async (req, res) => {
    await getAttraction(req, res);
});

router.put('/', async (req, res) => {
    await updateAttraction(req, res);
});

module.exports = router