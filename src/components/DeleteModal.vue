<template>
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    ref="myModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-light" id="deleteModalTitle">刪除商品資料</h5>
          <button
            type="button"
            class="btn-close bg-light"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <p>刪除： {{tempInfo.title || `訂單${tempInfo.id}`}}（刪除後將無法復原）</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="emit">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '@/mixins/modalMixin.js'
export default {
  mixins: [modal],
  props: ['tempInfo'],
  methods: {
    emit() {
      const deleteInfo = { ...this.tempInfo }
      this.hideModal()
      this.$emit('deleteInfo', deleteInfo)
    }
  }
}
</script>
