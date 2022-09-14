import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";
import user from "@/store/modules/user";
import layout from "@/store/modules/layout";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    layout,
  },
  getters,
});

export default store;
