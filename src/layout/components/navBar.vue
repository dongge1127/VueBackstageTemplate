<template>
  <div class="nav-bar">
    <div class="nav-left">
      <hamburger :is-active="menuShow" @toggleClick="toggleClick"></hamburger>
    </div>
    <div class="nav-left">
      <el-button type="text" @click="logout">退出登录</el-button>
    </div>
  </div>
</template>

<script>
import Hamburger from "@/components/Hamburger";
export default {
  name: "navBar",
  components: { Hamburger },
  data() {
    return {
      menuShow: false,
    };
  },
  methods: {
    toggleClick() {
      this.menuShow = !this.menuShow;
      this.$store.commit("layout/TOGGLE_SIDEBAR", this.menuShow);
    },
    async logout() {
      try {
        await this.$confirm("确定退出登录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await this.$store.dispatch("user/logout");
        await this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      } catch (e) {
        console.log(e);
        if (e !== "cancel") {
          this.$message({
            type: "error",
            message: "退出失败",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}
</style>
