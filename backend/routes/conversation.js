const { newConversation, getConversation, conversation } = require('../controllers/conversation')

const router = require('express').Router()

router.post('/:id', newConversation)

router.get('/:id', getConversation)

router.get('/find/:id/:secondId', conversation)

module.exports = router