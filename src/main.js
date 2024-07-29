/*
 * @Author: zhoukai zk3366386@163.com
 * @Date: 2023-08-16 18:13:30
 * @LastEditors: zhoukai zk3366386@163.com
 * @LastEditTime: 2024-07-25 15:59:40
 * @FilePath: \h5newxunjian\public\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vant from 'vant'
import { Toast } from 'vant';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css'

Vue.use(Toast);
Vue.use(ElementUI);
Vue.use(Vant)
Vue.prototype.axios = axios;
Vue.config.productionTip = false

new Vue({
  axios,
  router,
  render: h => h(App)
}).$mount('#app')

