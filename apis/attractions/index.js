const router = require('express').Router();

const {
    getAllAttractions,
    getAttraction
    // updateAttraction
} = require('../../functions');

router.get('/', async (req, res) => {
    await getAllAttractions(req, res);
});

router.get('/filter', async (req, res) => {
    await getAttraction(req, res);
});

// router.put('/', async (req, res) => {
//     await updateAttraction(req, res);
// });

module.exports = router