const router = require("express").Router();
const { getUser, updateUser, getMe, search } = require("../controllers/user");

router.get("/find/:id", getUser);

router.get("/", getMe);

router.put("/", updateUser);

router.get("/search", search);

module.exports = router;
