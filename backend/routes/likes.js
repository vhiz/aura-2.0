const router = require('express').Router()
const {likePost}  = require('../controllers/like')

router.put('/:id/like', likePost)
module.exports = router