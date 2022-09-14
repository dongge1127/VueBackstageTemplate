<template>
  <component
    :index="basePath + '/' + item.href"
    :is="
      (item.children && item.children.length ? 'Submenu' : 'MenuItem')
        | componentFilter
    "
  >
    <template v-if="item.children && item.children.length">
      <template slot="title">
        <i v-if="item.icon" :class="`el-icon-${item.icon}`"></i>
        <span>{{ item.label }}</span>
      </template>
      <nav-menu
        v-for="secondItem in item.children"
        :key="secondItem.id"
        :item="secondItem"
        :basePath="basePath + '/' + item.href"
      />
    </template>
    <template v-else>
      <i v-if="item.icon" :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
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
};
</script>

<style scoped></style>
