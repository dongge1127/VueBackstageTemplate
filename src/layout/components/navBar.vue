<template>
  <div class="nav-bar">
    <div class="nav-left">
      <hamburger :is-active="menuShow" @toggleClick="toggleClick"></hamburger>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="bread in breadList" :key="bread.path">
          <a
            @click.prevent="handleBreadClick(bread)"
            v-if="bread.meta.type === 0"
            >{{ bread.meta.title }}</a
          >
          <span v-else>{{ bread.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav-right">
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
      breadList: [],
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      console.log(this.$route.matched);
      this.breadList = this.$route.matched;
    },
    handleBreadClick(bread) {
      console.log("面包屑内容", bread);
    },
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
  .nav-left {
    display: flex;
    align-items: center;
    .el-breadcrumb {
      margin-left: 20px;
    }
  }
}
</style>
