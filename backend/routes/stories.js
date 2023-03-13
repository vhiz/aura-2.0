const router = require('express').Router()
const {addStory, getStory} = require('../controllers/story')

router.get('/:id', getStory)

router.post('/:id', addStory)

module.exports = router