<template>
  <component
    :index="resolvePath"
    :is="
      (item.children && item.children.length ? 'Submenu' : 'MenuItem')
        | componentFilter
    "
  >
    <template v-if="item.children && item.children.length">
      <template v-if="item.meta" slot="title">
        <i v-if="item.meta.icon" :class="`el-icon-${item.meta.icon}`"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <nav-menu
        v-for="secondItem in item.children"
        :key="secondItem.id"
        :item="secondItem"
        :basePath="resolvePath"
      />
    </template>
    <template v-else-if="item.meta">
      <i v-if="item.meta.icon" :class="`el-icon-${item.meta.icon}`"></i>
      <span slot="title">{{ item.meta.title }}</span>
    </template>
  </component>
</template>

<script>
import { MenuItem, Submenu } from "element-ui";

export default {
  name: "navMenu",
  props: {
    item: {
      type: Object,
      required: true,
    },
    // 拼接的path
    basePath: {
      type: String,
      default: "",
    },
  },
  filters: {
    componentFilter(val) {
      const map = {
        MenuItem: MenuItem,
        Submenu: Submenu,
      };
      if (typeof val === "string") {
        return map[val];
      } else {
        return val;
      }
    },
  },
  computed: {
    resolvePath() {
      return (this.basePath ? this.basePath + "/" : "") + this.item.path;
    },
  },
};
</script>

<style scoped></style>
