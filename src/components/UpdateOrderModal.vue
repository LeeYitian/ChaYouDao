<template>
  <div
    class="modal fade modal-xl"
    id="UpdateOrderModal"
    tabindex="-1"
    ref="myModal"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            <span>修改訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="this.hideModal()"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-5">
              <h5>訂單資訊</h5>
              <div class="mb-3">
                <label class="form-label" for="orderDate">訂單成立日期</label>
                <input
                  v-model="create_at"
                  class="form-control"
                  id="orderDate"
                  type="date"
                  readonly
                />
              </div>
              <div class="mb-3">
                <label class="form-label" for="orderContent">訂單內容</label>
                <div v-for="i in products" :key="i.id" class="input-group">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="remove(i.id)"
                  >
                    刪除
                  </button>
                  <div class="input-group-text flex-column">
                    <span>{{ i.product.title }}</span>
                    <small v-if="i.coupon">coupon：{{ i.coupon.code }}</small>
                  </div>
                  <input
                    v-model="i.qty"
                    class="form-control"
                    type="number"
                    min="0"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label" for="orderTotal">總金額</label>
                <input
                  v-model="order.total"
                  class="form-control"
                  id="orderTotal"
                  min="0"
                  type="number"
                  readonly
                />
              </div>
              <div class="mb-3">
                <label class="form-label" for="orderDescription">附註</label>
                <textarea
                  v-model="order.message"
                  class="form-control"
                  id="orderDescription"
                ></textarea>
              </div>
            </div>
            <div class="col-lg-7">
              <h5>客戶資訊</h5>
              <div class="row">
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label" for="orderName">姓名</label>
                    <input
                      v-model="user.name"
                      class="form-control"
                      type="text"
                      id="orderName"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="orderEmail">信箱</label>
                    <input
                      v-model="user.email"
                      class="form-control"
                      type="email"
                      id="orderEmail"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="orderPaidDate"
                      >付款日期</label
                    >
                    <input
                      v-model="paid_date"
                      class="form-control"
                      type="date"
                      id="orderPaidDate"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label class="form-label" for="orderTel">電話</label>
                    <input
                      v-model="user.tel"
                      class="form-control"
                      type="tel"
                      id="orderTel"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="orderAddress">地址</label>
                    <input
                      v-model="user.address"
                      class="form-control"
                      type="text"
                      id="orderAddress"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    v-model="order.is_paid"
                    class="form-check-input"
                    type="checkbox"
                    id="is_paid"
                    @change="paymentStatus"
                  />
                  <label class="form-check-label" for="is_paid">
                    付款／未付款
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="this.hideModal()"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="emit">
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
      create_at: '',
      products: {},
      user: {},
      paid_date: '',
      order: {}
    }
  },
  watch: {
    tempInfo(n, o) {
      this.changeDate(n.create_at, 'create_at')
      this.changeDate(n.paid_date, 'paid_date')
      this.products = { ...n.products }
      this.user = { ...n.user }
      this.order = { ...n }
    },
    products: {
      handler(n, o) {
        if (Object.keys(o).length === 0) {
          return
        }
        this.order.total = 0
        for (const i in n) {
          if (n[i].qty < 0) {
            alert('數量不得為負數')
            return
          }
          n[i].total = n[i].product.price * n[i].qty
          if (n[i].coupon) {
            n[i].final_total = Math.round(
              n[i].total * (n[i].coupon.percent * 0.01)
            )
          } else {
            n[i].final_total = n[i].total
          }
          this.order.total += n[i].final_total
        }
      },
      deep: true
    }
  },
  methods: {
    changeDate(date, dataKey) {
      if (!date) {
        this[dataKey] = ''
        return
      }
      const tempDate = new Date(date * 1000)
      const year = tempDate.getFullYear()
      const month = ('0' + (tempDate.getMonth() + 1)).slice(-2)
      const day = ('0' + tempDate.getDate()).slice(-2)
      this[dataKey] = `${year}-${month}-${day}`
    },
    paymentStatus() {
      if (!this.order.is_paid) {
        this.paid_date = ''
      } else {
        this.order.paid_date
          ? this.changeDate(this.order.paid_date, 'paid_date')
          : this.changeDate(Date.now() / 1000, 'paid_date')
      }
    },
    remove(id) {
      delete this.products[id]
      if (Object.keys(this.products).length === 0) {
        this.order.total = 0
      }
    },
    emit() {
      const newPaidDate = new Date(this.paid_date) / 1000
      const updateOrder = {
        ...this.order,
        paid_date: newPaidDate,
        products: { ...this.products },
        user: { ...this.user }
      }
      this.$emit('updateOrder', updateOrder)
      this.hideModal()
    }
  }
}
</script>
