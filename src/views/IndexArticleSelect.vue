<template>
  <div class="container">
    <PlaceholderComponent
      v-if="placeholder"
      :page="placeholderPage"
    ></PlaceholderComponent>
    <div
      v-if="!placeholder"
      v-html="article.description"
      class="row bg-darkgreen text-white p-2 rounded article-select"
      ref="description"
    ></div>
    <div
      v-if="!placeholder"
      class="row flex-column flex-sm-row article-select"
      ref="content"
    >
      <h1 class="text-primary my-3 order-1">{{ article.title }}</h1>
      <div
        v-html="article.content"
        class="col-md-6 order-3 order-sm-2 pb-3"
      ></div>
      <div class="col-md-6 order-2 order-sm-3 pb-3">
        <img :src="article.image" class="img-fluid" alt="文章配圖" />
      </div>
    </div>
  </div>
</template>

<style>
.article-select {
  transition: 1s ease;
  transform: translateX(900px);
}
.article-select.show {
  transform: translateX(0px);
}
</style>

<script>
import PlaceholderComponent from '@/components/PlaceholderComponent.vue'

export default {
  data() {
    return {
      placeholder: false,
      placeholderPage: 'article',
      articleID: '',
      article: {}
    }
  },
  components: {
    PlaceholderComponent
  },
  watch: {
    articleID(n, o) {
      if (o !== '') {
        this.$refs.description.classList.remove('show')
        this.$refs.content.classList.remove('show')
        this.getSingleArticle()
      }
    }
  },
  methods: {
    getSingleArticle() {
      this.placeholder = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${this.articleID}`
      this.$http.get(url).then((res) => {
        if (!res.data.success) {
          alert(res.data.message)
          return
        }
        this.article = res.data.article
        this.placeholder = false
        setTimeout(() => {
          this.$refs.description.classList.add('show')
          this.$refs.content.classList.add('show')
        }, 50)
      })
    }
  },
  created() {
    this.articleID = this.$route.params.id
    this.getSingleArticle()
  },
  updated() {
    this.articleID = this.$route.params.id
  }
}
</script>
