<template>
  <div
    class="modal fade updateCoupon"
    id="UpdateCouponModal"
    tabindex="-1"
    ref="myModal"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content border-0">
        <div class="modal-header bg-darkgreen text-white">
          <h5 class="modal-title">
            <span>新增／修改優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="mb-3">
              <label class="form-label" for="couponTitle">優惠券名稱</label>
              <input
                v-model="coupon.title"
                class="form-control form-control-sm"
                type="text"
                id="couponTitle"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="couponCode">代碼</label>
              <input
                v-model="coupon.code"
                class="form-control form-control-sm"
                type="text"
                id="couponCode"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="couponPercent">折數</label>
              <div class="input-group input-group-sm">
                <input
                  v-model="coupon.percent"
                  class="form-control"
                  type="number"
                  min="0"
                  max="100"
                  id="couponPercent"
                />
                <span class="input-group-text">%</span>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label" for="couponDate">到期日</label>
              <input
                v-model="coupon.due_date"
                class="form-control form-control-sm"
                type="date"
                id="couponDate"
              />
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  v-model="coupon.is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-darkgreen" @click="emit">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  mixins: [modalMixin],
  props: ['tempInfo'],
  data() {
    return {
      coupon: {}
    }
  },
  watch: {
    tempInfo(n, o) {
      this.coupon = { ...n }
      if (this.coupon.due_date) {
        const date = new Date(this.coupon.due_date * 1000)
        const year = date.getFullYear()
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const day = ('0' + date.getDate()).slice(-2)
        this.coupon.due_date = `${year}-${month}-${day}`
      }
    }
  },
  methods: {
    emit() {
      const today = Math.floor(Date.now() / 1000)
      const timeStamp = Math.floor(new Date(this.coupon.due_date) / 1000)
      if (today > timeStamp) {
        alert('截止日期不得早於今日')
        return
      }
      if (this.coupon.percent < 0) {
        alert('折數不得為負數')
        return
      }
      this.coupon.due_date = timeStamp
      const updateCoupon = {
        ...this.coupon
      }
      this.$emit('updateCoupon', updateCoupon)
      this.hideModal()
    }
  }
}
</script>
