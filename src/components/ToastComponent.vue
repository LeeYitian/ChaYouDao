<template>
  <div
    class="toast"
    role="alert"
    ref="toast"
  >
    <div
      class="toast-header"
      :class="{
        'text-bg-danger': !singleMsg.success,
        'text-bg-success': singleMsg.success
      }"
    >
      <strong class="me-auto">{{ singleMsg.event }}</strong>
    </div>
    <div class="toast-body" :class="{ 'text-muted': !singleMsg.message }">
      {{ fullMessage }}
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast.js'

export default {
  props: ['singleMsg'],
  data() {
    return {
      toast: {}
    }
  },
  computed: {
    fullMessage() {
      if (!this.singleMsg.message) {
        return '動作完成'
      } else if (Array.isArray(this.singleMsg.message)) {
        return this.singleMsg.message.join('、')
      } else {
        return this.singleMsg.message
      }
    }
  },
  mounted() {
    const toast = new Toast(this.$refs.toast, {
      delay: 4000
    })
    toast.show()
  }
}
</script>
