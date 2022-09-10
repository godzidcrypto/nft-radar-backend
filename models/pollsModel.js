const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  wlTime: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  discord: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  mintPrice: {
    type: String,
    required: true,
  },
  wlMintPrice: {
    type: String,
  },
  quantity: {
    type: String,
    required: true,
  },
  lauren: {
    type: Boolean,
  },
  hotsauce: {
    type: Boolean,
  },
  dagzen: {
    type: Boolean,
  },
  yes: { type: Number, default: 0 },
  voters: { type: [{ email: String, vote: String }], default: [] },
});

module.exports = mongoose.model("Poll", pollSchema);
