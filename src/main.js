import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/styles/index.scss";
import "@/permission";

import ElementUI from "element-ui"; // 引入组件
import "element-ui/lib/theme-chalk/index.css"; // 组件样式
import locale from "element-ui/lib/locale/lang/zh-CN"; // 中文字体包
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
