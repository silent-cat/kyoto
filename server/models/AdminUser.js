const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String },

  password: {
    type: String,
    //  select: false隐藏，不要查出密码,防止加密后的密码hash被明文显示，再次被加密（防止多层加密）
    select: false,
    set(val) {
      //   bcrypt进行密码的加密处理
      var bcrypt = require("bcryptjs");
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(val, salt);
      return hash;
      //   $2a$10$yB4h9EsZFHD2gcPpKVihTubv2rFH9KUOHP7DgPGVKKPraUlrJtp3G
    },
  },
});

module.exports = mongoose.model("AdminUser", schema);
