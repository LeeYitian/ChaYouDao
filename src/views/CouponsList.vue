<template>
  <div class="container">
    <button
      class="btn btn-darkgreen mt-2 btn-sm d-block ms-auto"
      type="button"
      @click="adjustCoupon({}, $event)"
    >
      新增優惠券
    </button>
    <div class="table-responsive-lg">
      <table class="table table-hover text-primary mt-2 dashboard-table">
        <thead class="border-bottom border-light border-2 text-bg-darkgreen">
          <tr>
            <th width="120" class="text-center">名稱</th>
            <th width="120" class="text-center">優惠</th>
            <th width="120" class="text-center">到期日</th>
            <th width="120" class="text-center">啟用</th>
            <th width="120" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in coupons" :key="i.id" class="align-middle">
            <td>{{ i.title }}</td>
            <td class="text-end">{{ `${i.percent} %` }}</td>
            <td>{{ $filters.date(i.due_date) }}</td>
            <td>
              <span v-if="i.is_enabled" class="text-success">啟用</span>
              <span v-else class="text-muted">未啟用</span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="adjustCoupon(i, $event)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteCoupon(i)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <PaginationBar v-bind="pagination"></PaginationBar>
  <UpdateCouponModal
    :temp-info="tempCoupon"
    @update-coupon="update"
    ref="updateCoupon"
  ></UpdateCouponModal>
  <DeleteModal
    :temp-info="tempCoupon"
    @delete-info="erase"
    ref="deleteCoupon"
  ></DeleteModal>
</template>

<script>
import UpdateCouponModal from '@/components/UpdateCouponModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'

export default {
  inject: ['emitter'],
  emits: ['loading'],
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: false
    }
  },
  components: {
    UpdateCouponModal,
    DeleteModal
  },
  methods: {
    getCoupon(page = 1) {
      this.$emit('loading', true)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http.get(url).then((res) => {
        this.$emit('loading', false)
        const { coupons, pagination } = res.data
        this.coupons = coupons
        this.pagination = pagination
        const toastMsg = {
          ...res.data,
          event: '取得優惠券列表'
        }
        this.emitter.emit('toastMsg', toastMsg)
      }).catch(e => console.log(e))
    },
    adjustCoupon(info, e) {
      e.currentTarget.textContent.trim() === '編輯'
        ? (this.isNew = false)
        : (this.isNew = true)
      this.tempCoupon = info
      this.$refs.updateCoupon.showModal()
    },
    deleteCoupon(info) {
      this.tempCoupon = info
      this.$refs.deleteCoupon.showModal()
    },
    update(updateCoupon) {
      this.$emit('loading', true)
      let url = ''
      let method = ''
      let data = {}
      switch (this.isNew) {
        case true:
          url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
          method = 'post'
          data = { data: { ...updateCoupon } }
          break
        case false:
          url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${updateCoupon.id}`
          method = 'put'
          data = { data: { ...updateCoupon } }
          break
      }
      this.$http({
        url,
        method,
        data
      }).then((res) => {
        const toastMsg = {
          ...res.data,
          event: '新增／更新優惠券'
        }
        this.emitter.emit('toastMsg', toastMsg)
        this.getCoupon()
      }).catch(e => console.log(e))
    },
    erase(deleteCoupon) {
      this.$emit('loading', true)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${deleteCoupon.id}`
      this.$http.delete(url).then((res) => {
        const toastMsg = {
          ...res.data,
          event: '刪除優惠券'
        }
        this.emitter.emit('toastMsg', toastMsg)
        this.getCoupon()
      }).catch(e => console.log(e))
    }
  },
  created() {
    this.getCoupon()
  }
}
</script>
