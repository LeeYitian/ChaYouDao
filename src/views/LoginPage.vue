<template>
  <div class="position-absolute top-0 bottom-0 start-0 end-0 login-page">
    <div class="container position-absolute top-50 start-50 translate-middle">
      <h1 class="text-primary text-center fw-bold mb-5"><span class="material-symbols-outlined me-1">
          temp_preferences_eco </span
        >茶友道</h1>
      <form @submit.prevent="userLogin" class="row justify-content-center">
        <div class="col-md-6">
          <h2 class="h5 mb-3 fw-normal text-darkgreen">請先登入</h2>
          <div class="mb-2">
            <label for="inputEmail" class="visually-hidden">Email address</label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              required
              autofocus
              v-model="user.username"
            />
          </div>
          <div class="mb-2">
            <label for="inputPassword" class="visually-hidden">Password</label>
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              required
              v-model="user.password"
            />
          </div>
          <div class="text-end mt-4">
            <button class="btn btn-lg btn-primary btn-block" type="submit">
              登入
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <loadingComponent :active="isLoading" loader="bars" background-color="#576B18"></loadingComponent>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    userLogin() {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(url, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data
          document.cookie = `finalVue=${token}; expires=${new Date(expired)}`
          this.isLoading = false
          this.$router.push('/dashboard/products')
        } else {
          alert(res.data.message)
          this.isLoading = false
        }
      })
    }
  }
}
</script>
