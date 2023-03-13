const router = require("express").Router();

const {
  getRelationships,
  addRelationships,
  deletRelationships,
} = require("../controllers/relationship");

router.get("/", getRelationships);
router.post("/:id", addRelationships);
router.delete("/:id", deletRelationships);

module.exports = router;
