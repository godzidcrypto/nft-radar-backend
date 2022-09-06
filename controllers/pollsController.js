const Poll = require("../models/pollsModel");
const mongoose = require("mongoose");

const getPolls = async (req, res) => {
  //   res.status(200).json([
  //     {
  //       date: "today",
  //       mints: [
  //         {
  //           title: "Degen Fat Cats",
  //           yes: 10,
  //           no: 2,
  //         },
  //         {
  //           title: "Degen Fat Cats",
  //           yes: 10,
  //           no: 2,
  //         },
  //         {
  //           title: "Degen Fat Cats",
  //           yes: 10,
  //           no: 2,
  //         },
  //       ],
  //     },
  //     {
  //       date: "today",
  //       mints: [
  //         {
  //           title: "Degen Fat Cats",
  //           yes: 10,
  //           no: 2,
  //         },
  //         {
  //           title: "Degen Fat Cats",
  //           yes: 10,
  //           no: 2,
  //         },
  //         {
  //           title: "Degen Fat Cats",
  //           yes: 10,
  //           no: 2,
  //         },
  //       ],
  //     },
  //     {
  //       date: "today",
  //       mints: [
  //         {
  //           title: "Degen Fat Cats",
  //           yes: 10,
  //           no: 2,
  //         },
  //         {
  //           title: "Degen Fat Cats",
  //           yes: 10,
  //           no: 2,
  //         },
  //         {
  //           title: "Degen Fat Cats",
  //           yes: 10,
  //           no: 2,
  //         },
  //       ],
  //     },
  //   ]);

  const polls = await Poll.find({}).sort({ createdAt: -1 });

  res.status(200).json(polls);
};

const createPoll = async (req, res) => {
  const { date, mints } = req.body;

  try {
    const poll = await Poll.create({
      date,
      mints,
    });
    res.status(200).json(poll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateVote = async (req, res) => {
  const { id } = req.params;
  //   const { mints } = req.body;

  //   mints.map((mint) => {
  //     console.log(mint);
  //   });

  const poll = await Poll.findById(id);
  console.log(poll);
};

module.exports = {
  getPolls,
  createPoll,
  updateVote,
};
