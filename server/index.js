const express = require("express");
const { json } = require("express");

const app = express();
// 全局设定变量
app.set("secret", "2134asdfaesr");

// 引入跨域模块
app.use(require("cors")());

app.use(express.json());
// 在入口文件中设置托管
app.use("/admin", express.static(__dirname + "/admin"));
// 表示uploads下面的文件都是静态文件
app.use("/uploads", express.static(__dirname + "/uploads"));

require("./plugins/db")(app);
// 引用函数并执行
require("./routes/admin")(app);

app.listen(3000, () => {
  console.log("app is 3000");
});
