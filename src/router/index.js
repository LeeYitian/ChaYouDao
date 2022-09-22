import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashboardPage.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/ProductsList.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/OrdersList.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/CouponsList.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/ArticlesList.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
