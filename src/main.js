
import Vue from 'vue'

// 安装vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 购物车数据采用本地存储
var cart = JSON.parse(localStorage.getItem('car')) || []
const store = new Vuex.Store({
  state: {//this.$store.state.***
    // 商品信息[{id:商品id,count:商品数量，price:单价，selected:勾选转态}]
    cart: cart
  },
  mutations: {//this.$store.commit('方法名', '唯一参数')
    addToCart(state, productInfo) {
      // 如果购物车之前已经有这个商品的数据，只需更新商品数量，否则新增一个商品信息
      var flag = true
      state.cart.some(item => {
        if (item.id === productInfo.id) {
          item.count += productInfo.count
          flag = false
          return true
        }
      })
      if (flag) {
        state.cart.push(productInfo)
      }
      // 使用本地存储保存转态
      localStorage.setItem('car', JSON.stringify(cart))
    },
    // 购物车页面修改数量
    modifyNum(state, numobj) {
      state.cart.some(item => {
        if (item.id === numobj.id) {
          // 注意此处一定字符串转数字，
          item.count = Math.ceil(numobj.num)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(cart))
    },
    // 修改商品选中状态
    modifySelected(state, id) {
      state.cart.some(item => {
        if (item.id === id) {
          item.selected = !item.selected
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(cart))
    },
    // 购物车删除功能
    del(state, id) {
      var index = state.cart.findIndex(item => {
        return item.id === id
      })
      state.cart.splice(index, 1)
      localStorage.setItem('car', JSON.stringify(cart))
    }
  },
  getters: {// this.$store.getters.***
    // 获取购物车商品总数量
    getProductNum(state) {
      var totalCount = 0;
      state.cart.forEach(item => {
        totalCount += item.count;
      });
      return totalCount
    },
    // 获取每个商品数量到购物车页面的numbox
    getEveryNum(state) {
      var obj = {}
      state.cart.forEach(item => {
        obj[item.id] = item.count
      })
      return obj
    },
    // 获取商品选中状态进行开关初始化
    getSelectedStatus(state) {
      var obj = {}
      state.cart.forEach(item => {
        obj[item.id] = item.selected
      })
      return obj
    },
    // 获取选中件数的和
    getSelectedCount(state) {
      var count = 0
      state.cart.forEach(item => {
        if (item.selected === true) {
          count += item.count
        }
      })
      return count
    },
    // 获取选中件数的总价
    getSelectedPrice(state) {
      var price = 0
      state.cart.forEach(item => {
        if (item.selected === true) {
          price += item.price * item.count
        }
      })
      return price
    }
  }
})

// import { Swipe, SwipeItem,Header,Button,Lazyload } from 'mint-ui';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Header.name, Header);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload)
// 因实现懒加载功能需全部导入
import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'mint-ui/lib/style.css'

// 导入日期格式化插件
import moment from 'moment'

// 全局日期过滤器，用于格式化日期
Vue.filter('dateFormat', function (time, format = "YYYY-MM-DD HH:mm:ss") {
  return moment(time).format(format);
})

// 安装路由功能
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router'

// Vue 要实现异步加载需要使用到 vue-resource 库。
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005';

import app from './app.vue'

// 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

var vm = new Vue({
  el: '#app',
  data: {

  },
  methods: {

  },
  render: c => c(app),
  router,
  store//挂载store状态管理对象
})