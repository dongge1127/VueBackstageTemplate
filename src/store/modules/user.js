import { getToken, removeToken, setToken } from "@/utils/auth";
import { getInfo, getMenus, login, logout } from "@/api/modules/user";
import { listToTree } from "@/utils/listToTree";
import Layout from "@/layout";
import EmptyDirectory from "@/layout/components/EmptyDirectory";
import NoData from "@/components/NoData";
import asyncComponents from "@/router/asyncComponents";

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: null,
    menus: [],
  };
};

const state = getDefaultState();

const mutations = {
  SET_STATE(state) {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  SET_MENUS(state, menus) {
    state.menus = menus;
  },
};

// 过滤路由
function filterRoutes(menus) {
  if (!menus || !menus.length) return [];
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
      pid,
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
  // 登录
  login({ commit }, userInfo) {
    const { userName, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), password })
        .then((res) => {
          console.log("登录接口响应对象", res);
          if (res.data) {
            commit("SET_TOKEN", res.data.token);
            setToken(res.data.token);
          }
          resolve(res.data.token);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo(getToken())
        .then((res) => {
          commit("SET_USER_INFO", res.data);
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 获取权限菜单
  getMenus({ commit }, params = {}) {
    return new Promise((resolve, reject) => {
      getMenus(params)
        .then((res) => {
          // 仅保留目录和菜单
          const filterMenus = filterRoutes(res.data).filter(
            (item) => item.meta.type !== 2
          );
          // 将平级结构转换为树结构
          const menus = listToTree(filterMenus, "pid");
          console.log("当前菜单列表", menus);
          commit("SET_MENUS", menus);
          resolve(menus);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 退出登录
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then((res) => {
          removeToken();
          commit("SET_STATE");
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken();
      commit("SET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
