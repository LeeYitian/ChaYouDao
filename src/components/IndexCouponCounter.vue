<template>
  <div
    class="d-flex align-items-center p-2 bg-warning position-fixed start-0 end-0"
    ref="coupounCounter"
  >
    <div class="d-flex flex-column flex-sm-row flex-grow-1 me-2">
      <div class="text-white fs-4 fw-bold d-inline-block">
        <span class="d-none d-sm-inline">永遠的周日慶──</span
        ><span v-if="counter !== '已結束'">優惠倒數 </span
        ><span>{{ counter }}</span>
      </div>
      <button
        v-if="counter === '已結束'"
        type="button"
        class="btn btn-sm btn-light ms-2"
        @click="restartCountDown"
      >
        重新倒數
      </button>
      <button
        type="button"
        class="btn btn-outline-light ms-sm-auto"
        :class="{ disabled: counter === '已結束' }"
        @click="getCoupon"
      >
        領取七折優惠券
      </button>
    </div>
    <button
      type="button"
      class="btn-close ms-auto"
      @click="this.$refs.coupounCounter.style.visibility = 'hidden'"
    ></button>
  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  data() {
    return {
      counter: ''
    }
  },
  methods: {
    countDown() {
      if (sessionStorage.expired) {
        if (Date.now() > new Date(sessionStorage.expired).getTime()) {
          this.counter = '已結束'
          this.$refs.coupounCounter.style.visibility = 'hidden'
          return
        }
      } else {
        const expired = new Date(Date.now() + 2 * 60 * 1000)
        sessionStorage.setItem('expired', expired)
      }
      setInterval(() => {
        const distance = new Date(sessionStorage.expired).getTime() - Date.now()
        if (distance <= 0) {
          this.counter = '已結束'
          return
        }
        const count = new Date(distance)
        this.counter = `${('0' + count.getMinutes()).slice(-2)} : ${(
          '0' + count.getSeconds()
        ).slice(-2)}`
      }, 1000)
    },
    restartCountDown() {
      sessionStorage.removeItem('expired')
      this.countDown()
    },
    getCoupon() {
      if (sessionStorage.getItem('coupon')) {
        if (sessionStorage.getItem('coupon').includes('happyday')) {
          const toastMsg = {
            state: false,
            action: '優惠券',
            msg: '已經領過了喔'
          }
          this.emitter.emit('indexToastMsg', toastMsg)
          return
        }
        const str = sessionStorage.getItem('coupon') + ', ' + 'happyday'
        sessionStorage.setItem('coupon', str)
      } else {
        sessionStorage.setItem('coupon', 'happyday')
      }
      const toastMsg = {
        state: true,
        action: '優惠券',
        msg: '恭喜你獲得優惠券「happyday」'
      }
      this.emitter.emit('indexToastMsg', toastMsg)
    }
  },
  mounted() {
    this.countDown()
  }
}
</script>
