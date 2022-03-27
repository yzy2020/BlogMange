import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login')
  },
  {
    path: '/Home',
    component: () => import(/* webpackChunkName: "Home"*/ '../views/Home/Home'),
    children: [
      {
        path: 'Index',
        name:'Index',
        component:() => import(/*webpackChunkName: "Index" */ '@/views/Index/Index')
      },
      {
        path: 'UserInfo',
        name: 'UserInfo',
        component: () => import(/*  webpackChunkName: "UserInfo" */ '../views/UserModule/UserInfo/UserInfo')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
