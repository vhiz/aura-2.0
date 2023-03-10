const { verify } = require("jsonwebtoken");
const Message = require("../model/Message");

const addMessage = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token) return res.status(401).json("Not verified");


  verify(token, process.env.TOKEN, async (err, userInfo) => {
    if (err) return res.status(403).json("token is not verified");

    const senderId = userInfo.id
    const newMessage = new Message({
        ...req.body,
        sender: senderId
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  });
};

const getMessage = async (req, res) => {
  const {
    params: { conversationId },
  } = req;
  const message = await Message.find({
    conversationId: conversationId,
  });

  res.status(200).send(message);
};

module.exports = { addMessage, getMessage };
