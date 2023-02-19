const { verify } = require("jsonwebtoken");
const Posts = require("../model/Posts")

const likePost = async (req, res) => {
    const { params: { id } } = req

    const token = req.cookies.acessToken;
    if (!token) return res.status(401).json('Not verified')

    verify(token, process.env.TOKEN, async (err, userInfo) => {

        const userId = userInfo.id

        if (err) return res.status(403).json('token is not verified')

        const post = await Posts.findById(id)

        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).send('post has been liked')
        } else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).send('post has been unliked')
        }
    })

}

module.exports = { likePost }