<template>
  <loadingComponent
    :active="isLoading"
    loader="spinner"
    background-color="#333"
  ></loadingComponent>
  <div class="container">
    <div class="table-responsive-md">
      <table class="table table-hover text-primary mt-2 dashboard-table">
        <thead class="border-bottom border-primary border-2 bg-lightbrown">
          <tr>
            <th width="120">建立時間</th>
            <th width="200">訂單內容</th>
            <th width="80" class="text-end">金額</th>
            <th width="80" class="text-center">狀態</th>
            <th width="100" class="text-center">付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in orders" :key="i.id" class="align-middle bg-white">
            <td>{{ $filters.date(i.create_at) }}</td>
            <td>{{ orderContent(i.products) }}</td>
            <td class="text-end">$ {{ $filters.currency(i.total) }}</td>
            <td class="text-center">
              <span v-if="i.is_paid" class="text-success">付款</span>
              <span v-else class="text-danger">未付款</span>
            </td>
            <td class="text-center">
              <router-link :to="`/order/${i.id}`" custom v-slot="{ navigate }">
                <button
                  type="button"
                  @click="navigate"
                  role="link"
                  class="btn btn-primary"
                  :disabled="i.is_paid"
                >
                  前往付款
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <PaginationBar v-bind="pagination" @page="getOrders"></PaginationBar>
</template>

<script>
export default {
  inject: ['emitter'],
  data() {
    return {
      isLoading: false,
      orders: [],
      pagination: {}
    }
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`
      this.$http.get(url).then((res) => {
        if (!res.data.success) {
          alert(res.data.message)
          this.isLoading = false
          return
        }
        this.orders = res.data.orders
        this.pagination = res.data.pagination
        this.isLoading = false
      })
    },
    orderContent(products) {
      const arr = []
      for (const i in products) {
        arr.push(products[i].product.title)
      }
      return arr.join('、')
    }
  },
  created() {
    this.getOrders()
  }
}
</script>
