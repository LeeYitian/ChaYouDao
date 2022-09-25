<template>
  <div
    class="modal fade modal-xl updateArticle"
    id="UpdateOrderModal"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="myModal"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content border-0">
        <div class="modal-header bg-darkgreen text-white">
          <h5 class="modal-title">
            <span>新增／修改文章</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            aria-label="Close"
            @click="dismiss"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-4 mb-3">
              <label for="articleDate">建立日期</label>
              <input
                v-model="article.create_at"
                class="form-control"
                type="date"
                id="articleDate"
              />
            </div>
            <div class="col-4 mb-3">
              <label for="articleTitle">標題</label>
              <input
                v-model="article.title"
                class="form-control"
                type="text"
                id="articleTitle"
              />
            </div>
            <div class="col-4 mb-3">
              <label for="articleAuthor">作者</label>
              <input
                v-model="article.author"
                class="form-control"
                type="text"
                id="articleAuthor"
              />
            </div>
            <div class="col-6">
              <label class="form-label" for="articleImg">圖片</label>
              <input
                v-model="article.image"
                class="form-control mb-3"
                type="url"
                id="articleImg"
              />
              <img :src="article.image" class="img-fluid" alt="" />
              <label for="articleTag">標籤</label>
              <textarea
                v-model="article.tag"
                class="form-control"
                id="articleTag"
                placeholder="#標籤一、#標籤二......"
              ></textarea>
            </div>
            <div class="col-6">
              <label for="articleDescription">摘要</label>
              <textarea
                v-model="article.description"
                class="form-control mb-3"
                rows="10"
                id="articleDescription"
              ></textarea>
              <label for="articleContent">內容</label>
              <textarea
                v-model="article.content"
                class="form-control mb-3"
                rows="10"
                id="articleContent"
              ></textarea>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    v-model="article.isPublic"
                    class="form-check-input"
                    type="checkbox"
                    id="isPublic"
                  />
                  <label class="form-check-label" for="isPublic">
                    是否公開
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="dismiss"
          >
            取消
          </button>
          <button type="button" class="btn btn-darkgreen" @click="emit">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  mixins: [modalMixin],
  props: ['tempInfo'],
  data() {
    return {
      article: {}
    }
  },
  watch: {
    tempInfo(n, o) {
      this.article = { ...n }
      if (this.article.tag) {
        const tagStr = this.article.tag.join('、')
        this.article.tag = tagStr
      }
      if (this.article.create_at) {
        const date = new Date(this.article.create_at * 1000)
        const year = date.getFullYear()
        const month = ('0' + (date.getMonth() + 1)).slice(-2)
        const day = ('0' + date.getDate()).slice(-2)
        this.article.create_at = `${year}-${month}-${day}`
      }
    }
  },
  methods: {
    dismiss() {
      this.hideModal()
    },
    emit() {
      const timeStamp = Math.floor(new Date(this.article.create_at) / 1000)
      this.article.create_at = timeStamp
      if (this.article.tag) {
        const tag = this.article.tag.split('、')
        this.article.tag = tag
      }
      this.$emit('updateArticle', this.article)
      this.hideModal()
    }
  }
}
</script>
