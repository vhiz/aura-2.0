const { newConversation, getConversation, conversation } = require('../controllers/conversation')

const router = require('express').Router()

router.post('/', newConversation)

router.get('/', getConversation)

router.get('/find/:secondId', conversation)

module.exports = router