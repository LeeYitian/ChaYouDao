<template>
  <nav class="navbar navbar-expand-lg bg-light manage-nav">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand text-primary fw-bold"
        ><span class="material-symbols-outlined me-1">
          temp_preferences_eco </span
        >茶友道</router-link
      >
      <button class="navbar-toggler" type="button" @click="showCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav w-100">
          <router-link to="/dashboard/products" class="nav-link"
            >產品管理</router-link
          >
          <router-link to="/dashboard/orders" class="nav-link"
            >訂單管理</router-link
          >
          <router-link to="/dashboard/coupons" class="nav-link"
            >優惠券管理</router-link
          >
          <router-link to="/dashboard/articles" class="nav-link"
            >文章管理</router-link
          >
          <a class="nav-link ms-auto" href="#" @click.prevent="logout">登出</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Collapse from 'bootstrap/js/dist/collapse'
export default {
  data() {
    return {
      collapse: {}
    }
  },
  methods: {
    showCollapse() {
      this.collapse.toggle()
    },
    logout() {
      this.$emit('loading', true)
      const url = `${process.env.VUE_APP_API}logout`
      this.$http.post(url).then(() => {
        this.$emit('loading', false)
        document.cookie = 'finalVue=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
        alert('已成功登出')
        this.$router.push('/login')
      }).catch(e => console.log(e))
    }
  },
  emits: ['loading'],
  mounted() {
    const collapseElement = document.querySelector('.collapse')
    this.collapse = new Collapse(collapseElement, { toggle: false })
  }
}
</script>
