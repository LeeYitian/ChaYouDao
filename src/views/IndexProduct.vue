<template>
  <div>
    <div class="indexProduct-bp">
      <h1 class="fw-semibold text-white text-end py-1 px-5 rounded-start">
        以茶‧會友
      </h1>
    </div>
    <main class="indexProduct-main pt-5">
      <div class="container">
        <div class="row pt-5">
          <nav class="col-md-2 d-block d-md-none">
            <div class="dropdown d-flex mb-4">
              <button
                class="btn btn-darkbrown ms-auto dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                商品選單
              </button>
              <ul class="dropdown-menu">
                <li>
                  <router-link
                    to="/product/all"
                    class="dropdown-item"
                    @click="selection = 'all'"
                    >所有商品</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/product/sales"
                    class="dropdown-item"
                    @click="selection = 'sales'"
                    >特價優惠</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/product/tea"
                    class="dropdown-item"
                    @click="selection = 'tea'"
                    >茶葉</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/product/tool"
                    class="dropdown-item"
                    @click="selection = 'tool'"
                    >茶具</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/product/dessert"
                    class="dropdown-item"
                    @click="selection = 'dessert'"
                    >茶點</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/product/package"
                    class="dropdown-item"
                    @click="selection = 'package'"
                    >包裝</router-link
                  >
                </li>
              </ul>
            </div>
          </nav>
          <section class="col-md-10">
            <PlaceholderComponent
              v-if="placeholder"
              :page="placeholderPage"
            ></PlaceholderComponent>
            <div class="row">
              <router-view
                :select-products="selectProducts"
              ></router-view>
            </div>
          </section>
          <nav class="col-md-2 d-none d-sm-none d-md-block">
            <ul class="list-group indexProduct-sublist">
              <li class="rounded">
                <router-link
                  to="/product/all"
                  class="list-group-item list-group-item-action border-0 list-group-item-darkbrown"
                  @click="selection = 'all'"
                  >所有商品</router-link
                >
              </li>
              <li class="rounded">
                <router-link
                  to="/product/sales"
                  class="list-group-item list-group-item-action border-0 list-group-item-darkbrown"
                  @click="selection = 'sales'"
                  >特價優惠</router-link
                >
              </li>
              <li class="rounded">
                <router-link
                  to="/product/tea"
                  class="list-group-item list-group-item-action border-0 list-group-item-darkbrown"
                  @click="selection = 'tea'"
                  >茶葉</router-link
                >
              </li>
              <li class="rounded">
                <router-link
                  to="/product/tool"
                  class="list-group-item list-group-item-action border-0 list-group-item-darkbrown"
                  @click="selection = 'tool'"
                  >茶具</router-link
                >
              </li>
              <li class="rounded">
                <router-link
                  to="/product/dessert"
                  class="list-group-item list-group-item-action border-0 list-group-item-darkbrown"
                  @click="selection = 'dessert'"
                  >茶點</router-link
                >
              </li>
              <li class="rounded">
                <router-link
                  to="/product/package"
                  class="list-group-item list-group-item-action border-0 list-group-item-darkbrown"
                  @click="selection = 'package'"
                  >包裝</router-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import 'bootstrap/js/dist/dropdown.js'
import PlaceholderComponent from '@/components/PlaceholderComponent.vue'

export default {
  inject: ['emitter'],
  data() {
    return {
      placeholder: false,
      placeholderPage: 'product',
      products: [],
      selectProducts: [],
      selection: ''
    }
  },
  components: {
    PlaceholderComponent
  },
  watch: {
    selection() {
      this.select()
    }
  },
  methods: {
    getProduct() {
      this.placeholder = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((res) => {
        if (!res.data.success) {
          alert(res.data.message)
          this.$router.back()
        }
        this.placeholder = false
        this.products = res.data.products
        this.select()
      })
    },
    select() {
      switch (this.selection) {
        case 'all':
          this.selectProducts = [...this.products]
          break
        case 'sales':
          this.selectProducts = this.products.filter((i) => {
            return i.price < i.origin_price
          })
          break
        case 'tea':
          this.selectProducts = this.products.filter((i) => {
            return i.category === '茶葉'
          })
          break
        case 'tool':
          this.selectProducts = this.products.filter((i) => {
            return i.category === '茶具'
          })
          break
        case 'dessert':
          this.selectProducts = this.products.filter((i) => {
            return i.category === '茶點'
          })
          break
        case 'package':
          this.selectProducts = this.products.filter((i) => {
            return i.category === '包裝'
          })
          break
      }
    }
  },
  created() {
    this.getProduct()
  },
  mounted() {
    this.emitter.on('select', (selection) => {
      this.selection = selection
    })
    // 第一次進入'/product/...'
    const path = this.$route.fullPath.split('/')
    this.selection = path[path.length - 1]
  }
}
</script>
