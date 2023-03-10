const router = require("express").Router();

const {
  getRelationships,
  addRelationships,
  deletRelationships,
} = require("../controllers/relationship");

router.get("/", getRelationships);
router.post("/", addRelationships);
router.delete("/", deletRelationships);

module.exports = router;
