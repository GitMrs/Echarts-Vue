import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/global.less'
import './assets/font/iconfont.css'
/**
 * webScoket
 */

import socketService from '@/utils/socketService'

socketService.Instance.connect()
// 将socket挂在到vue
Vue.prototype.$socket = socketService.Instance

axios.defaults.baseURL = 'http://127.0.0.1:8088/api'
Vue.prototype.$http = axios
// 将window下的echarts挂载到Vue上
Vue.prototype.$echarts = window.echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
