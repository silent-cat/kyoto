// 确定模型是什么的中间件
module.exports = (options) => {
  return async (req, res, next) => {
    // 把传进来的heros变成Hero，classify转为类名形式
    const modelName = require("inflection").classify(req.params.resource);
    req.Model = require(`../models/${modelName}`);
    next();
  };
};
