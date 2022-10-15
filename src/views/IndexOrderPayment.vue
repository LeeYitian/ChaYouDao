<template>
  <loadingComponent
    :active="isLoading"
    loader="spinner"
    background-color="#333"
  ></loadingComponent>
  <div class="container pb-3">
    <div class="row">
      <div class="col-sm-8 mx-auto">
        <table class="table bg-white text-primary">
          <caption class="caption-top h3 text-primary fw-bold">
            訂單資訊
          </caption>
          <tbody>
            <tr class="align-middle">
              <th scope="row">時間</th>
              <td>{{ $filters.date(create_at) }}</td>
            </tr>
            <tr class="align-middle">
              <th scope="row">訂單內容</th>
              <td>
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr v-for="i in orderProducts" :key="i.id">
                      <td width="100">{{ i.product.title }}</td>
                      <td width="50" class="text-end">
                        {{ i.qty }} /{{ i.product.unit }}
                      </td>
                      <td width="80" class="d-none d-sm-table-cell text-end">
                        $ {{ $filters.currency(i.final_total) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr class="align-middle">
              <th scope="row">總價</th>
              <td>$ {{ $filters.currency(total) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end fs-4">
                付款狀態：
                <span v-if="is_paid" class="text-success">已付款</span>
                <span v-else class="text-danger">未付款</span>
              </td>
            </tr>
          </tfoot>
        </table>
        <table class="table table-borderless table-striped bg-white">
          <caption class="caption-top h3 text-primary fw-bold">
            訂購者資訊
          </caption>
          <tbody>
            <tr>
              <td>姓名：</td>
              <td>{{ user.name }}</td>
            </tr>
            <tr>
              <td>手機：</td>
              <td>{{ user.tel }}</td>
            </tr>
            <tr>
              <td>信箱：</td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td>收件地址：</td>
              <td>{{ user.address }}</td>
            </tr>
            <tr>
              <td>附註：</td>
              <td>{{ message }}</td>
            </tr>
          </tbody>
        </table>
        <div class="col-4 ms-auto">
          <button
            type="button"
            class="btn btn-success w-100"
            @click="pay(orderID)"
          >
            付款
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  data() {
    return {
      isLoading: false,
      orderID: '',
      create_at: '',
      orderProducts: [],
      user: {},
      message: '',
      is_paid: '',
      total: 0
    }
  },
  methods: {
    getSingleOrder(id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`
      this.$http.get(url).then((res) => {
        if (!res.data.success) {
          alert(res.data.message)
          this.isLoading = false
          return
        }
        if (!res.data.order) {
          alert('訂單不存在')
          this.$router.push('/')
          return
        }
        this.create_at = res.data.order.create_at
        this.orderProducts = []
        for (const i in res.data.order.products) {
          this.orderProducts.push(res.data.order.products[i])
        }
        this.user = res.data.order.user
        this.message = res.data.order.message
        this.is_paid = res.data.order.is_paid
        this.total = res.data.order.total
        this.isLoading = false
      })
    },
    pay(id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${id}`
      this.$http.post(url).then((res) => {
        if (!res.data.success) {
          const toastMsg = {
            state: res.data.success,
            action: '結帳',
            msg: res.data.message
          }
          this.emitter.emit('indexToastMsg', toastMsg)
          this.isLoading = false
          return
        }
        const toastMsg = {
          state: res.data.success,
          action: '結帳',
          msg: res.data.message
        }
        this.emitter.emit('indexToastMsg', toastMsg)
        this.getSingleOrder(id)
      })
    }
  },
  created() {
    this.orderID = this.$route.params.id
    this.getSingleOrder(this.orderID)
  }
}
</script>
