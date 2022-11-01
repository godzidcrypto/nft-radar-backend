require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const getPolls = require("./routes/polls");

const cors = require("cors");
const app = express();

const corsOptions = {
  origin: ["https://nft-radar.vercel.app", "http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (_req, res) => res.status(200).send("OK"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/polls", getPolls);
