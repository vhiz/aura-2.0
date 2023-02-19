const router = require('express').Router()
const {getUser, updateUser, getMe} = require('../controllers/user')

router.get('/:id', getUser)

router.get('/', getMe)

router.put('/', updateUser)


module.exports = router