const { verify } = require("jsonwebtoken");
const Conversation = require("../model/Conversation");

const newConversation = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token) return res.status(401).json("Not verified");

  verify(token, process.env.TOKEN, async (err, userInfo) => {
    if (err) return res.status(403).json("token is not verified");
    const {
      body: { receiverId },
    } = req;

    const conversation = await Conversation.findOne({
      members: { $all: [userInfo.id, receiverId] },
    });

    if (conversation) {
      res.status(200).json("conversation already exist");
    } else {
      const senderId = userInfo.id;
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });

      await newConversation.save();
      res.status(201).json(newConversation);
    }
  });
};

const getConversation = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token) return res.status(401).json("Not verified");

  verify(token, process.env.TOKEN, async (err, userInfo) => {
    if (err) return res.status(403).json("token is not verified");

    try {
      const conversation = await Conversation.find({
        members: { $in: [userInfo.id] },
      });

      res.status(200).json(conversation);
    } catch (error) {
      console.log(error.message);
    }
  });
};

const conversation = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token) return res.status(401).json("Not verified");

  verify(token, process.env.TOKEN, async (err, userInfo) => {
    if (err) return res.status(403).json("token is not verified");

    const {
      params: { secondId },
    } = req;

    try {
      const conversation = await Conversation.findOne({
        members: { $all: [userInfo.id, secondId] },
      });

      res.status(200).json(conversation);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = { newConversation, getConversation, conversation };
