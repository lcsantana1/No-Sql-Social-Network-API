const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,

} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought);




module.exports = router;