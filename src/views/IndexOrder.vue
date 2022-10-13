<template>
  <div class="order-nav-bg min-vh-100 order-nav">
    <div class="bg-primary p-2 d-flex align-items-center justify-content-between mb-3">
      <router-link to="/" class="fs-3 fw-bold link-lightbrown text-decoration-none">
        <span class="fs-2 me-2 material-symbols-outlined">
          temp_preferences_eco </span>茶友道
      </router-link>
      <span class="text-lightbrown">訂單</span>
    </div>
    <IndexNotificationToast></IndexNotificationToast>
    <router-view></router-view>
  </div>
</template>

<script>
import IndexNotificationToast from '@/components/IndexNotificationToast.vue'
import emitter from '@/methods/mitt'

export default {
  provide() {
    return {
      emitter
    }
  },
  components: {
    IndexNotificationToast
  }
}
</script>
