<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in images" :key="item.id">
        <img :src="item.img" alt>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 分类 -->
    <ul class="mui-table-view mui-grid-view mui-grid-6">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>  
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      images: []
    };
  },
  created() {
    this.getSwipe();
  },
  methods: {
    getSwipe() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(result => {
          if (result.body.status === 0) {
            this.images = JSON.parse(result.bodyText).message;
            console.log(result);
          } else {
            Toast("加载失败");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
.mui-table-view {
  font-size: 13px;
  img{
    width: 60px;
    height: 60px;
  }
}
</style>
