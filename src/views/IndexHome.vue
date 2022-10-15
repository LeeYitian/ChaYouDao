<template>
  <IndexNavbar></IndexNavbar>
  <IndexNotificationToast></IndexNotificationToast>
  <IndexCouponCounter class="index-coupon-counter hide-index-coupon-counter"></IndexCouponCounter>
  <router-view class="index-view hide-nav-view" @click="backdrop"></router-view>
  <div
    class="position-fixed bottom-0 end-0 m-2 text-center rounded go-top"
    @click="scrollTop"
  >
    <i class="bi bi-chevron-compact-up"></i>
    <div>TOP</div>
  </div>
  <IndexFooter class="index-footer hide-footer"></IndexFooter>
</template>

<style>
@media (max-width: 576px) {
  .hide-nav {
    transform: translateX(-45px);
  }
  .hide-nav-view {
    margin-left: 0px;
  }
  .hide-footer {
    margin-left: 0px;
  }
  .hide-index-coupon-counter {
    margin-left: 0px;
  }
}
</style>

<script>
import IndexNavbar from '@/components/IndexNavbar.vue'
import IndexFooter from '@/components/IndexFooter.vue'
import IndexNotificationToast from '@/components/IndexNotificationToast.vue'
import IndexCouponCounter from '@/components/IndexCouponCounter.vue'
import emitter from '@/methods/mitt.js'

export default {
  data() {
    return {
      preScroll: 0
    }
  },
  provide() {
    return {
      emitter
    }
  },
  emit: ['click'],
  components: {
    IndexNavbar,
    IndexFooter,
    IndexNotificationToast,
    IndexCouponCounter
  },
  methods: {
    backdrop() {
      emitter.emit('click')
    },
    hideNavbar() {
      const scroll =
        document.body.scrollTop || document.documentElement.scrollTop
      if (scroll < this.preScroll) {
        document.querySelector('.index-nav').classList.remove('hide-nav')
        document.querySelector('.index-view').classList.remove('hide-nav-view')
        document.querySelector('.index-footer').classList.remove('hide-footer')
        document.querySelector('.index-coupon-counter').classList.remove('hide-index-coupon-counter')
      } else {
        document.querySelector('.index-nav').classList.add('hide-nav')
        document.querySelector('.index-view').classList.add('hide-nav-view')
        document.querySelector('.index-footer').classList.add('hide-footer')
        document.querySelector('.index-coupon-counter').classList.add('hide-index-coupon-counter')
      }
      this.preScroll = scroll <= 0 ? 0 : scroll
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.hideNavbar)
  },
  unmounted() {
    window.removeEventListener('scroll', this.hideNavbar)
  }
}
</script>
