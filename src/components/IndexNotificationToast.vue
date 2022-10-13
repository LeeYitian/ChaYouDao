<template>
  <div class="toast-container index-toast">
    <IndexToastComponent
      v-for="(i, index) in messages"
      :key="index"
      :message="i"
    ></IndexToastComponent>
  </div>
</template>

<style>
.toast-container.index-toast {
  position: fixed;
  top: 30px;
  left: 70px;
  width: calc(100% - 75px);
  z-index: 100;
}
</style>

<script>
import IndexToastComponent from '@/components/IndexToastComponent.vue'

export default {
  inject: ['emitter'],
  data() {
    return {
      messages: []
    }
  },
  components: {
    IndexToastComponent
  },
  mounted() {
    this.emitter.on('indexToastMsg', (msg) => {
      this.messages.push({ ...msg })
    })
  }
}
</script>
