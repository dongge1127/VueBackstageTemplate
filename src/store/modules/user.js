import { getToken, removeToken, setToken } from "@/utils/auth";
import { getInfo, getMenus, login, logout } from "@/api/modules/user";
import { listToTree } from "@/utils/listToTree";

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
          const filterMenus = res.data.filter((item) => item.type !== 2);
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
