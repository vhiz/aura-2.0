const { addMessage, getMessage } = require('../controllers/message')

const router = require('express').Router()

router.post('/:id', addMessage)

router.get('/:conversationId', getMessage)
module.exports = router