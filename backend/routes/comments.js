const router = require('express').Router()
const {getComments, createComment} = require('../controllers/comment')


router.get('/', getComments)

router.post('/', createComment)
module.exports = router