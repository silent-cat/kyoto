import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
// 登录
import Login from "../views/Login";
// 分类
import CategoryEdit from "../views/CategoryEdit";
import CategoryList from "../views/CategoryList";
// 装备
import ItemEdit from "../views/ItemEdit";
import ItemList from "../views/ItemList";
// 式神
import CharacterEdit from "../views/CharacterEdit";
import CharacterList from "../views/CharacterList";
//文章
import ArticleEdit from "../views/ArticleEdit";
import ArticleList from "../views/ArticleList";
// 广告位
import AdEdit from "../views/AdEdit";
import AdList from "../views/AdList";

import AdminUserEdit from "../views/AdminUserEdit";
import AdminUserList from "../views/AdminUserList";

Vue.use(VueRouter);
// 在router的index.js文件中添加

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  // {
  //   path: "/",
  //   redirect: "/main",
  // },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { isPublic: true },
  },
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      // 不同的地址使用同一个页面组件
      {
        path: "/categories/create",
        component: CategoryEdit,
      },
      {
        path: "/categories/edit/:id",
        component: CategoryEdit,
        // 把:id(动态参数)注入到CategoryEdit里面
        props: true,
      },
      {
        path: "/categories/list",
        component: CategoryList,
      },

      {
        path: "/items/create",
        component: ItemEdit,
      },
      {
        path: "/items/edit/:id",
        component: ItemEdit,
        props: true,
      },
      {
        path: "/items/list",
        component: ItemList,
      },

      {
        path: "/characters/create",
        component: CharacterEdit,
      },
      {
        path: "/characters/edit/:id",
        component: CharacterEdit,
        props: true,
      },
      {
        path: "/characters/list",
        component: CharacterList,
      },
      {
        path: "/articles/create",
        component: ArticleEdit,
      },
      {
        path: "/articles/edit/:id",
        component: ArticleEdit,
        props: true,
      },
      {
        path: "/articles/list",
        component: ArticleList,
      },
      {
        path: "/ads/create",
        component: AdEdit,
      },
      {
        path: "/ads/edit/:id",
        component: AdEdit,
        props: true,
      },
      {
        path: "/ads/list",
        component: AdList,
      },
      {
        path: "/admin_users/create",
        component: AdminUserEdit,
      },
      {
        path: "/admin_users/edit/:id",
        component: AdminUserEdit,
        props: true,
      },
      {
        path: "/admin_users/list",
        component: AdminUserList,
      },
    ],
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  // console.log(to.meta)
  // 如果
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});
export default router;
