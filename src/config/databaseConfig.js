const mongoose = require("mongoose");
require("../models/User");
require("../models/Stones");
require("../models/Data");

async function databaseConfig() {
  try {
    await mongoose.connect("mongodb://localhost:27017/exam-db");
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = {
  databaseConfig,
};
