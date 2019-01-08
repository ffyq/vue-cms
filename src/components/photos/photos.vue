<template>
  <div>
    <!-- 图片分类 -->
    <div
      class="mui-scroll-wrapper mui-slider-indicatorcode mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a
          :class="['mui-control-item',item.id===0?'mui-active':'']"
          v-for="item in photoCate"
          :key="item.id"
          @tap="getPhotoList(item.id)"
        >{{item.title}}</a>
      </div>
    </div>
    <!-- 图片列表 -->
    <ul class="photoList">
      <router-link
        v-for="item in photoList"
        :key="item.id"
        tag="li"
        :to="'/home/photoinfo/'+item.id"
      >
        <img v-lazy="item.img_url">
        <div class="info">
          <h2 class="info-title">{{ item.title }}</h2>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  data() {
    return {
      photoCate: [],
      photoList: []
    };
  },
  created() {
    this.getPhotoCate();
    this.getPhotoList(0);
  },
  mounted() {
    //此时DOM结构被渲染好并放到页面中,操作dom元素
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  methods: {
    getPhotoCate() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          result.body.message.unshift({ title: "全部", id: 0 });
          this.photoCate = result.body.message;
        }
      });
    },
    getPhotoList(id) {
      this.$http.get("api/getimages/" + id).then(result => {
        this.photoList = result.body.message;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
// https://www.jianshu.com/p/04bf173826aa移动端Web界面滚动性能优化 Passive event listeners
* {
  touch-action: pan-y;
}
.photoList {
  padding: 10px 10px 0 10px;
  margin: 0;
  li {
    position: relative;
    background: #ccc;
    list-style: none;
    color: #fff;
    box-shadow: 0 0 9px #999;
    margin-bottom: 10px;
    img{
      width: 100%;
      display: block;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      position: absolute;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      max-height: 86px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>