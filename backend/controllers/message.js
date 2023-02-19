const Message = require('../model/Message')

const addMessage = async (req, res) => {
    const newMessage = new Message(req.body)
    await newMessage.save()
    res.status(201).json(newMessage)
}

const getMessage = async (req, res) => {
    const { params: { conversationId } } = req
    const message = await Message.find({
        conversationId: conversationId
    })

    res.status(200).send(message)
}

module.exports = { addMessage, getMessage }