const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  mints: [
    {
      project: String,
      yes: Number,
      no: Number,
      voters: [{ email: String, vote: String }],
    },
  ],
});

module.exports = mongoose.model("Poll", pollSchema);
