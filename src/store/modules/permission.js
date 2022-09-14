import { constantRoutes } from "@/router";
import Layout from "@/layout";
import NoData from "@/views/NoData";
import asyncComponents from "@/router/asyncComponents";
import EmptyDirectory from "@/layout/components/EmptyDirectory";
const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES(state, list) {
    state.routes = constantRoutes.concat(list);
  },
};
// 过滤路由
function filterRoutes(menus) {
  return menus.map((menu) => {
    const { id, pid, code, icon, label, type, description, href } = menu;
    const isParent = pid === "-1";
    const path = isParent ? `/${href}` : href;
    let component = null;
    if (type === 0) {
      // 目录，判断目录下是否有菜单
      component = isParent ? Layout : EmptyDirectory;
    } else if (type === 4) {
      // 暂未开发
      component = NoData;
    } else {
      component = asyncComponents[code] ? asyncComponents[code] : NoData;
    }
    return {
      id,
      path: path,
      name: href,
      meta: {
        title: label,
        icon,
        code,
        description,
        type,
      },
      component,
      hidden: type === 3, // 页面不在导航上显示
    };
  });
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise((resolve) => {
      const routes = filterRoutes(menus);
      commit("SET_ROUTES", routes);
      resolve(routes);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
