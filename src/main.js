// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {Loading} from 'element-ui'

import store from './assets/store'
import * as IpUtils from './assets/iputils'

//部署使用Prod
//axios.defaults.baseURL = '';
//为了让前端能够带上 cookie
axios.defaults.withCredentials = true;

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(qs);
Vue.prototype.$IpUtils = IpUtils;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
// 设置反向代理，前端请求默认发送到 http://localhost:8888/api
//开发使用Dev
//axios.defaults.baseURL = 'http://localhost:8888/api'

/* eslint-disable no-new */

//全局loading配置
let loading;
//内存中正在请求的数量
let loadingNum=0;
function startLoading() {
  if(loadingNum==0){
    loading = Loading.service({
      lock: true,
      text: '加载中...',
      background:'rgba(255,255,255,0.5)',
      time: 1500
    })
  }
  //请求数量加1
  loadingNum++;
}
function endLoading() {
  //请求数量减1
  loadingNum--
  if(loadingNum<=0){
    loading.close()
  }
}
//请求数据拦截器
axios.interceptors.request.use(request => {
  startLoading();
  return request
}, err => {
  return Promise.reject(err);
});
//接收响应拦截器
axios.interceptors.response.use(response => {
  endLoading();
  return response
}, err => {
  endLoading();
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = '请求错误(400)'; break;
      case 401: this.$router.push('/login'); break;
      case 403: err.message = '拒绝访问(403)'; break;
      case 404: err.message = '请求出错(404)'; break;
      case 408: err.message = '请求超时(408)'; break;
      case 500: err.message = '服务器错误(500)'; break;
      case 501: err.message = '服务未实现(501)'; break;
      case 502: err.message = '网络错误(502)'; break;
      case 503: err.message = '服务不可用(503)'; break;
      case 504: err.message = '网络超时(504)'; break;
      case 505: err.message = 'HTTP版本不受支持(505)'; break;
      default: err.message = `连接出错(${err.response.status})!`;
    }
  } else {
    err.message = '连接服务器失败!'
  }
  message.error(err.message);
  return Promise.reject(err);
});

//登录拦截
router.beforeEach((to,from,next)=>{
  if (to.meta.isLogin == true) {//判断是否需要登录
    if (sessionStorage.getItem("msg") != null) {
      next();
    } else {
      alert("请登录！")
      next({
        path:"/login",
        query:{redirect:to.fullPath}
      });
    }
  } else {
    next();
  }

  // 判断是否需要管理员
  if (to.meta.level == 2) {
    if (sessionStorage.getItem("user_level") == 2) {
      next();
    } else {
      alert("没有权限！");
      next(from);
    }
  } else {
    next();
  }
})

new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
