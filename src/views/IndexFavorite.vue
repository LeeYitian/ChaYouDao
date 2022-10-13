<template>
  <div>
    <div class="favorite-bp">
      <h1 class="fw-semibold text-white py-1 px-3 text-nowrap rounded">等待‧相見</h1>
    </div>
    <main class="pt-5 favorite-main">
      <div class="container">
        <div v-if="!getting && favoriteProducts.length > 0" class="row">
          <div
            v-for="i in favoriteProducts"
            :key="i.id"
            class="col-md-6 col-lg-4 mb-2"
          >
            <div class="position-relative favorite-items">
              <div class="position-absolute front">
                <img
                  :src="i.imageUrl"
                  class="img-fluid rounded"
                  alt="商品圖片"
                />
                <h5 class="text-white fw-semibold">{{ i.title }}</h5>
              </div>
              <div class="position-absolute p-3 bg-altowhite text-center back">
                <p class="text-primary">{{ text(i.description) }}</p>
                <router-link :to="`details/${i.id}`" class="stretched-link">詳細內容</router-link>
              </div>
            </div>
          </div>
        </div>
        <div v-if="getting" class="row">
          <div class="col-sm-8 col-lg-6 mx-auto text-center">
            <h5 class="text-muted">等等喔，讓我們把你最愛的商品整理一下</h5>
          </div>
        </div>
        <div v-if="!getting && favoriteProducts.length === 0" class="row">
          <div class="col-sm-8 col-lg-6 mx-auto text-center">
            <h5 class="text-primary">還沒有你喜歡的商品呢……</h5>
            <router-link to="/">去逛逛吧</router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      getting: false
    }
  },
  computed: {
    favoriteProducts() {
      if (localStorage.getItem('chaFavorite')) {
        const arr = localStorage.getItem('chaFavorite').split(',')
        const favorite = this.products.filter((i) => arr.includes(i.id))
        return favorite
      } else {
        return []
      }
    }
  },
  methods: {
    getProduct() {
      this.getting = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((res) => {
        if (!res.data.success) {
          alert(res.data.message)
          this.$router.back()
        }
        this.products = res.data.products
        this.getting = false
      })
    },
    text(text) {
      const arr = text.split('')
      const str = arr.slice(0, 35)
      str.push('……')
      return str.join('')
    }
  },
  created() {
    this.getProduct()
  },
  mounted() {
    const viewHeader = document.querySelector('.favorite-bp').offsetHeight
    const footer = document.querySelector('.index-footer').offsetHeight
    const favoriteMain = document.querySelector('.favorite-main')
    favoriteMain.style.minHeight = `${window.innerHeight - viewHeader - footer + 50}px`
  }
}
</script>
