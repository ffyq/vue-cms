<template>
  <div class="container">
    <div class="mui-card" v-for="item in cartGoods" :key="item.id">
      <div class="mui-card-content">
        <mt-switch
          v-model="$store.getters.getSelectedStatus[item.id]"
          @change="selectedStatus(item.id)"
        ></mt-switch>
        <img :src="item.thumb_path" alt>
        <div class="right">
          <h1>{{item.title}}</h1>
          <p class="price">
            <span class="red">&yen;{{item.sell_price}}</span>
            <!-- 将数量值传递给子组件 -->
            <numbox :everyNum="$store.getters.getEveryNum[item.id]" :id="item.id"></numbox>
            <a href="#">删除</a>
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content compute">
        <div>
          <p>总计 (不含运费)</p>
          <p>
            已勾选商品
            <span>{{$store.getters.getSelectedCount}}</span>件，总价
            <span>&yen;{{$store.getters.getSelectedPrice}}</span>
          </p>
        </div>
        <mt-button type="danger">去结算</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from "../subcomponents/cart_numbox.vue";
export default {
  data() {
    return {
      cartGoods: []
    };
  },
  created() {
    this.getCartGoods();
  },
  methods: {
    // 获取购物车商品数据
    getCartGoods() {
      var idArr = [];
      this.$store.state.cart.forEach(item => {
        idArr.push(item.id);
      });
      // 如果购物车中没有商品，则不请求数据
      if (idArr.length === 0) return;
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          this.cartGoods = result.body.message;
        });
    },
    selectedStatus(id) {
      this.$store.commit("modifySelected", id);
    }
  },
  components: {
    numbox
  }
};
</script>
<style lang="scss" scoped>
.container {
  background: #eee;
  padding: 10px;
  .mui-card {
    margin: 0;
    margin-bottom: 10px;
    padding: 10px;
    .mui-card-content {
      display: flex;
      align-items: center;
      .right {
        padding: 0 7px;
      }
      img {
        width: 60px;
        height: 60px;
      }
      h1 {
        font-size: 13px;
        margin: 10px 0;
      }

      .red {
        color: red;
        font-weight: bold;
      }
    }
  }
}
.compute {
  display: flex;
  justify-content: space-between;
  span {
    font-size: 16px;
    color: red;
    font-weight: bold;
  }
}
</style>
