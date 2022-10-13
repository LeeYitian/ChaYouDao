<template>
  <div class="indexArticle-bg min-vh-100">
    <div class="indexArticle-list min-vh-100">
      <div class="container pt-5">
        <div class="row flex-column flex-lg-row pt-5">
          <div class="col-lg-3 order-2 order-lg-1">
            <div class="d-none d-sm-flex pb-md-3 list-group">
              <router-link
                v-for="i in articles"
                :key="i.id"
                :to="`/article/${i.id}`"
                class="list-group-item list-group-item-action"
              >
                <h2 class="h6 text-darkgreen">{{ i.title }}</h2>
                <span class="fw-light d-block text-truncate">{{
                  text(i.description)
                }}</span>
              </router-link>
            </div>
          </div>
          <div class="col-lg-8 order-1 order-lg-2 ms-auto overflow-hidden">
            <router-view></router-view>
          </div>
          <button
            type="button"
            class="btn btn-darkgreen d-sm-none fixed-top shadow article-button"
            @click="toggleOffcanvas"
          >
            文章列表
          </button>
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="articleOffcanvas"
          >
            <div class="offcanvas-header">
              <h5>文章列表</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>
            <div class="offcanvas-body">
              <div class="list-group">
                <router-link
                  v-for="i in articles"
                  :key="i.id"
                  :to="`/article/${i.id}`"
                  class="list-group-item list-group-item-action"
                >
                  <h2 class="h6 text-darkgreen">{{ i.title }}</h2>
                  <span class="fw-light d-block text-truncate">{{
                    text(i.description)
                  }}</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (max-width: 576px) {
  .indexArticle-list .article-button.show-button {
    transform: translateY(0px);
  }
}
</style>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas'

export default {
  data() {
    return {
      articles: []
    }
  },
  methods: {
    getArticle() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles`
      this.$http.get(url).then((res) => {
        if (!res.data.success) {
          alert(res.data.message)
          return
        }
        this.articles = res.data.articles
      })
    },
    text(text) {
      const index = text.indexOf('>') + 1
      return text.slice(index)
    },
    scrollEvent() {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        document.querySelector('.article-button').classList.add('show-button')
      } else {
        document
          .querySelector('.article-button')
          .classList.remove('show-button')
      }
    },
    toggleOffcanvas() {
      const offcanvas = new Offcanvas(document.querySelector('#articleOffcanvas'), { backdrop: 'static' })
      offcanvas.toggle()
    }
  },
  created() {
    this.getArticle()
  },
  mounted() {
    window.addEventListener('scroll', this.scrollEvent)
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollEvent)
  }
}
</script>
