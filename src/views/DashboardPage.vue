<template>
  <ManagementNavbar></ManagementNavbar>
  <router-view @loading="changeLoading"></router-view>
  <loadingComponent :active="isLoading" loader="bars" background-color="#333"></loadingComponent>
  <NotificationToast></NotificationToast>
</template>

<script>
import ManagementNavbar from '../components/ManagementNavbar.vue'
import emitter from '@/methods/mitt'

export default {
  provide() {
    return {
      emitter
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    ManagementNavbar
  },
  methods: {
    checkToken() {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('finalVue='))
        ?.split('=')[1]
      const url = `${process.env.VUE_APP_API}api/user/check`
      this.$http.defaults.headers.common.Authorization = token
      this.$http.post(url).then((res) => {
        if (!res.data.success) {
          alert(res.data.message)
          this.$router.push('/login')
        }
      })
    },
    changeLoading(state) {
      this.isLoading = state
    }
  },
  created() {
    this.checkToken()
  }
}
</script>
