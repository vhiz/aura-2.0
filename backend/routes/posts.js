const router = require('express').Router()
const {getPosts, createPost, getUsersPost} = require('../controllers/post')

router.get('/find/:id', getPosts)

router.get('/:userId', getUsersPost)

router.post('/:id', createPost)
module.exports = router