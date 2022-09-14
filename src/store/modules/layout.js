const state = {
  sidebarStatus: false, // 左侧菜单展开状态
};

const mutations = {
  TOGGLE_SIDEBAR(state, status) {
    state.sidebarStatus = status;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
