const router = require("express").Router();
const {
  getUser,
  updateUser,
  getMe,
  search,
  suggested,
  getFriends,
} = require("../controllers/user");

router.get("/find/:id", getUser);

router.get("/friends/:userId", getFriends);

router.get("/", getMe);

router.put("/", updateUser);

router.get("/search", search);

router.get("/suggested", suggested);

module.exports = router;
