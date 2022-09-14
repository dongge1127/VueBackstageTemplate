<template>
  <div class="shop-info">
    <h3>商品信息</h3>
    <div>
      <el-input v-model="inputValue" placeholder="请输入商品名称"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  data() {
    return {
      inputValue: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.shop-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 300px;
    margin-top: 20px;
  }
}
</style>
