const { genSaltSync, hashSync } = require("bcrypt")
const { verify } = require("jsonwebtoken")
const Users = require("../model/Users")
require('dotenv/config')

const getUser = async (req, res) => {
    const { params: { id } } = req

    const user = await Users.findById(id)

    const { password, ...other } = user._doc
    res.status(200).send(other)
}

const updateUser = async (req, res) => {
    const token = req.cookies.acessToken;
    if (!token) return res.status(401).json('Not verified')

    verify(token, process.env.TOKEN, async (err, userInfo) => {
        if (err) return res.status(403).json('token is not verified')

        if (req.body.password) {
            const salt = genSaltSync(10)
            req.pody.password = hashSync(req.body.password, salt)
        }

        await Users.findByIdAndUpdate(userInfo.id, {
            $set: req.body
        })

        res.status(204).json('updated')
    })

}

const getMe = async (req, res) => {
    const token = req.cookies.acessToken;
    if (!token) return res.status(401).json('Not verified')

    verify(token, process.env.TOKEN, async (err, userInfo) => {
        if (err) return res.status(403).json('token is not verified')

        const user = await Users.findById(userInfo.id)
        const { password, ...other } = user._doc
        res.status(200).json(other)
    })
}


module.exports = { getUser, updateUser, getMe }