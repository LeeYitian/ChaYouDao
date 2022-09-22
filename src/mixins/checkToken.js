export default {
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
    }
  },
  beforecreated() {
    this.checkToken()
  }
}
