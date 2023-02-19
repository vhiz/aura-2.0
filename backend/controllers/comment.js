const { verify } = require('jsonwebtoken')
const Comments = require('../model/Comments')
const Users = require('../model/Users')
require('dotenv/config')

const getComments = async(req, res) => {
    const comments = await Comments.find({postId: req.query.postId})
    res.status(200).send(comments)

}

const createComment = async(req, res)=>{
    const token = req.cookies.acessToken;
    if (!token) return res.status(401).json('Not verified')

    verify(token, process.env.TOKEN, async (err, userInfo) => {

        if (err) return res.status(403).json('token is not verified')

        const user = await Users.findById(userInfo.id)

        const newComment = new Comments({
            userId: user._id,
            desc: req.body.desc,
            postId: req.body.postId
        })

        const savedcomment = await newComment.save()

        return res.status(201).send('comment has been created')
    })
}

module.exports = { getComments , createComment}