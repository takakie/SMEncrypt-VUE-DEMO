import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'home',
    component: Home
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/Register',
    name: 'register',
    component: Register
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 检查 sessionStorage 中是否存在 token
  const token = sessionStorage.getItem('token')

  if (!token && to.path !== '/Login') {
    // 如果不存在 token 并且目标路由不是登录页面，则重定向到登录页面
    next('/Login')
  } 
  else if (token && to.path == '/Login'){
    next('/Home')
  }
  else {
    // 否则，正常跳转
    next()
  }
})
export default router
