<template>
  <div class="photoinfomation">
    <h2>现代简约 明亮的外表卧室卧室背景墙、吊顶黄色</h2>
    <p>
      <span>发表时间 : {{picinfo.add_time | dateFormat}}</span>
      <span>点击：{{picinfo.click}}次</span>
    </p>
    <hr>
    <ul>
      <li v-for="item in pics" :key="item.src">
        <img :src="item.src" alt>
      </li>
    </ul>
    <div class="content" v-html="picinfo.content"></div>
    <comments :id="id"></comments>
  </div>
</template>
<script>
import comments from "../subcomponents/comments.vue"
export default {
  data() {
    return {
      id: this.$route.params.id,
      picinfo: [],
      pics: []
    }
  },
  created() {
    this.getPhotoInfo()
    this.getPic()
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        this.picinfo = result.body.message[0]
      });
    },
    getPic() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        this.pics = result.body.message;
      })
    }
  },
  components: {
    comments
  }
}
</script>
<style lang="scss" scoped>
.photoinfomation {
  padding: 3px;
  h2 {
    font-size: 14px;
    color: #26a2ff;
    text-align: center;
    margin: 15px 0;
  }
  p {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  ul {
    margin: 0;
    padding: 0;
    overflow: hidden;
    li {
      list-style: none;
      float: left;
      margin: 10px;
      box-shadow: 0 0 9px #999;
      img {
        width: 100px;
        height: 100px;
        display: block;
      }
    }
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>