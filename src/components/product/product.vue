<template>
  <div class="product">
    <div v-for="item in product" :key="item.id" class="pro_item" @click="goDetail(item.id)">
      <img :src="item.img_url" alt>
      <h5>{{item.title}}</h5>
      <div class="pro_info">
        <p>
          <span class="sell_price">&yen;{{item.sell_price}}</span>
          <span class="market_price">&yen;{{item.market_price}}</span>
        </p>
        <p class="hot_sale">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="primary" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      number: 1,
      product: []
    };
  },
  created() {
    this.getPoduct();
  },
  methods: {
    // 获取产品数据
    getPoduct() {
      this.$http.get("api/getgoods?pageindex=" + this.number).then(result => {
        if (result.body.message.length === 0) {
          //如果请求回来的数据数组为空，说明没更多数据
          return Toast("暂无更多数据");
        }
        this.product = this.product.concat(result.body.message);
      });
    },
    // 加载更多，将新请求回来的数据跟原有数据进行数组拼接成一个新的数组
    getMore() {
      this.number++;
      this.getPoduct();
    },
    // 通过js实现路由跳转
    goDetail(id) {
      this.$router.push({ name: "product_detail", params: { id: id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.product {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  padding-bottom: 0;
  justify-content: space-between;
  .pro_item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 250px;
    width: 49%;
    box-shadow: 0 0 0 1px #ccc;
    margin-bottom: 5px;
    padding: 3px;
    img {
      width: 100%;
    }
    h5 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 12px;
      color: #000;
    }
    .pro_info {
      background: #eee;
      padding: 3px;
      p {
        margin: 3px 0;
      }
      .sell_price {
        font-size: 14px;
        color: red;
      }
      .market_price {
        color: #ccc;
        font-size: 12px;
        text-decoration: line-through;
      }
      .hot_sale {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
