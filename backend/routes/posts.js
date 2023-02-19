const router = require('express').Router()
const {getPosts, createPost, getUsersPost} = require('../controllers/post')

router.get('/', getPosts)

router.get('/:userId', getUsersPost)

router.post('/', createPost)
module.exports = router