<template>
  <div class="menu-container">
    <!-- router设为true，则menu-item绑定的index会作为菜单路由的path -->
    <el-menu
      :router="true"
      :collapse="sidebarStatus"
      :collapse-transition="false"
      background-color="#4F94CD"
      text-color="#ffffff"
      @open="handleOpen"
      @close="handleClose"
    >
      <nav-menu v-for="item in menus" :key="item.id" :item="item"></nav-menu>
    </el-menu>
  </div>
</template>

<script>
import NavMenu from "@/views/home/components/navMenu";
import { mapGetters, mapState } from "vuex";
export default {
  name: "sideBar",
  components: { NavMenu },
  data() {
    return {
      // isCollapse: false,
    };
  },
  computed: {
    ...mapState({
      sidebarStatus: (state) => state.layout.sidebarStatus,
    }),
    ...mapGetters(["menus"]),
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 210px;
  height: 100vh;
  overflow-y: auto;
  ::v-deep .el-menu {
    height: 100%;
    .el-submenu__title i {
      color: #fff;
    }
  }
}
</style>
