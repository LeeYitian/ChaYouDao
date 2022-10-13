export default {
  data() {
    return {
      favorites: []
    }
  },
  methods: {
    favorite(id, e) {
      if (e.currentTarget.className.includes('fill')) {
        const arr = localStorage.getItem('chaFavorite').split(',')
        const newArr = arr.filter((i) => i !== id)
        localStorage.setItem('chaFavorite', newArr.join(','))
        e.currentTarget.classList.remove('bi-heart-fill')
        e.currentTarget.classList.add('bi-heart')
      } else {
        if (localStorage.getItem('chaFavorite')) {
          const str = localStorage.getItem('chaFavorite') + ',' + id
          localStorage.setItem('chaFavorite', str)
        } else {
          localStorage.setItem('chaFavorite', id)
        }
        e.currentTarget.classList.remove('bi-heart')
        e.currentTarget.classList.add('bi-heart-fill')
      }
    },
    readFavorite() {
      if (localStorage.chaFavorite) {
        this.favorites = localStorage.chaFavorite.split(',')
      }
    }
  },
  mounted() {
    this.readFavorite()
  }
}
