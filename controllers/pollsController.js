const Poll = require("../models/pollsModel");
const mongoose = require("mongoose");

const getPolls = async (req, res) => {
  const polls = await Poll.find({}).sort({ createdAt: -1 });

  res.status(200).json(polls);
};

const getPoll = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such poll" });
  }

  const poll = await Poll.findById(id);

  if (!poll) {
    return res.status(404).json({ error: "No such poll" });
  }

  res.status(200).json(poll);
};

const createPoll = async (req, res) => {
  const {
    date,
    time,
    wlTime,
    name,
    twitter,
    discord,
    website,
    mintPrice,
    wlMintPrice,
    quantity,
    lauren,
    hotsauce,
    dagzen,
    yes,
    voters,
    imageUrl,
    isRequested,
  } = req.body;

  try {
    const poll = await Poll.create({
      date,
      time,
      wlTime,
      name,
      twitter,
      discord,
      website,
      mintPrice,
      wlMintPrice,
      quantity,
      lauren,
      hotsauce,
      dagzen,
      yes,
      voters,
      imageUrl,
      isRequested,
    });
    res.status(200).json(poll);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const updateVote = async (req, res) => {
  const { id, vote, discordId } = req.body;

  try {
    if (vote === undefined) {
      try {
        const updatedPoll = await Poll.findOneAndUpdate(
          { _id: id },
          {
            ...req.body,
          },
          { new: true }
        );

        return res.status(200).json(updatedPoll);
      } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
      }
    } else if (vote === true) {
      await Poll.updateOne(
        { _id: id },
        {
          $inc: { yes: 1 },
          $push: { voters: { discordId: discordId } },
        }
      );
    } else if (vote === false) {
      await Poll.updateOne(
        { _id: id },
        {
          $inc: { yes: -1 },
          $pull: { voters: { discordId: discordId } },
        }
      );
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const deletePoll = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such poll" });
  }

  const poll = await Poll.findOneAndDelete({ _id: id });

  if (!poll) {
    return res.status(404).json({ error: "No such poll" });
  }

  res.status(200).json(poll);
};

module.exports = {
  getPolls,
  getPoll,
  createPoll,
  updateVote,
  deletePoll,
};
