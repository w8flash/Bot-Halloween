const mongoose = require("mongoose");
const { LOGSETTINGS: defaults } = require("../config.js");

let halloweenSchema = new mongoose.Schema({
  guildID: String,
  userID: String,
  pumpkin: 0,
  gold_pumpkin: 0,
  level: 0
})

module.exports = mongoose.model("Halloween", halloweenSchema);