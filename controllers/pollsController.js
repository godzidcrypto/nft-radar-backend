const Poll = require("../models/pollsModel");
const mongoose = require("mongoose");

const getPolls = async (req, res) => {
  const polls = await Poll.find({}).sort({ createdAt: -1 });

  res.status(200).json(polls);
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
    });
    res.status(200).json(poll);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const updateVote = async (req, res) => {
  //   const { id } = req.params;
  //   const { date, mints } = req.body;
  // will only run if projectId does not exist
  // it updates the poll based on the date
  // it adds a new projectId to the mints array

  // code for updating votes
  // will only run if projectId exists
  const { id, vote, discordId } = req.body;

  console.log(vote);

  try {
    if (vote) {
      await Poll.updateOne(
        { _id: id },
        {
          $inc: { yes: 1 },
          $push: { voters: { discordId: discordId } },
        }
      );
    } else if (!vote) {
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

module.exports = {
  getPolls,
  createPoll,
  updateVote,
};
