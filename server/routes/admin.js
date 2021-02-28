// 导出一个函数，这个函数接收一个app对象
module.exports = (app) => {
  const express = require("express");
  const jwt = require("jsonwebtoken");
  const AdminUser = require("../models/AdminUser");
  const assert = require("http-assert");
  // experss的子路由
  const router = express.Router({
    mergeParams: true,
  });
  // 登录校验中间件的引用
  const authMiddleware = require("../middleware/auth");
  // 资源(模型)中间件
  const resourceMiddleware = require("../middleware/resource");
  /* admin的所有接口 */
  // const Category = require("../../models/Category");
  // 创建资源
  router.post("/", async (req, res) => {
    // const Model = require(`../../models/${req.params.resource}`)

    // 要想使用下面方法，需要在server的index.js中引入express.json()
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  // 资源列表
  router.get(
    "/",
    // 校验用户是否登录
    async (req, res) => {
      const queryOptions = {};
      // 如果传进来的资源为Category
      if (req.Model.modelName === "Category") {
        // populate聚合查询
        queryOptions.populate = "parent";
      }
      const items = await req.Model.find().setOptions(queryOptions).limit(150);
      res.send(items);
    }
  );
  // 资源详情
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });
  // 修改
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  // 删除
  router.delete("/:id", async (req, res) => {
    // 删除成功，返回一个success为true
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });
  app.use(
    // 1设定路由是什么
    "/admin/api/rest/:resource",
    // 2判断用户是否存在
    authMiddleware(),
    // 3确定模型是什么
    resourceMiddleware(),
    // 4路由
    router
  );

  // 导入multer,建立中间件
  const multer = require("multer");
  // 使用绝对地址
  const upload = multer({ dest: __dirname + "/../../uploads" });
  // 将中间件加入路由，single代表单次上传,file传入子路由
  app.post(
    "/admin/api/upload",
    authMiddleware(),
    // 接收单个文件从的上传
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    },
    router
  );

  // 登录
  app.post("/admin/api/login", async (req, res) => {
    // res.send("111");
    // req.body是客户端提交的数据
    const { username, password } = req.body;
    // res.send(password);

    //  根据用户名找用户
    // const AdminUser = require("../../models/AdminUser");
    // 由于在数据模型中加密密码时设置select:false,所以要强制取出加密后不显示的密码select('+password')
    const user = await AdminUser.findOne({ username }).select("+password");
    // res.send(user.password);

    assert(user, 422, "用户不存在");
    // if (!user) {
    //   return res.status(422).send({
    //     message: "用户名不存在",
    //   });
    // }
    // 核对明文和密文是否匹配
    const isValid = require("bcryptjs").compareSync(password, user.password);
    // password:明文，用户手动输入的 user.password：密文，加密后的
    // 校验密码
    assert(isValid, 422, "密码错误");
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: "密码错误",
    //   });
    // }

    // 返回token
    const token = jwt.sign(
      {
        id: user._id,
      },
      // 在server文件夹中的index.js添加一个全局变量
      // 获取变量secret 密钥
      app.get("secret")
    );

    // console.log({ token });
    res.send({ token });
  });
  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
