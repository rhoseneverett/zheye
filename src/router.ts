import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import PostDetail from './views/PostDetail.vue'
import { useUserStore } from './store/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
      // component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      // component: () => import('@/views/Login.vue'),
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      // component: () => import('@/views/Signup.vue'),
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      // component: () => import('@/views/CreatePost.vue'),
      meta: { requiredLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
      // component: () => import('@/views/ColumnDetail.vue'),

    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostDetail
      // component: () => import('@/views/PostDetail.vue'),

    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const { token, isLogin} = userStore
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!isLogin) {
    if (token) {
      try {
        await userStore.fetchCurrentUser()
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      } catch (e) {
        console.error(e)
        userStore.logout()
        next('login')
      }
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
