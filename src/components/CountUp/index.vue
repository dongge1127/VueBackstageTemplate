<template>
  <span class="count-up" ref="countUp"></span>
</template>

<script>
import { CountUp } from "countup.js";
export default {
  name: "CountUp",
  props: {
    // 是否自动开启动画
    autoplay: {
      type: Boolean,
      default: true,
    },
    // 动画结束的时间点
    end: {
      type: Number,
      default: 2022,
    },
    // 计数动画的配置项
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      countAnimation: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.countAnimation = new CountUp(
        this.$refs.countUp,
        this.end,
        this.options
      );
      if (this.autoplay) this.countAnimation.start();
    },
  },
};
</script>

<style scoped></style>
