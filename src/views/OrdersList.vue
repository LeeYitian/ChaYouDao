<template>
  <div class="container">
    <div class="table-responsive-md">
      <table class="table table-hover text-primary mt-2 dashboard-table">
        <thead class="border-bottom border-primary border-2 bg-lightbrown">
          <tr>
            <th width="100">建立時間</th>
            <th width="120">訂單內容</th>
            <th width="120">附註</th>
            <th width="100">總額</th>
            <th width="100">付款</th>
            <th width="200" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in orders" :key="i.id" class="align-middle">
            <td>{{ $filters.date(i.create_at) }}</td>
            <td>{{ i.products }}</td>
            <td>{{ i.message }}</td>
            <td class="text-right">{{ i.total }}</td>
            <td>
              <span v-if="i.is_paid" class="text-success">付款</span>
              <span v-else class="text-danger">未付款</span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm">
                  修改
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn btn-danger mt-2 btn-sm d-block ms-auto" type="button">
      刪除所有訂單
    </button>
  </div>
  <PaginationBar v-bind="pagination"></PaginationBar>
</template>

<script>
import checkToken from '@/mixins/checkToken.js'
import PaginationBar from '@/components/PaginationBar.vue'

export default {
  mixins: [checkToken],
  emits: ['loading'],
  data() {
    return {
      orders: [],
      pagination: {}
    }
  },
  components: {
    PaginationBar
  },
  methods: {
    getOrders(page = 1) {
      this.$emit('loading', true)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(url).then((res) => {
        this.orders = res.data.orders
        this.pagination = res.data.pagination
        this.$emit('loading', false)
      })
    }
  },
  created() {
    this.getOrders()
  }
}
</script>
