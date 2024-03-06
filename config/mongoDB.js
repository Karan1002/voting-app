const mongoose = require("mongoose");

const mongoDBConnect = async (url) => {
  try {
    return mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoDBConnect;
