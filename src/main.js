console.log('ok')
import Vue from 'vue'

import { Header } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Vue 要实现异步加载需要使用到 vue-resource 库。
import VueResource from 'vue-resource'
Vue.use(VueResource)

import router from './router'

import app from './app.vue'


import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

var vm = new Vue({
  el:'#app',
  data:{

  },
  methods:{

  },
  render:c=>c(app),
  router
})