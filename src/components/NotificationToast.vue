<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <ToastComponent
      v-for="(i, index) in toastList"
      :key="index"
      :single-msg="i"
    ></ToastComponent>
  </div>
</template>

<script>
import ToastComponent from './ToastComponent.vue'

export default {
  inject: ['emitter'],
  data() {
    return {
      toastList: []
    }
  },
  components: {
    ToastComponent
  },
  mounted() {
    this.emitter.on('toastMsg', (toastMsg) => {
      this.toastList.push({ ...toastMsg })
    })
  }
}
</script>
