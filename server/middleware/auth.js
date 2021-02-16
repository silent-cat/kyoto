module.exports = (options) => {
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../models/AdminUser");
  const assert = require("http-assert");
  return async (req, res, next) => {
    // 后端获取请求头authorization小写规定，前端Authorization,两者对应
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    //如果token为空，报错
    assert(token, 401, "请先登录"); //请提供jwt token
    // 解析取出登录用户的id
    const { id } = jwt.verify(token, req.app.get("secret"));
    assert(id, 401, "请先登录"); //无效的jwt token
    // 通过id找到用户，将用户信息赋给user并挂载
    req.user = await AdminUser.findById(id);
    assert(req.user, 401, "");
    // console.log(req.user)
    assert(req.user, 401, "请先登录");
    await next();
  };
};
