<template>
  <router-view :key="routerPath"></router-view>
</template>

<script>
export default {
  name: "EmptyDirectory",
  computed: {
    routerPath() {
      return this.$route.path + (this.$route.query.t || "");
    },
  },
};
</script>

<style scoped></style>
