const User = require("../Models/userModel");
const Task = require("../Models/taskModel");

async function syncModels() {
  await User.sync();
  await Task.sync();
}

module.exports = syncModels;
