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
  },
  {
    path: '/',
    component: () => import('../views/IndexHome.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/IndexPage.vue')
      },
      {
        path: 'product',
        component: () => import('../views/IndexProduct.vue'),
        redirect: {
          path: '/product/all',
          component: () => import('../views/IndexProductSelect.vue')
        },
        children: [
          {
            path: 'all',
            component: () => import('../views/IndexProductSelect.vue')
          },
          {
            path: 'tea',
            component: () => import('../views/IndexProductSelect.vue')
          },
          {
            path: 'tool',
            component: () => import('../views/IndexProductSelect.vue')
          },
          {
            path: 'dessert',
            component: () => import('../views/IndexProductSelect.vue')
          },
          {
            path: 'package',
            component: () => import('../views/IndexProductSelect.vue')
          },
          {
            path: 'sales',
            component: () => import('../views/IndexProductSelect.vue')
          }
        ]
      },
      {
        path: 'article',
        component: () => import('../views/IndexArticle.vue'),
        children: [
          {
            path: ':id',
            component: () => import('../views/IndexArticleSelect.vue')
          }
        ]
      },
      {
        path: 'favorite',
        component: () => import('../views/IndexFavorite.vue')
      },
      {
        path: 'details/:id',
        component: () => import('../views/IndexProductDetails.vue')
      }
    ]
  },
  {
    path: '/order',
    component: () => import('../views/IndexOrder.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/IndexCreateOrder.vue')
      },
      {
        path: 'list',
        component: () => import('../views/IndexOrderList.vue')
      },
      {
        path: ':id',
        component: () => import('../views/IndexOrderPayment.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
