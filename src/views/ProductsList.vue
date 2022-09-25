<template>
  <div class="container">
    <button
      class="btn btn-primary mt-2 btn-sm d-block ms-auto"
      @click="adjustProduct({}, $event)"
      type="button"
    >
      建立新產品
    </button>
    <div class="table-responsive-md">
      <table class="table table-hover text-primary mt-2 dashboard-table">
        <thead class="border-bottom border-primary border-2 bg-lightbrown">
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">啟用</th>
            <th width="200" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in products" :key="i.id" class="align-middle">
            <td>{{ i.category }}</td>
            <td>{{ i.title }}</td>
            <td class="text-right">{{ $filters.currency(i.origin_price) }}</td>
            <td class="text-right">{{ $filters.currency(i.price) }}</td>
            <td>
              <span v-if="i.is_enabled" class="text-success">啟用</span>
              <span v-else class="text-muted">未啟用</span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="adjustProduct(i, $event)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteProduct(i)"
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
  <UpdateProductModal
    :temp-info="tempProduct"
    @update-product="update"
    ref="updateProductModal"
  ></UpdateProductModal>
  <DeleteModal
    :temp-info="tempProduct"
    @delete-info="erase"
    ref="deleteModal"
  ></DeleteModal>
</template>

<script>
import UpdateProductModal from '@/components/UpdateProductModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import checkToken from '@/mixins/checkToken.js'

export default {
  inject: ['emitter'],
  emits: ['loading'],
  mixins: [checkToken],
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false
    }
  },
  components: {
    UpdateProductModal,
    DeleteModal
  },
  methods: {
    getProducts(page = 1) {
      this.$emit('loading', true)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.$http.get(url).then((res) => {
        this.products = res.data.products
        this.pagination = res.data.pagination
        const toastMsg = {
          ...res.data,
          event: '取得產品列表'
        }
        this.emitter.emit('toastMsg', toastMsg)
        this.$emit('loading', false)
      })
    },
    update(updateProduct) {
      this.$emit('loading', true)
      let url = ''
      const data = { data: { ...updateProduct } }
      let method = ''
      if (this.isNew) {
        method = 'post'
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      } else {
        method = 'put'
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${updateProduct.id}`
      }
      this.$http({
        method,
        url,
        data
      }).then((res) => {
        this.$emit('loading', false)
        const toastMsg = {
          ...res.data,
          event: '新增／更新產品資料'
        }
        this.emitter.emit('toastMsg', toastMsg)
        this.getProducts()
      })
    },
    erase(deleteProduct) {
      this.$emit('loading', true)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${deleteProduct.id}`
      this.$http.delete(url).then((res) => {
        this.$emit('loading', false)
        const toastMsg = {
          ...res.data,
          event: '刪除產品資料'
        }
        this.emitter.emit('toastMsg', toastMsg)
        this.getProducts()
      })
    },
    adjustProduct(info, e) {
      e.currentTarget.textContent.trim() === '編輯'
        ? (this.isNew = false)
        : (this.isNew = true)
      this.tempProduct = info
      this.$refs.updateProductModal.showModal()
    },
    deleteProduct(info) {
      this.tempProduct = info
      this.$refs.deleteModal.showModal()
    }
  },
  created() {
    this.getProducts()
  },
  beforeUpdate() {
    this.checkToken()
  }
}
</script>
