
import Vue from 'vue'

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
  router
})