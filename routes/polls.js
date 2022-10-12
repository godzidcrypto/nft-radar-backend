const express = require("express");
const {
  getPolls,
  getPoll,
  createPoll,
  updateVote,
  deletePoll,
} = require("../controllers/pollsController");

const router = express.Router();

router.get("/", getPolls);
router.get("/:id", getPoll);
router.post("/", createPoll);
router.patch("/:id", updateVote);
router.delete("/:id", deletePoll);

module.exports = router;
