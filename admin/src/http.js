import axios from "axios";
import Vue from "vue";
import router from "./router";

// 创建一个axios实例
const http = axios.create({
  // 环境变量(process.env) 里的Vue_APP_API_URL
  // baseURL:process.env.VUE_APP_API_URL || '/admin/api'
  baseURL: "http://localhost:3000/admin/api",
});

// 校验用户是否登录
http.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    // console.log(err.response)
    // 通用的错误处理，当服务端返回了错误，会弹出提示框，比如：用户不存在，密码错误，登陆成功，element-ui的
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message,
      });
      console.log(err.response);
      // 如果返回401，就跳到登录页
      if (err.response.status === 401) {
        router.push("/login");
        // console.log('login')
      }
    }
    return Promise.reject(err);
  }
);

export default http;
