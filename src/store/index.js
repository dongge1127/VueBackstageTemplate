import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";
import user from "@/store/modules/user";
import layout from "@/store/modules/layout";
import permission from "@/store/modules/permission";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    layout,
    permission,
  },
  getters,
});

export default store;
