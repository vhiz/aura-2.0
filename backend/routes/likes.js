const router = require('express').Router()
const {likePost}  = require('../controllers/like')

router.put('/:postId/like/:id', likePost)
module.exports = router