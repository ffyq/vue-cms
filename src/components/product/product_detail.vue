<template>
  <div class="product_detail">
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <swiper :images="images"></swiper>
      </div>
    </div>
    <!-- 商品标题 -->
    <div class="mui-card">
      <div class="mui-card-header">{{productDetail.title}}</div>
      <div class="mui-card-content">
        <p>
          市场价 :
          <span class="market_price">&yen;{{productDetail.market_price}}</span>&nbsp;&nbsp;
          销售价 :
          <span class="sale_price">&yen;{{productDetail.sell_price}}</span>
        </p>
        <div class="count">购买数量 :
          <numbox :max="productDetail.stock_quantity" @getCount="getCount"></numbox>
        </div>
        <div class="bottom">
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
        </div>
      </div>
    </div>
    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <p>商品货号 : {{productDetail.goods_no}}</p>
        <p>库存情况 : {{productDetail.stock_quantity}}</p>
        <p>上架时间 : {{productDetail.add_time | dateFormat}}</p>
      </div>
      <div class="mui-card-footer">
        <mt-button type="danger" size="large" plain @click="goComments($route.params.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/pro_numbox.vue";
import mui from "../../lib/mui/js/mui.min.js";
export default {
  data() {
    return {
      images: [],
      id: this.$route.params.id,
      productDetail: [],
      // 用户默认选中件数为1
      selectedCount: 1
    };
  },
  created() {
    this.getSwiper();
    this.getProductDetail();
  },
  mounted() {
    this.initNumBox();
  },
  methods: {
    getSwiper() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        result.body.message.forEach(element => {
          element.img = element.src;
        });
        this.images = result.body.message;
      });
    },
    getProductDetail() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        this.productDetail = result.body.message[0];
      });
    },
    // 初始化数字输入框
    initNumBox() {
      mui(".mui-numbox").numbox();
    },
    // 获取数字输入框选中的数量
    getCount(count) {
      this.selectedCount = count;
    },
    // 添加到购物车
    addToCart() {
      var productInfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.productDetail.sell_price,
        selected: false
      };
      this.$store.commit("addToCart", productInfo);
    },
    // 前往商品评论页面
    goComments(id) {
      this.$router.push({ name: "comments", params: { id: id } });
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>
<style lang="scss">
.product_detail {
  background: #eee;
  padding-top: 10px;
  .mui-card {
    margin-top: 0;
    .mui-card-content {
      min-height: 230px;
      padding: 15px;
      .count {
        margin: 10px 0;
      }
      p {
        margin-bottom: 10px;
        .market_price {
          text-decoration: line-through;
        }
        .sale_price {
          color: red;
        }
      }
      .bottom {
        margin-bottom: 10px;
      }
    }
  }
  .mui-card-footer {
    display: block;
    .mint-button {
      margin: 10px 0;
    }
  }
}
</style>