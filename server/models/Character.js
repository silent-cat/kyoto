const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },

  banner: { type: String },
  title: { type: String },

  // 分类
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      delay: { type: String },
      cost: { type: String },
      description: { type: String },
    },
  ],
  // 两套推荐出装
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  // 使用技巧
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: [
    {
      character: { type: mongoose.SchemaTypes.ObjectId, ref: "Character" },
      description: { type: String },
    },
  ],
});

module.exports = mongoose.model("Character", schema);
// Characters会被转化成characters
