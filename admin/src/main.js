import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";

import "./assets/style.css";
Vue.config.productionTip = false;
import http from "./http";

// 将http挂载到vue原型，这样在任意页面都可以使用this.$http去访问任意接口
Vue.prototype.$http = http;

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload";
    },
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ""}`,
      };
    },
  },
});
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
