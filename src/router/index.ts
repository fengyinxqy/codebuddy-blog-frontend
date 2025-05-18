import { createRouter, createWebHistory } from 'vue-router'

import { authGuard } from './auth-guard'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: {
            title: '首页',
          },
        },
        {
          path: 'articles',
          name: 'articles',
          component: () => import('@/views/ArticlesView.vue'),
          meta: {
            title: '文章列表',
          },
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/views/CategoriesView.vue'),
          meta: {
            title: '分类',
          },
        },
        {
          path: 'tags',
          name: 'tags',
          component: () => import('@/views/TagsView.vue'),
          meta: {
            title: '标签',
          },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/AboutView.vue'),
          meta: {
            title: '关于',
          },
        },
        {
          path: 'article/:id',
          name: 'article',
          component: () => import('@/views/ArticleDetailView.vue'),
          meta: {
            title: '文章详情',
          },
        },
        {
          path: 'article/edit/:id?',
          name: 'article-edit',
          component: () => import('@/views/ArticleEditView.vue'),
          meta: {
            title: '编辑文章',
            requiresAuth: true,
          },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/AuthView.vue'),
          meta: {
            title: '登录',
            guestOnly: true,
          },
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue'),
          meta: {
            title: '个人资料',
            requiresAuth: true,
          },
        },
      ],
    },
  ],
})

// 全局前置守卫
router.beforeEach(authGuard)

export default router
