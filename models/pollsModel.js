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
      yes: { type: Number, default: 0 },
      no: { type: Number, default: 0 },
      voters: { type: [{ email: String, vote: String }], default: [] },
    },
  ],
});

module.exports = mongoose.model("Poll", pollSchema);
