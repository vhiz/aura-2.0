const { verify } = require('jsonwebtoken');
const Posts = require('../model/Posts')
const Users = require('../model/Users')
require('dotenv/config')


const getPosts = async (req, res, next) => {


    const token = req.cookies.acessToken;
    if (!token) return res.status(401).json('Not verified')

    verify(token, process.env.TOKEN, async (err, userInfo) => {
        if (err) return res.status(403).json('token is not verified')

        const currentUser = await Users.findById(userInfo.id)

        const userPosts = await Posts.find({ userId: currentUser._id })


        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Posts.find({ userId: friendId })
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    })
}

const createPost = async (req, res) => {
    const token = req.cookies.acessToken;
    if (!token) return res.status(401).json('Not verified')

    verify(token, process.env.TOKEN, async (err, userInfo) => {

        if (err) return res.status(403).json('token is not verified')

        const user = await Users.findById(userInfo.id)

        const newPost = new Posts({
            userId: user._id,
            desc: req.body.desc,
            img: req.body.img,
        })

        const savedpost = await newPost.save()

        return res.status(201).send('post has been created')
    })
}

const getUsersPost = async (req, res) => {
    const { params: { userId } } = req
    const currentUser = await Users.findById(userId)
    const userPosts = await Posts.find({ userId: currentUser._id })

    res.status(200).json(userPosts)
}



module.exports = { getPosts, createPost, getUsersPost }