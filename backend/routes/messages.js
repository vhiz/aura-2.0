const { addMessage, getMessage } = require('../controllers/message')

const router = require('express').Router()

router.post('/', addMessage)

router.get('/:conversationId', getMessage)
module.exports = router