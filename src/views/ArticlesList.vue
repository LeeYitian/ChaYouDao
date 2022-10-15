<template>
  <div class="container">
    <button
      class="btn btn-darkgreen mt-2 btn-sm d-block ms-auto"
      type="button"
      @click="adjustAritcle({}, $event)"
    >
      新增文章
    </button>
    <div class="table-responsive-lg">
      <table class="table table-hover text-primary mt-2 dashboard-table">
        <thead class="border-bottom border-light border-2 text-bg-darkgreen">
          <tr>
            <th width="120" class="text-center">建立時間</th>
            <th width="120" class="text-center">標題</th>
            <th width="80" class="text-center">作者</th>
            <th width="300" class="text-center">摘要</th>
            <th width="80" class="text-center">公開</th>
            <th width="120" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in articles" :key="i.id" class="align-middle">
            <td>{{ $filters.date(i.create_at) }}</td>
            <td>{{ i.title }}</td>
            <td>{{ i.author }}</td>
            <td>{{ i.description }}</td>
            <td>
              <span v-if="i.isPublic" class="text-success">公開</span>
              <span v-else class="text-muted">未公開</span>
            </td>
            <td class="text-center">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="adjustAritcle(i, $event)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteArticle(i)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <PaginationBar v-bind="pagination"></PaginationBar>
  <UpdateArticleModal
    :temp-info="tempArticle"
    @update-article="update"
    ref="updateArticle"
  ></UpdateArticleModal>
  <DeleteModal
    :temp-info="tempArticle"
    @delete-info="erase"
    ref="deleteArticle"
  ></DeleteModal>
</template>

<script>
import UpdateArticleModal from '@/components/UpdateArticleModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'

export default {
  inject: ['emitter'],
  emits: ['loading'],
  data() {
    return {
      articles: [],
      pagination: {},
      tempArticle: {},
      isNew: false
    }
  },
  components: {
    UpdateArticleModal,
    DeleteModal
  },
  methods: {
    getArticle(page = 1) {
      this.$emit('loading', true)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`
      this.$http.get(url).then((res) => {
        this.$emit('loading', false)
        const { articles, pagination } = res.data
        this.articles = articles
        this.pagination = pagination
        const toastMsg = {
          ...res.data,
          event: '取得文章列表'
        }
        this.emitter.emit('toastMsg', toastMsg)
      }).catch(e => console.log(e))
    },
    adjustAritcle(info, e) {
      e.currentTarget.textContent.trim() === '編輯'
        ? (this.isNew = false)
        : (this.isNew = true)
      if (info.id) {
        this.$emit('loading', true)
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${info.id}`
        this.$http.get(url).then((res) => {
          this.tempArticle = {
            ...info,
            content: res.data.article.content
          }
          this.$emit('loading', false)
          this.$refs.updateArticle.showModal()
        })
      } else {
        this.tempArticle = info
        this.$refs.updateArticle.showModal()
      }
    },
    deleteArticle(info) {
      this.$refs.deleteArticle.showModal()
      this.tempArticle = info
    },
    update(updateArticle) {
      this.$emit('loading', true)
      let url = ''
      let data = {}
      let method = ''
      switch (this.isNew) {
        case true:
          url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`
          data = { data: { ...updateArticle } }
          method = 'post'
          break
        case false:
          url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${updateArticle.id}`
          data = { data: { ...updateArticle } }
          method = 'put'
          break
      }
      this.$http({
        url,
        method,
        data
      }).then((res) => {
        const toastMsg = {
          ...res.data,
          event: '新增／修改文章'
        }
        this.emitter.emit('toastMsg', toastMsg)
        this.getArticle()
      }).catch(e => console.log(e))
    },
    erase(deleteArticle) {
      this.$emit('loading', true)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${deleteArticle.id}`
      this.$http.delete(url).then((res) => {
        const toastMsg = {
          ...res.data,
          event: '刪除文章'
        }
        this.emitter.emit('toastMsg', toastMsg)
        this.getArticle()
      }).catch(e => console.log(e))
    }
  },
  created() {
    this.getArticle()
  }
}
</script>
