/*
 * @Author: zhoukai zk3366386@163.com
 * @Date: 2024-02-05 11:13:51
 * @LastEditors: zhoukai zk3366386@163.com
 * @LastEditTime: 2024-07-25 09:50:26
 * @FilePath: \lixianshebei\public\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  //重定向
  {
    //没写就是任意路由都是定向这个
    path: '',
    //重定向
    redirect: '/index'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
