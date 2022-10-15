import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
    meta: {
      title: '登入 | 茶友道後台管理系統'
    }
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashboardPage.vue'),
    meta: {
      title: '茶友道後台管理系統'
    },
    children: [
      {
        path: 'products',
        component: () => import('../views/ProductsList.vue'),
        meta: {
          title: '產品 | 茶友道後台管理系統'
        }
      },
      {
        path: 'orders',
        component: () => import('../views/OrdersList.vue'),
        meta: {
          title: '訂單 | 茶友道後台管理系統'
        }
      },
      {
        path: 'coupons',
        component: () => import('../views/CouponsList.vue'),
        meta: {
          title: '優惠券 | 茶友道後台管理系統'
        }
      },
      {
        path: 'articles',
        component: () => import('../views/ArticlesList.vue'),
        meta: {
          title: '文章 | 茶友道後台管理系統'
        }
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
          component: () => import('../views/IndexProductSelect.vue'),
          meta: {
            title: '茶葉．茶具．茶點．茶友道'
          }
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
        meta: {
          title: '文章．茶友道．不只喝茶還要懂茶'
        },
        children: [
          {
            path: ':id',
            component: () => import('../views/IndexArticleSelect.vue')
          }
        ]
      },
      {
        path: 'favorite',
        component: () => import('../views/IndexFavorite.vue'),
        meta: {
          title: '你的最愛 | 茶友道．最貼心的茶伴'
        }
      },
      {
        path: 'details/:id',
        component: () => import('../views/IndexProductDetails.vue'),
        meta: {
          title: '產品介紹 | 茶葉．茶具．茶點．茶友道'
        }
      }
    ]
  },
  {
    path: '/order',
    component: () => import('../views/IndexOrder.vue'),
    meta: {
      title: '訂單 | 茶友道．最貼心的茶伴'
    },
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
const defaultTitle = '茶友道．最貼心的茶伴'
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : defaultTitle
  next()
})

export default router
