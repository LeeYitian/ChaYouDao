<template>
  <div class="container">
    <div class="table-responsive-lg">
      <table class="table table-hover text-primary mt-2 dashboard-table">
        <thead class="border-bottom border-primary border-2 bg-lightbrown">
          <tr>
            <th width="100" class="text-center">建立時間</th>
            <th width="200" class="text-center">訂單內容</th>
            <th width="120" class="text-center">附註</th>
            <th width="100" class="text-center">總額</th>
            <th width="100" class="text-center">付款</th>
            <th width="120" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in orders" :key="i.id" class="align-middle">
            <td>{{ $filters.date(i.create_at) }}</td>
            <td>{{ orderContent(i.products) }}</td>
            <td>{{ i.message }}</td>
            <td class="text-end">{{ i.total }}</td>
            <td>
              <span v-if="i.is_paid" class="text-success">付款</span>
              <span v-else class="text-danger">未付款</span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="adjustOrder(i)"
                >
                  修改
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteOrder(i)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
      class="btn btn-danger mt-2 btn-sm d-block ms-auto"
      type="button"
      @click="deleteOrder({ title: '全部訂單' })"
    >
      刪除所有訂單
    </button>
  </div>
  <PaginationBar v-bind="pagination"></PaginationBar>
  <UpdateOrderModal
    :temp-info="tempOrder"
    @update-order="update"
    ref="updateOrder"
  ></UpdateOrderModal>
  <DeleteModal
    :temp-info="tempOrder"
    @delete-info="erase"
    ref="deleteOrder"
  ></DeleteModal>
</template>

<script>
import UpdateOrderModal from '@/components/UpdateOrderModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'

export default {
  emits: ['loading'],
  inject: ['emitter'],
  data() {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      isNew: false
    }
  },
  components: {
    UpdateOrderModal,
    DeleteModal
  },
  methods: {
    getOrders(page = 1) {
      this.$emit('loading', true)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(url).then((res) => {
        const { orders, pagination } = res.data
        this.orders = orders
        this.pagination = pagination
        const toastMsg = {
          ...res.data,
          event: '取得訂單列表'
        }
        this.emitter.emit('toastMsg', toastMsg)
        this.$emit('loading', false)
      }).catch(e => console.log(e))
    },
    orderContent(products) {
      const arr = []
      for (const i in products) {
        arr.push(products[i].product.title)
      }
      return arr.join('、')
    },
    adjustOrder(info) {
      this.tempOrder = info
      this.$refs.updateOrder.showModal()
    },
    deleteOrder(info) {
      this.tempOrder = info
      this.$refs.deleteOrder.showModal()
    },
    update(updateOrder) {
      this.$emit('loading', true)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${updateOrder.id}`
      const data = { data: { ...updateOrder } }
      this.$http.put(url, data).then((res) => {
        const toastMsg = {
          ...res.data,
          event: '更新訂單'
        }
        this.emitter.emit('toastMsg', toastMsg)
        this.getOrders()
      }).catch(e => console.log(e))
    },
    erase(deleteOrder) {
      this.$emit('loading', true)
      let url = ''
      if (deleteOrder.title) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/all`
      } else {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${deleteOrder.id}`
      }
      this.$http.delete(url).then((res) => {
        const toastMsg = {
          ...res.data,
          event: '刪除訂單'
        }
        this.emitter.emit('toastMsg', toastMsg)
        this.getOrders()
      }).catch(e => console.log(e))
    }
  },
  created() {
    this.getOrders()
  }
}
</script>
