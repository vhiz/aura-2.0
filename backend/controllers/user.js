const { genSaltSync, hashSync } = require("bcrypt");
const { verify } = require("jsonwebtoken");
const Users = require("../model/Users");
require("dotenv/config");

const getUser = async (req, res) => {
  const {
    params: { id },
  } = req;

  const user = await Users.findById(id);

  const { password, ...other } = user._doc;
  res.status(200).send(other);
};

const getFriends = async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId);

    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return Users.findById(friendId);
      })
    );

    let friendlist = [];
    friends.map((friend) => {
      const { _id, username, profilePic } = friend;
      friendlist.push({ _id, username, profilePic });
    });

    res.status(200).json(friendlist);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateUser = async (req, res) => {
  // const token = req.cookies.acessToken;
  // if (!token) return res.status(401).json("Not verified");

  // verify(token, process.env.TOKEN, async (err, userInfo) => {
  //   if (err) return res.status(403).json("token is not verified");

    if (req.body.password) {
      const salt = genSaltSync(10);
      req.pody.password = hashSync(req.body.password, salt);
    }

    await Users.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(204).json("updated");
  // });
};

const getMe = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token) return res.status(401).json("Not verified");

  verify(token, process.env.TOKEN, async (err, userInfo) => {
    if (err) return res.status(403).json("token is not verified");

    const user = await Users.findById(userInfo.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  });
};

const search = async (req, res) => {
  const query = req.query.q;
  try {
    const users = await Users.find({
      name: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

const suggested = async (req, res) => {
  try {
    const users = await Users.aggregate([{ $sample: { size: 3 } }]);

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { getUser, updateUser, getMe, search, suggested , getFriends};
