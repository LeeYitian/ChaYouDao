<template>
  <nav
    class="navbar navbar-dark bg-primary flex-column justify-content-center px-1 index-nav hide-nav"
    @click="toggleCollapse"
  >
    <div class="navbar-nav flex-column align-items-start h-100">
      <router-link to="/" class="nav-link link-lightbrown brand mb-3">
        <span class="material-symbols-outlined mb-2">
          temp_preferences_eco </span
        >茶友道
      </router-link>
      <router-link to="/" class="nav-link">
        <i class="ms-2 bi bi-house-door-fill"></i
        ><span class="collapse collapse-horizontal mx-3">首頁</span>
      </router-link>
      <router-link
        to="/product/all"
        class="nav-link"
        data-select="all"
        @click="select"
      >
        <i class="ms-2 bi bi-three-dots"></i
        ><span class="collapse collapse-horizontal mx-3">商品列表</span>
      </router-link>
      <router-link
        to="/product/sales"
        class="nav-link"
        data-select="sales"
        @click="select"
      >
        <i class="ms-2 bi bi-tag-fill"></i>
        <span class="collapse collapse-horizontal mx-3">特價優惠</span>
      </router-link>
      <router-link to="/article/-NDXL9zUAlCX2S0fuInX" class="nav-link">
        <i class="ms-2 bi bi-newspaper"></i>
        <span class="collapse collapse-horizontal mx-3">茶知識</span>
      </router-link>
      <router-link to="/favorite" class="nav-link">
        <i class="ms-2 bi bi-heart-fill"></i
        ><span class="collapse collapse-horizontal mx-3">我的最愛</span>
      </router-link>
      <a
        class="nav-link mt-auto"
        :class="{ disabled: carts.length === 0 }"
        role="button"
        @click="toggleOffcanvas"
      >
        <i class="ms-2 bi bi-cart-fill position-relative"
          ><span
            class="badge text-bg-danger position-absolute top-100 start-100 translate-middle rounded-pill fst-normal"
            style="font-size: 10px"
            >{{ carts.length }}</span
          ></i
        ><span class="collapse collapse-horizontal mx-3">購物車</span>
      </a>
    </div>
  </nav>
  <div
    class="offcanvas offcanvas-end bg-altowhite offCanvasNav"
    tabindex="-1"
    id="indexNavbarOffcanvas"
  >
    <div class="offcanvas-header">
      <button type="button" class="btn-close ms-auto" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body d-flex flex-column">
      <ul class="list-group list-group-flush">
        <li
          v-for="i in carts"
          :key="i.id"
          class="list-group-item d-flex align-items-center bg-altowhite text-primary"
          :class="{ 'text-muted': updating }"
        >
          <i
            class="me-4 bi bi-x-lg text-danger delete-cart"
            :class="{ 'text-muted': updating }"
            @click="deleteCart(i.id)"
          ></i>
          <div class="flex-grow-1" :class="{ 'text-muted': updating }">
            <h6>{{ i.product.title }}</h6>
            <div
              class="d-flex justify-content-between text-darkbrown"
              :class="{ 'text-muted': updating }"
            >
              <span>
                <input
                  v-model="i.qty"
                  type="number"
                  min="0"
                  class="form-control form-control-sm d-inline w-25"
                  :disabled="updating"
                  @change="updateCart(i.id, i.qty)"
                />
                /{{ i.product.unit }}
              </span>
              <span class="flex-shrink-0"
                >$ {{ $filters.currency(i.final_total) }}</span
              >
            </div>
          </div>
        </li>
      </ul>
      <div
        class="mt-3 border-top border-3 border-primary p-2 text-end"
        :class="{ 'text-muted': updating }"
      >
        小計：{{ $filters.currency(final_total) }} 元
      </div>
      <div class="d-flex justify-content-between mt-auto">
        <button
          type="button"
          class="btn btn-outline-danger"
          :class="{ disabled: updating }"
          @click="deleteAllCart"
        >
          清空購物車
        </button>
        <router-link
          to="/order"
          class="btn btn-primary"
          :class="{ disabled: updating }"
          >建立訂單</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse'
import Offcanvas from 'bootstrap/js/dist/offcanvas'

export default {
  inject: ['emitter'],
  data() {
    return {
      collapse: [],
      offcanvas: {},
      carts: [],
      final_total: 0,
      updating: false
    }
  },
  methods: {
    createCollapse() {
      const collapseEl = document.querySelectorAll('.collapse')
      const collapseList = [...collapseEl].map(
        (el) =>
          new Collapse(el, {
            toggle: false
          })
      )
      this.collapse = collapseList
    },
    toggleCollapse() {
      this.collapse.forEach((i) => i.toggle())
      setTimeout(() => this.hideCollapse(), 1000)
    },
    hideCollapse() {
      this.collapse.forEach((i) => i.hide())
    },
    createOffcanvas() {
      const offcanvas = new Offcanvas(
        document.querySelector('#indexNavbarOffcanvas')
      )
      this.offcanvas = offcanvas
    },
    toggleOffcanvas() {
      this.offcanvas.toggle()
    },
    select(e) {
      this.emitter.emit('select', e.currentTarget.dataset.select)
    },
    getCart() {
      this.updating = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((res) => {
        if (!res.data.success) {
          alert(res.data.message)
          return
        }
        this.carts = res.data.data.carts
        this.final_total = res.data.data.final_total
        this.updating = false
      })
    },
    deleteCart(id) {
      this.updating = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(url).then((res) => {
        if (!res.data.success) {
          const toastMsg = {
            state: res.data.success,
            action: '購物車',
            msg: res.data.message
          }
          this.emitter.emit('indexToastMsg', toastMsg)
          this.updating = false
          return
        }
        const toastMsg = {
          state: res.data.success,
          action: '購物車',
          msg: res.data.message
        }
        this.emitter.emit('indexToastMsg', toastMsg)
        this.getCart()
      })
    },
    deleteAllCart() {
      this.updating = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(url).then((res) => {
        if (!res.data.success) {
          const toastMsg = {
            state: res.data.success,
            action: '購物車',
            msg: res.data.message
          }
          this.emitter.emit('indexToastMsg', toastMsg)
          this.updating = false
          return
        }
        const toastMsg = {
          state: res.data.success,
          action: '購物車',
          msg: res.data.message
        }
        this.emitter.emit('indexToastMsg', toastMsg)
        this.offcanvas.hide()
        this.getCart()
      })
    },
    updateCart(id, qty) {
      this.updating = true
      if (qty < 0) {
        alert('數量不得為負數')
        this.updating = false
        return
      }
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      const data = {
        data: {
          product_id: id,
          qty
        }
      }
      this.$http.put(url, data).then((res) => {
        if (!res.data.success) {
          const toastMsg = {
            state: res.data.success,
            action: '購物車',
            msg: res.data.message
          }
          this.emitter.emit('indexToastMsg', toastMsg)
          this.updating = false
          return
        }
        const toastMsg = {
          state: res.data.success,
          action: '購物車',
          msg: res.data.message
        }
        this.emitter.emit('indexToastMsg', toastMsg)
        this.getCart()
      })
    }
  },
  mounted() {
    this.createCollapse()
    this.createOffcanvas()
    this.getCart()
    this.emitter.on('click', () => this.hideCollapse())
    this.emitter.on('cart', () => this.getCart())
  },
  beforeUnmount() {
    this.offcanvas.hide()
  }
}
</script>
