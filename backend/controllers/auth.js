const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')
require('dotenv/config')
const User = require('../model/Users')


const register = async (req, res) => {

    //guard cheking if user exist
    const userExist = await User.findOne({ username: req.body.username })
    if (userExist) return res.status(409).send('User already exist')

    //hashing password
    const salt = genSaltSync(10)
    const hashed = hashSync(req.body.password, salt)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
        phoneno: req.body.phoneno,
        name: req.body.name
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).send('created')
    } catch (error) {
        res.status(500).send(error)
    }


}

const login = async (req, res) => {

    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(404).send('user does not exist')

    const valid = compareSync(req.body.password, user.password)
    if (!valid) return res.status(401).send('password not correct')

    const token = sign({ id: user._id }, process.env.TOKEN)

    const { password, updatedAt, ...other } = user._doc

    res.cookie('acessToken', token, {
        httpOnly: true
    }).status(200).send(other)


}

const logout = (req, res) => {
    res.clearCookie('acessToken', {
        secure: true,
        sameSite: 'none'
    }).status(200).send('logged out')
}



module.exports = { register, login, logout }