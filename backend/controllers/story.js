const { verify } = require("jsonwebtoken");
const Story = require("../model/Story");
const Users = require("../model/Users");
require('dotenv/config')

const getStory = async (req, res) => {
    const token = req.cookies.acessToken;
    if (!token) return res.status(401).json('Not verified')

    verify(token, process.env.TOKEN, async (err, userInfo) => {
        if (err) return res.status(403).json('token is not verified')

        const currentUser = await Users.findById(userInfo.id)

        const userStory = await Story.find({ userId: currentUser._id })


        const friendStories = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Story.find({ userId: friendId })
            })
        )
        res.status(200).json(userStory.concat(...friendStories))
    })

}

const addStory = async(req, res) => {
    const token = req.cookies.acessToken;
    if (!token) return res.status(401).json('Not verified')

    verify(token, process.env.TOKEN, async (err, userInfo) => {
        if (err) return res.status(403).json('token is not verified')


        const newStory = new Story({
            userId: userInfo.id,
            img: req.body.img
        })

        await newStory.save()

        res.status(201).send('created')
    })
}


module.exports = { getStory, addStory }