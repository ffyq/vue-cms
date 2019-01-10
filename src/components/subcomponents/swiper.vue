<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in images" :key="item.id">
        <img :src="item.img" :class="{full:flag}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: ["images", "flag"]
};
</script>
<style lang="scss">
.mint-swipe {
  height: 200px;
  text-align: center;
  img {
    height: 100%;
  }
  // 首页轮播图与商品详情轮播图样式有区分，通过添加类来实现需求
  .full {
    width: 100%;
  }
}
</style>