// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import './assets/css/reset.css'
import './assets/js/rem'
import './assets/font/iconfont.css'
//vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import axios from 'axios'
Vue.prototype.$axios = axios
//jq
import $ from 'jquery'
//过滤器
import filter from './filter'
for(var i in filter){
    Vue.filter(i,filter[i])
}
//vuex
import store from './store/index'
Vue.prototype.$ = $
/* eslint-disable no-new */
//响应拦截
axios.interceptors.response.use(response => {
    console.log('==='+response.config.url+'===')
    console.log(response)
    return response
});
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
