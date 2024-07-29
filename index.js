const express = require("express");
const mongoose = require("mongoose");
const { DATABASE_URL } = require("./config");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("connection failed");
  });

const dataSchema = new mongoose.Schema({
  end_year: Number,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: Number,
  impact: Number,
  added: Date,
  published: Date,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});
const Data = mongoose.model("Data", dataSchema);
module.exports = { Data };

app.get("/", (req, res) => {
  return res.json({ msg: "on route" });
});
app.get("/api/v1/data", async (req, res) => {
  try {
    const data = await Data.find();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
