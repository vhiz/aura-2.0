const router = require('express').Router()
const {addStory, getStory} = require('../controllers/story')

router.get('/', getStory)

router.post('/', addStory)

module.exports = router