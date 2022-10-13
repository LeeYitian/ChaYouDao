<template>
  <div
    v-for="i in selectProducts"
    :key="i.id"
    class="col-lg-4 col-md-6 mb-5 indexProduct-items"
    :class="{ 'indexProduct-items-sales': i.price < i.origin_price }"
  >
    <div class="card bg-transparent border-0">
      <i
        class="bi"
        :class="{
          'bi-heart': !favorites.includes(i.id),
          'bi-heart-fill': favorites.includes(i.id)
        }"
        @click="favorite(i.id, $event)"
      ></i>
      <img :src="i.imageUrl" class="card-img-top rounded" alt="" />
      <div class="card-body d-flex flex-column">
        <h2 class="card-title h5 text-darkgreen">{{ i.title }}</h2>
        <p class="card-text fw-light related-none">
          {{ text(i.description) }}
        </p>
        <div class="d-flex justify-content-between mt-1">
          <div
            v-if="i.price < i.origin_price"
            class="position-relative related-none"
          >
            <span
              class="badge rounded-pill text-bg-lightbrown position-absolute bottom-50 start-0 translate-middle-y text-decoration-line-through"
              >原價$ {{ $filters.currency(i.origin_price) }}</span
            >
            <span class="text-danger fs-5"
              >$ {{ $filters.currency(i.price) }}</span
            >
          </div>
          <span v-else class="fs-5 text-lightgreen related-none"
            >$ {{ $filters.currency(i.origin_price) }}</span
          >
          <router-link
            :to="`/details/${i.id}`"
            class="card-link link-darkgreen stretched-link"
            >詳細介紹</router-link
          >
        </div>
      </div>
    </div>
    <button
      class="btn btn-darkbrown w-100 related-none"
      :class="{ disabled: adding && addID === i.id }"
      @click="addToCart(i.id)"
    >
      <div
        v-if="adding && addID === i.id"
        class="spinner-border spinner-border-sm text-secondary"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
      加入購物車
    </button>
  </div>
</template>

<style>
.indexProduct-items-sales .card {
  position: relative;
}
.indexProduct-items-sales .card::before {
  position: absolute;
  content: '';
  display: block;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    135deg,
    transparent 20%,
    #dc3545 20%,
    #dc3545 50%,
    transparent 50%
  );
  width: 100px;
  height: 100px;
}
.indexProduct-items-sales .card::after {
  position: absolute;
  content: 'SALE';
  top: 15px;
  left: 0px;
  color: white;
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 2px;
  transform: rotate(-45deg);
}
</style>

<script>
import addFavorite from '@/mixins/addFavorite.js'

export default {
  inject: ['emitter'],
  props: ['selectProducts'],
  mixins: [addFavorite],
  data() {
    return {
      adding: false,
      addID: ''
    }
  },
  methods: {
    text(text) {
      if (text.length > 32) {
        const str = text.split('')
        const subText = str.slice(0, 32)
        subText.push('……')
        return subText.join('')
      } else {
        return text
      }
    },
    addToCart(productID, qty = 1) {
      this.adding = true
      this.addID = productID
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
          action: '加入購物車',
          msg: res.data.message
        }
        this.emitter.emit('indexToastMsg', toastMsg)
        this.emitter.emit('cart')
        this.adding = false
      })
    }
  }
}
</script>
