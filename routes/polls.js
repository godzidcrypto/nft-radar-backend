const express = require("express");
const {
  getPolls,
  createPoll,
  updateVote,
} = require("../controllers/pollsController");

const router = express.Router();

router.get("/", getPolls);
router.post("/", createPoll);
router.patch("/:id", updateVote);

module.exports = router;
