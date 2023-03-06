const { register, login, logout, Google } = require('../controllers/auth')

const router = require('express').Router()


router.post('/login' ,login)

router.post('/register',register )

router.post('/logout', logout)

router.post("/google", Google);

module.exports = router