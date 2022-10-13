<template>
  <div class="toast border-0 w-100" :class="{'text-bg-success': message.state, 'text-bg-danger': !message.state}" role="alert" ref="toast">
    <div class="d-flex">
      <div class="toast-body">{{ `${message.action}：${message.msg}` }}</div>
      <button
        type="button"
        class="btn-close me-2 m-auto"
        data-bs-dismiss="toast"
      ></button>
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast.js'
export default {
  props: ['message'],
  mounted() {
    const toast = new Toast(this.$refs.toast, {
      delay: 4000
    })
    toast.show()
  }
}
</script>
