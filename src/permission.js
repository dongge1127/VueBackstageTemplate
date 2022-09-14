import router from "@/router";
import { getToken } from "@/utils/auth";
import store from "@/store";

import NProgress from "nprogress"; // 引入进度条组件
import "nprogress/nprogress.css"; // 进度条样式
NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  console.log("当前路由的path", to.path);
  const token = getToken();
  console.log("token:", getToken());
  // 如果有token
  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      const menus = store.getters.menus;
      if (menus.length) {
        next();
      } else {
        try {
          await store.dispatch("user/getInfo");
          const menus = await store.dispatch("user/getMenus");
          menus.push(
            // 404 page must be placed at the end !!!
            { path: "*", redirect: "/", hidden: true }
          );
          menus.forEach((item) => {
            router.addRoute(item);
          });
          next({ ...to, replace: true });
        } catch (e) {
          console.log(e);
          await store.dispatch("user/resetToken");
          next({ path: `/login?redirect=${to.path}` });
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: `/login?redirect=${to.path}` });
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
