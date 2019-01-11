<template>
  <div class="container">
    <mt-header fixed title="Vue商城"></mt-header>
    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab">
      <router-link class="mymui-tab-item" href="#tabbar" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mymui-tab-item" href="#tabbar-with-chat" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mymui-tab-item" href="#tabbar-with-contact" to="/cart">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{$store.getters.getProductNum}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mymui-tab-item" href="#tabbar-with-map" to="search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="scss" scoped>
.mint-header {
  font-size: 18px;
  z-index: 999;
}
.container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
  font-family: sans-serif;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s linear;
}
// mui-tab-item影响了底部tab切换，此处做样式覆盖
.mui-bar-tab .mymui-tab-item.mui-active {
  color: #007aff;
}
.mui-bar-tab .mymui-tab-item {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mymui-tab-item .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mymui-tab-item .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
