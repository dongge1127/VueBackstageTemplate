import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Layout from "@/layout";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index"),
        meta: { title: "Home", icon: "home" },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true },
];
// 创建路由对象
const createRouter = () => {
  return new VueRouter({
    // mode: "history",
    scrollBehavior: () => ({ y: 0 }), // 路由跳转后回到页面顶部
    routes: constantRoutes,
  });
};

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}
export default router;
