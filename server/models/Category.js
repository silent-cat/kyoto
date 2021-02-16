const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  // 关联到parent的id,指定关联的模型为本身
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
});

schema.virtual("children", {
  localField: "_id",
  foreignField: "parent",
  justOne: false,
  ref: "Category",
});

schema.virtual("newsList", {
  localField: "_id",
  foreignField: "categories",
  justOne: false,
  ref: "Article",
});

module.exports = mongoose.model("Category", schema);
