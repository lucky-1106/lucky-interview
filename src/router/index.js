import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Companies from '@/views/companies/Companies'
import Questions from '@/views/questions/Questions'
import Articles from '@/views/articles/Articles'
import User from '@/views/user/User'
import Login from '@/views/Login.vue'
import { getToken } from '@/utils/token'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    redirect: '/main/companies'
  },
  {
    name: '登录',
    path: '/login',
    component: Login
  },
  {
    name: 'main',
    path: '/main',
    component: Main,
    meta: {
      title: '主页面'
    },
    children: [
      {
        name: '企业',
        path: '/main/companies',
        component: Companies,
        meta: {
          title: '企业',
          icon: 'gongsi'
        }
      },
      {
        name: '刷题',
        path: '/main/questions',
        component: Questions,
        meta: {
          title: '刷题',
          icon: 'form'
        }
      },
      {
        name: '发现',
        path: '/main/articles',
        component: Articles,
        meta: {
          title: '发现',
          icon: 'faxian'
        }
      },
      {
        name: '我的',
        path: '/main/user',
        component: User,
        meta: {
          title: '我的',
          icon: 'user'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/main/questions' || to.path === '/main/user') {
    if (getToken()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
