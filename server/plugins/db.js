module.exports = (app) => {
  const mongoose = require("mongoose");
  // mongoose链接mongodb
  mongoose.connect("mongodb://127.0.0.1:27017/abc", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  require("require-all")(__dirname + "/../models");
};
