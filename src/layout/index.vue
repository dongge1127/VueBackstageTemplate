<template>
  <div class="layout" :class="{ 'fold-layout': !!sidebarStatus }">
    <!-- 左侧菜单栏 -->
    <side-bar></side-bar>
    <div class="main-wrapper">
      <!-- 顶部导航栏 -->
      <nav-bar></nav-bar>
      <!-- 页面主体内容 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import SideBar from "@/layout/components/sideBar";
import NavBar from "@/layout/components/navBar";
import AppMain from "@/layout/components/appMain";
import { mapState } from "vuex";
export default {
  name: "LayoutComponent",
  components: { AppMain, NavBar, SideBar },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sidebarStatus: (state) => state.layout.sidebarStatus,
    }),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.layout {
  box-sizing: border-box;
  width: 100%;
  padding-left: 210px;
}
.fold-layout {
  padding-left: 70px;
}
</style>
