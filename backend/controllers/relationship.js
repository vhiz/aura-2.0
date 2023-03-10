const Users = require("../model/Users");
const Relationships = require("../model/Relationships");
const { verify } = require("jsonwebtoken");

const getRelationships = async (req, res) => {
  const {
    query: { followedUserId },
  } = req;

  const relationships = await Relationships.find({
    followedUserId: followedUserId,
  });

  res
    .status(200)
    .send(relationships.map((relationship) => relationship.followerUserId));
};



const addRelationships = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token) return res.status(401).json("Not verified");

  verify(token, process.env.TOKEN, async (err, userInfo) => {
    if (err) return res.status(403).json("token is not verified");

    const userId = userInfo.id;
    const user = await Users.findById(req.body.userId);
    const currentUser = await Users.findById(userId);

    if (!user.followers.includes(userId)) {
      await user.updateOne({ $push: { followers: userId } });
      await currentUser.updateOne({ $push: { followings: req.body.userId } });
      const newRelationship = new Relationships({
        followerUserId: userId,
        followedUserId: req.body.userId,
      });
      await newRelationship.save();
      return res.status(200).send("user has been followed");
    } else {
      res.status(401).send("you are already following this user");
    }
  });
};

const deletRelationships = async (req, res) => {
  const token = req.cookies.acessToken;
  if (!token) return res.status(401).json("Not verified");

  verify(token, process.env.TOKEN, async (err, userInfo) => {
    if (err) return res.status(403).json("token is not verified");

    const userId = userInfo.id;
    const user = await Users.findById(req.query.userId);
    const currentUser = await Users.findById(userId);

    if (user.followers.includes(userId)) {
      await user.updateOne({ $pull: { followers: userId } });
      await currentUser.updateOne({ $pull: { followings: req.query.userId } });

      await Relationships.findOneAndDelete(
        { followerUserId: userId },
        { followedUserId: req.query.userId }
      );
      return res.status(200).send("user has been unfollowed");
    } else {
      res.status(401).send("you are already unfollowing this user");
    }
  });
};

module.exports = {
  deletRelationships,
  addRelationships,
  getRelationships,
 
};
