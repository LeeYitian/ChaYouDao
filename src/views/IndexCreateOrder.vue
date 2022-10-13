<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <table class="table table-striped text-primary order-table">
          <caption
            class="caption-top fs-3 text-primary fw-semibold position-relative"
          >
            購物車
            <button
              type="button"
              class="btn btn-sm btn-danger position-absolute end-0 top-50 translate-middle-y"
              @click="deleteAllCart"
              :disabled="updating"
            >
              清空購物車
            </button>
          </caption>
          <thead class="bg-lightbrown">
            <tr>
              <th scope="col" width="250" class="text-center">商品</th>
              <th scope="col" width="150" class="text-center">數量</th>
              <th scope="col" width="90" class="text-end">金額</th>
            </tr>
          </thead>
          <tbody class="bg-white text-primary table-group-divider">
            <PlaceholderComponent
              v-if="updating"
              :page="placeholderPage"
            ></PlaceholderComponent>
            <tr v-for="i in carts" :key="i.product_id">
              <td
                v-if="!updating"
                class="d-flex justify-content-between align-items-center"
              >
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger me-2 me-sm-0 flex-shrink-0"
                  @click="deleteCart(i.id)"
                  :disabled="updating"
                >
                  刪除
                </button>
                <div class="text-end me-sm-2">{{ i.product.title }}</div>
                <img
                  :src="i.product.imageUrl"
                  class="img-fluid d-none d-sm-block"
                  alt="產品圖片"
                />
              </td>
              <td v-if="!updating" class="align-middle">
                <div class="input-group input-group-sm" role="group">
                  <button
                    type="button"
                    class="btn btn-lightbrown d-none d-sm-block"
                    @click="i.qty--, updateCart(i.id, i.qty)"
                    :disabled="updating"
                  >
                    －
                  </button>
                  <input
                    v-model="i.qty"
                    type="number"
                    class="form-control"
                    min="0"
                    @change="updateCart(i.id, i.qty)"
                    :disabled="updating"
                  />
                  <button
                    type="button"
                    class="btn btn-lightbrown d-none d-sm-block"
                    @click="i.qty++, updateCart(i.id, i.qty)"
                    :disabled="updating"
                  >
                    ＋
                  </button>
                </div>
              </td>
              <td v-if="!updating" class="text-end align-middle">
                <span
                  :class="{
                    'text-decoration-line-through': i.total !== i.final_total,
                    'text-muted': i.total !== i.final_total
                  }"
                  >$ {{ $filters.currency(i.total) }}</span
                ><br v-if="i.total !== i.final_total" /><span
                  v-if="i.total !== i.final_total"
                  >$ {{ $filters.currency(i.final_total) }}</span
                >
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                colspan="3"
                class="text-bg-darkbrown text-end position-relative"
              >
                總計：
                <span
                  :class="{
                    'text-decoration-line-through':
                      coupon.data || total !== final_total,
                    'text-lightbrown': coupon.data || total !== final_total
                  }"
                  >{{ $filters.currency(total) }}</span
                ><span
                  v-if="coupon.data || total !== final_total"
                  class="ms-2"
                  >{{ $filters.currency(final_total) }}</span
                >
                元
                <br /><small
                  v-if="coupon.data || total !== final_total"
                  class="text-danger fw-semibold position-absolute top-100 start-0 w-100"
                  >{{
                    coupon.message
                      ? `*${coupon.message}`
                      : `*已套用優惠券：${carts[0].coupon.code}`
                  }}</small
                >
              </td>
            </tr>
          </tfoot>
        </table>
        <span class="fs-5 text-primary">優惠券</span>
        <div class="row pb-3">
          <div class="col-5">
            <input
              v-model="couponCode"
              type="text"
              class="form-control"
              placeholder="優惠券代碼"
            />
          </div>
          <div class="col-4 col-sm-3 ms-auto">
            <button
              type="button"
              class="btn btn-primary w-100"
              :disabled="updating"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              data-bs-title="一張訂單只能搭配一張優惠券"
              @click="applyCoupon"
            >
              <div
                v-if="updating && couponCode !== ''"
                class="spinner-border spinner-border-sm text-secondary"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              使用
            </button>
          </div>
        </div>
        <span v-if="coupons">目前可用優惠券：{{ coupons }}</span>
      </div>
      <div class="col-lg-5 ms-auto">
        <h1 class="fs-3 text-primary fw-semibold pt-2">客戶資料</h1>
        <Form class="pb-3" @submit="createOrder" v-slot="{ errors, values }">
          <div class="row">
            <div class="col-12">
              <label for="userName" class="form-label">姓名</label>
              <Field
                v-model="user.name"
                type="text"
                id="userName"
                label="姓名"
                name="userName"
                class="form-control"
                :class="{
                  'is-invalid': errors['userName'],
                  'is-valid': values['userName'] && !errors['userName']
                }"
                rules="required"
                :disabled="orderCreating"
              />
              <ErrorMessage
                class="form-text invalid-feedback"
                name="userName"
              />
            </div>
            <div class="col-5">
              <label for="userPhone" class="form-label mt-3">手機</label>
              <Field
                v-model="user.tel"
                type="tel"
                id="userPhone"
                label="手機"
                name="userPhone"
                placeholder="09xx-xxx-xxx"
                class="form-control"
                :class="{
                  'is-invalid': errors['userPhone'],
                  'is-valid': values['userPhone'] && !errors['userPhone']
                }"
                :disabled="orderCreating"
                :rules="{
                  length: 12,
                  required: true,
                  regex: /[0-9]{4}-[0-9]{3}-[0-9]{3}/
                }"
              />
              <ErrorMessage
                class="form-text invalid-feedback"
                name="userPhone"
              />
            </div>
            <div class="col-7">
              <label for="userEmail" class="form-label mt-3">信箱</label>
              <Field
                v-model="user.email"
                type="email"
                id="userEmail"
                name="userEmail"
                label="信箱"
                class="form-control"
                :class="{
                  'is-invalid': errors['userEmail'],
                  'is-valid': values['userEmail'] && !errors['userEmail']
                }"
                :disabled="orderCreating"
                rules="email|required"
              />
              <ErrorMessage
                class="form-text invalid-feedback"
                name="userEmail"
              />
            </div>
            <div class="col-12">
              <label for="userAddress" class="form-label mt-3">收件地址</label>
              <Field
                v-model="user.address"
                type="text"
                id="userAddress"
                label="收件地址"
                name="userAddress"
                class="form-control"
                :class="{
                  'is-invalid': errors['userAddress'],
                  'is-valid': values['userAddress'] && !errors['userAddress']
                }"
                :disabled="orderCreating"
                rules="required"
              />
              <ErrorMessage
                class="form-text invalid-feedback"
                name="userAddress"
              />
            </div>
            <div class="col-12">
              <label for="userMessage" class="form-label mt-3">備註</label>
              <Field
                v-model="message"
                as="textarea"
                id="userMessage"
                name="userMessage"
                class="form-control"
              />
            </div>
            <div class="col-4 ms-auto">
              <button
                type="submit"
                class="btn btn-success mt-3 w-100"
                :disabled="orderCreating"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="購物車將清空"
              >
                送出
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import Tooltip from 'bootstrap/js/dist/tooltip.js'
import PlaceholderComponent from '@/components/PlaceholderComponent.vue'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, length, regex } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

export default {
  inject: ['emitter'],
  data() {
    return {
      placeholderPage: 'createOrder',
      updating: false,
      orderCreating: false,
      coupons: '',
      carts: [],
      total: 0,
      final_total: 0,
      couponCode: '',
      coupon: {},
      user: {
        name: '',
        email: '',
        tel: '',
        address: ''
      },
      message: ''
    }
  },
  components: {
    PlaceholderComponent,
    Field,
    Form,
    ErrorMessage
  },
  methods: {
    readCoupon() {
      this.coupons = sessionStorage.getItem('coupon')
    },
    getCart() {
      this.updating = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((res) => {
        if (res.data.data.carts.length === 0) {
          alert('購物車內無商品')
          this.$router.back()
        }
        this.carts = res.data.data.carts
        this.final_total = res.data.data.final_total
        this.total = res.data.data.total
        this.updating = false
      })
    },
    updateCart(id, qty) {
      if (qty < 0) {
        alert('數量不得為負數')
        return
      }
      this.updating = true
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
        this.getCart()
      })
    },
    applyCoupon() {
      this.updating = true
      if (this.couponCode === 'teaparty') {
        const tea = this.carts.findIndex((i) => i.product.category === '茶葉')
        const tool = this.carts.findIndex((i) => i.product.category === '茶具')
        const dessert = this.carts.findIndex(
          (i) => i.product.category === '茶點'
        )
        if (tea < 0 || tool < 0 || dessert < 0) {
          const toastMsg = {
            state: false,
            action: '優惠券',
            msg: '無法使用，未滿足優惠條件'
          }
          this.emitter.emit('indexToastMsg', toastMsg)
          this.updating = false
          return
        }
      }
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const data = { data: { code: this.couponCode } }
      this.$http.post(url, data).then((res) => {
        if (!res.data.success) {
          const toastMsg = {
            state: res.data.success,
            action: '優惠券',
            msg: res.data.message
          }
          this.emitter.emit('indexToastMsg', toastMsg)
          this.updating = false
          return
        }
        this.coupon = res.data
        const toastMsg = {
          state: res.data.success,
          action: '優惠券',
          msg: res.data.message
        }
        this.emitter.emit('indexToastMsg', toastMsg)
        this.getCart()
      })
    },
    createOrder() {
      this.orderCreating = true
      this.tooltipEl.forEach(i => i.hide())
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const data = {
        data: {
          user: { ...this.user },
          message: this.message
        }
      }
      this.$http.post(url, data).then((res) => {
        if (!res.data.success) {
          const toastMsg = {
            state: res.data.success,
            action: '訂單',
            msg: res.data.message
          }
          this.emitter.emit('indexToastMsg', toastMsg)
          this.updating = false
          return
        }
        const toastMsg = {
          state: res.data.success,
          action: '訂單',
          msg: res.data.message
        }
        this.emitter.emit('indexToastMsg', toastMsg)
        this.orderCreating = false
        this.$router.push('/order/list')
      })
    }
  },
  created() {
    this.getCart()
    this.readCoupon()
    defineRule('required', required)
    defineRule('email', email)
    defineRule('length', length)
    defineRule('regex', regex)
    configure({
      generateMessage: localize('zh_TW', zhTW),
      validateOnInput: true
    })
    setLocale('zh_TW')
  },
  mounted() {
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltiplist = [...tooltips].map((el) => new Tooltip(el))
    this.tooltipEl = tooltiplist
  },
  updated() {
    this.tooltipEl.forEach((i) => i.hide())
  },
  beforeUnmount() {
    this.tooltipEl.forEach((i) => i.hide())
  }
}
</script>
