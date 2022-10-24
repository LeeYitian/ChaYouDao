<template>
  <div class="details-bp min-vh-100">
    <div class="details-main py-3">
      <main class="container">
        <div class="row p-2">
          <nav style="--bs-breadcrumb-divider: '>'">
            <ol class="breadcrumb">
              <li v-for="(i, index) in breadcrumb" :key="index" class="breadcrumb-item"
                :class="{ active: index === breadcrumb.length - 1 }">
                <router-link :to="i.path" v-if="index !== breadcrumb.length - 1">{{ i.page }}</router-link>
                {{ index === breadcrumb.length - 1 ? i.page : null }}
              </li>
            </ol>
          </nav>
          <PlaceholderComponent v-if="placeholder" :page="placeholderPage"></PlaceholderComponent>
          <div v-if="!placeholder" class="col-sm-5 col-lg-4">
            <img :src="displayUrl || product.imageUrl" class="img-fluid img-thumbnail img-main" alt="產品圖片" />
            <div v-if="product.imagesUrl" class="row g-0 flex-nowrap mt-1">
              <div id="detailsCarousel" class="carousel slide">
                <div class="carousel-inner">
                  <div v-for="(i, index) in product.imagesUrl" :key="index" class="carousel-item"
                    :class="{ active: index === 0 }">
                    <div class="col-4">
                      <img :src="i" class="img-fluid img-minor" alt="產品圖片" />
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#detailsCarousel"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#detailsCarousel"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <article v-if="!placeholder"
            class="col-sm-7 col-lg-6 mt-3 mt-sm-0 d-flex flex-column position-relative text-primary">
            <i class="bi" :class="{'bi-heart': !favorites.includes(productID), 'bi-heart-fill': favorites.includes(productID)}" @click="favorite(productID, $event)"></i>
            <h1>{{ product.title }}</h1>
            <p>{{ product.description }}</p>
            <div v-if="product.price < product.origin_price" class="d-flex justify-content-between align-items-center">
              <span class="text-decoration-line-through d-none d-sm-inline">原價：{{
              $filters.currency(product.origin_price) }}</span><br />
              <span class="text-danger fs-4 fw-semibold">特價：{{ $filters.currency(product.price) }} 元<span
                  class="fs-6 text-primary">
                  /{{ product.unit }}</span></span>
            </div>
            <span v-else class="fs-5 text-lightgreen fw-semibold related-none">$ {{
            $filters.currency(product.origin_price) }} 元
              <span class="fs-6"> /{{ product.unit }}</span>
            </span>
            <div class="row mt-3 mt-lg-auto">
              <div class="col-lg-5">
                <div class="input-group" role="group">
                  <button type="button" class="btn btn-darkbrown" @click="qty === 0 ? qty === 0 : qty--">
                    －
                  </button>
                  <input v-model="qty" type="number" min="0" class="form-control" />
                  <button type="button" class="btn btn-darkbrown" @click="qty++">
                    ＋
                  </button>
                </div>
              </div>
              <div class="col-lg-5 ms-auto mt-1 mt-lg-0">
                <button type="button" class="btn btn-darkbrown w-100" :class="{ disabled: adding }"
                  @click="addToCart(productID, qty)">
                  <div v-if="adding" class="spinner-border spinner-border-sm text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  加入購物車
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
    <div class="details-main py-3 mt-4 bg-altowhite">
      <section class="container w-75">
        <div class="row">
          <ul class="nav nav-tabs">
            <li class="d-none d-sm-block nav-item">
              <button class="nav-link" :class="{ active: tab === 'content' }" @click="tab = 'content'">
                商品說明
              </button>
            </li>
            <li class="d-none d-sm-block nav-item">
              <button class="nav-link" :class="{ active: tab === 'related' }" @click="tab = 'related'">
                相關商品
              </button>
            </li>
            <li class="d-none d-sm-block nav-item">
              <button class="nav-link" :class="{ active: tab === 'policy' }" @click="tab = 'policy'">
                退換貨政策
              </button>
            </li>
            <li class="d-block d-sm-none nav-item dropdown">
              <button class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button">
                其他說明
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button class="dropdown-item" :class="{ active: tab === 'content' }" @click="tab = 'content'">
                    商品說明
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" :class="{ active: tab === 'related' }" @click="tab = 'related'">
                    相關商品
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" :class="{ active: tab === 'policy' }" @click="tab = 'policy'">
                    退換貨政策
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="row mt-4 text-primary">
          <p v-if="tab === 'content'">{{ product.content }}</p>
          <div v-else-if="tab === 'related'">
            <div class="row">
              <IndexProductSelect :select-products="relatedProduct"></IndexProductSelect>
            </div>
          </div>
          <div v-else-if="tab === 'policy'">
            <ol>
              <li>
                企業經營者以通訊交易或訪問交易方式訂立契約時，應將下列資訊以清楚易懂之文句記載於書面，提供消費者：<br />
                一、企業經營者之名稱、代表人、事務所或營業所及電話或電子郵件等消費者得迅速有效聯絡之通訊資料。<br />
                二、商品或服務之內容、對價、付款期日及方式、交付期日及方式。<br />
                三、消費者依第十九條規定解除契約之行使期限及方式。<br />
                四、商品或服務依第十九條第二項規定排除第十九條第一項解除權之適用。<br />
                五、消費申訴之受理方式。 六、其他中央主管機關公告之事項。
              </li>
              <li>
                經由網際網路所為之通訊交易，前項應提供之資訊應以可供消費者完整查閱、儲存之電子方式為之。
              </li>
              <li>
                通訊交易或訪問交易之消費者，得於收受商品或接受服務後七日內，以退回商品或書面通知方式解除契約，無須說明理由及負擔任何費用或對價。但通訊交易有合理例外情事者，不在此限。
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style>
#detailsCarousel .carousel-inner .carousel-item.active,
#detailsCarousel .carousel-inner .carousel-item-next,
#detailsCarousel .carousel-inner .carousel-item-prev {
  display: flex;
}

#detailsCarousel .carousel-inner .carousel-item-end.active,
#detailsCarousel .carousel-inner .carousel-item-next {
  transform: translateX(33%);
}

#detailsCarousel .carousel-inner .carousel-item-start.active,
#detailsCarousel .carousel-inner .carousel-item-prev {
  transform: translateX(-33%);
}

#detailsCarousel .carousel-inner .carousel-item-end,
#detailsCarousel .carousel-inner .carousel-item-start {
  transform: translateX(0);
}
</style>

<script>
import IndexProductSelect from '@/views/IndexProductSelect.vue'
import PlaceholderComponent from '@/components/PlaceholderComponent.vue'
import addFavorite from '@/mixins/addFavorite.js'
import 'bootstrap/js/dist/carousel'
import 'bootstrap/js/dist/dropdown'

export default {
  inject: ['emitter'],
  mixins: [addFavorite],
  data() {
    return {
      placeholder: false,
      placeholderPage: 'details',
      productID: '',
      displayUrl: '',
      product: {},
      categoryMap: {
        茶葉: 'tea',
        茶具: 'tool',
        茶點: 'desset',
        包裝: 'package'
      },
      qty: 1,
      adding: false,
      breadcrumb: [
        {
          path: '/',
          page: '首頁'
        },
        {
          path: '/product/all',
          page: '所有商品'
        }
      ],
      relatedProduct: [],
      tab: 'content'
    }
  },
  components: {
    IndexProductSelect,
    PlaceholderComponent
  },
  watch: {
    productID(n, o) {
      if (o !== '') {
        this.getDetail(n)
        this.tab = 'content'
      }
    }
  },
  methods: {
    getDetail(id) {
      this.placeholder = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http.get(url).then((res) => {
        if (!res.data.success) {
          alert(res.data.message)
          this.$router.back()
        }
        this.placeholder = false
        this.product = res.data.product
      }).then(() => {
        this.createCarousel()
        this.createBreadCrumb(this.product)
        this.getRelated(this.product.category)
      })
    },
    getRelated(relate) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((res) => {
        if (!res.data.success) {
          alert(res.data.message)
          this.$router.back()
        }
        this.relatedProduct = res.data.products.filter(
          (i) => i.category === relate && i.id !== this.product.id
        )
      })
    },
    createCarousel() {
      if (!this.product.imagesUrl) return
      const items = document.querySelectorAll('.carousel .carousel-item')
      items.forEach((el) => {
        el.addEventListener('click', (e) =>
          this.displayImg(e.target.getAttribute('src'))
        )
        const minPerSlide = 4
        let next = el.nextElementSibling
        for (let i = 1; i < minPerSlide; i++) {
          if (!next) {
            // wrap carousel by using first child
            next = items[0]
          }
          const cloneChild = next.cloneNode(true)
          el.appendChild(cloneChild.children[0])
          next = next.nextElementSibling
        }
      })
    },
    createBreadCrumb(product) {
      this.breadcrumb = [
        {
          path: '/',
          page: '首頁'
        },
        {
          path: '/product/all',
          page: '所有商品'
        }
      ]
      if (product.price < product.origin_price) {
        const crumb = {
          path: '/product/sales',
          page: '特價優惠'
        }
        this.breadcrumb.push(crumb)
      }
      const crumb = [
        {
          path: `/product/${this.categoryMap[product.category]}`,
          page: product.category
        },
        {
          path: '',
          page: product.title
        }
      ]
      this.breadcrumb.push(...crumb)
    },
    displayImg(url) {
      this.displayUrl = url
      setTimeout(() => (this.displayUrl = ''), 5000)
    },
    addToCart(productID, qty) {
      this.adding = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        data: {
          product_id: productID,
          qty
        }
      }
      this.$http.post(url, data).then((res) => {
        if (!res.data.success) {
          const toastMsg = {
            state: res.data.success,
            action: '購物車',
            msg: res.data.message
          }
          this.emitter.emit('indexToastMsg', toastMsg)
          this.adding = false
          return
        }
        const toastMsg = {
          state: res.data.success,
          action: '購物車',
          msg: res.data.message
        }
        this.emitter.emit('indexToastMsg', toastMsg)
        this.emitter.emit('cart')
        this.adding = false
      })
    }
  },
  created() {
    this.productID = this.$route.params.id
    this.getDetail(this.productID)
  },
  updated() {
    this.productID = this.$route.params.id
  }
}
</script>
