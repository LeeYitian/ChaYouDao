<template>
  <div
    class="modal fade modal-xl"
    id="myModal"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="myModal"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title">
            <span>新增／修改產品</span>
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="dismiss"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-5">
              <div class="mb-3">
                <label for="image" class="form-label">上傳主要圖片</label>
                <input
                  v-model="temp.mainImgUrl"
                  type="url"
                  class="form-control"
                  id="image"
                  placeholder="請輸入主要圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 從電腦上傳
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  name="file-to-upload"
                  @change="createImgUrl"
                  ref="inputMain"
                />
              </div>
              <div
                v-show="temp.mainImgUrl || temp.mainImgLocal"
                class="position-relative img-pre"
              >
                <img
                  class="img-fluid"
                  id="preview"
                  :src="temp.mainImgUrl || temp.mainImgLocal"
                  alt=""
                />
                <i
                  @click.stop="removeUpload"
                  class="position-absolute top-0 start-100 translate-middle bi bi-x-circle"
                  data-fun="url"
                ></i>
              </div>

              <!-- 多圖 -->
              <div
                class="mt-5"
                ref="minorInputs"
                data-fun="urls"
                @click.stop="removeUpload"
              >
                <label for="imageSec" class="form-label">上傳次要圖片</label>
                <div
                  class="mb-2 input-group input-group-sm"
                  ref="minorInputUrl"
                >
                  <input
                    type="url"
                    id="imageSec"
                    class="form-control minorInputUrl"
                    placeholder="請輸入次要圖片連結"
                    @change="minorImgUrlUpload"
                  />
                  <button type="button" class="btn btn-outline-danger">
                    移除
                  </button>
                </div>
                <div class="mb-3" ref="minoreInputLocal">
                  <label for="customFileSec" class="form-label"
                    >或 從電腦上傳
                  </label>
                  <input
                    type="file"
                    id="customFileSec"
                    class="form-control"
                    name="files-to-upload"
                    multiple
                    @change="createMinorImgUrl"
                    ref="inputMinor"
                  />
                </div>
                <div v-show="minorImgAll !== []" class="row g-1 mb-3">
                  <div v-for="i in minorImgAll" :key="i" class="col-3">
                    <div class="position-relative img-pre">
                      <img class="img-fluid" id="previews" :src="i" alt="" />
                      <i
                        class="position-absolute top-0 start-100 translate-middle bi bi-x-circle"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="uploadAllImg"
                >
                  上傳圖片
                </button>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  v-model="product.title"
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    v-model="product.category"
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    v-model="product.unit"
                    type="text"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    v-model="product.origin_price"
                    type="number"
                    class="form-control"
                    min="0"
                    id="origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    v-model="product.price"
                    type="number"
                    class="form-control"
                    min="0"
                    id="price"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  v-model="product.description"
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  v-model="product.content"
                  type="text"
                  class="form-control"
                  id="content"
                  placeholder="請輸入產品說明內容"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    v-model="product.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
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
          <button
            type="button"
            data-bs-toggle="tooltip"
            data-bs-title="請記得點選上傳圖片"
            class="btn btn-primary"
            @click="emit"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '@/mixins/modalMixin.js'
import Tooltip from 'bootstrap/js/dist/tooltip.js'

export default {
  mixins: [modal],
  props: ['tempInfo'],
  data() {
    return {
      temp: {
        mainImgUrl: '',
        mainImgLocal: '',
        minorImgUrls: [],
        minorFileList: [],
        minorImgLocals: []
      },
      product: {}
    }
  },
  computed: {
    minorImgAll() {
      return [...this.temp.minorImgUrls, ...this.temp.minorImgLocals]
    }
  },
  watch: {
    temp() {
      if (!this.temp.mainUrl.includes('http')) {
        alert('請確認網址是否正確')
      }
    },
    tempInfo(n, o) {
      this.product = { ...n }
      this.temp.mainImgUrl = this.product.imageUrl || ''
      this.temp.minorImgUrls = this.product.imagesUrl || []
    }
  },
  methods: {
    dismiss() {
      this.hideModal()
    },
    createImgUrl(e) {
      if (this.temp.mainImgUrl !== '') {
        alert('請先移除上方網址')
        e.currentTarget.value = ''
        return
      }
      this.temp.mainImgLocal = URL.createObjectURL(e.currentTarget.files[0])
    },
    minorImgUrlUpload(e) {
      if (this.$refs.minorInputUrl.children[0].value === '') {
        return
      } else if (!this.$refs.minorInputUrl.children[0].value.includes('http')) {
        alert('請確認網址是否正確')
        return
      } else if (
        this.temp.minorImgUrls.length + this.temp.minorImgLocals.length >
        5
      ) {
        alert('次要圖片上傳總張數為5張（含網址上傳及檔案上傳）')
        return
      }
      this.temp.minorImgUrls.push(e.currentTarget.value)
      // 新增網址輸入框
      const newInput = this.$refs.minorInputUrl.cloneNode(true)
      newInput.children[0].value = ''
      newInput.children[0].addEventListener('change', this.minorImgUrlUpload)
      this.$refs.minorInputs.insertBefore(newInput, this.$refs.minoreInputLocal)
    },
    createMinorImgUrl(e) {
      if (
        e.currentTarget.files.length > 5 ||
        e.currentTarget.files.length > 5 - this.temp.minorImgUrls.length
      ) {
        alert('次要圖片上傳總張數為5張（含網址上傳及檔案上傳）')
        e.currentTarget.value = ''
        return
      }
      for (const i of e.currentTarget.files) {
        const url = URL.createObjectURL(i)
        this.temp.minorImgLocals.push(url)
        const file = {}
        file.file = i
        file.url = url
        this.temp.minorFileList.push(file)
      }
    },
    removeUpload(e) {
      if (e.currentTarget.dataset.fun === 'url') {
        this.temp.mainImgUrl = ''
        this.temp.mainImgLocal = ''
        this.$refs.inputMain.value = ''
      } else if (e.currentTarget.dataset.fun === 'urls') {
        // 因為元件會增加，所以用事件委託的方法
        let index = ''
        let src = ''
        switch (e.target.nodeName) {
          case 'BUTTON':
            if (e.target.previousSibling.value === '') return
            index = this.temp.minorImgUrls.indexOf(
              e.target.previousSibling.value
            )
            this.temp.minorImgUrls.splice(index, 1)
            e.target.parentNode.remove()
            break
          case 'svg':
            src = e.target.previousSibling.getAttribute('src')
            if (this.temp.minorImgUrls.indexOf(src) >= 0) {
              index = this.temp.minorImgUrls.indexOf(src)
              this.temp.minorImgUrls.splice(index, 1)
              const inputs = document.getElementsByClassName('minorInputUrl')
              for (const i of inputs) {
                if (i.value === src) {
                  i.parentNode.remove()
                }
              }
            } else {
              index = this.temp.minorImgLocals.indexOf(src)
              this.temp.minorImgLocals.splice(index, 1)
              this.temp.minorFileList.forEach((i, index, arr) => {
                if (i.url === src) {
                  arr.splice(index, 1)
                }
              })
            }
            break
        }
      }
    },
    uploadAllImg() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`

      if (this.temp.mainImgLocal !== '') {
        const data = new FormData()
        const file = this.$refs.inputMain.files[0]
        data.append('file-to-upload', file)
        this.$http
          .post(url, data)
          .then((res) => {
            console.log('主要', res.data)
            this.product.imageUrl = res.data.imageUrl
            // free memory
            URL.revokeObjectURL(this.temp.mainImgLocal)
            this.temp.mainImgLocal = ''
          })
          .catch((e) => console.log('主要', e.response.data.message))
      } else {
        this.product.imageUrl = this.temp.mainImgUrl
        this.temp.mainImgUrl = ''
      }

      if (this.temp.minorImgLocals.length > 0) {
        const minorPromise = []
        this.temp.minorFileList.forEach((i) => {
          const data = new FormData()
          data.append('files-to-upload', i.file)
          minorPromise.push(this.$http.post(url, data))
        })
        Promise.all(minorPromise)
          .then((res) => {
            console.log('次要', res)
            if (this.temp.minorImgUrls.length > 0) {
              this.product.imagesUrl = [...this.temp.minorImgUrls]
            }
            res.forEach((i) => this.prodict.imageUrls.push(i.data.imageUrl))
            // free memory
            this.temp.minorImgLocals.forEach((i) => URL.revokeObjectURL(i))
            this.temp.minorImgLocals = ''
            this.temp.minorImgUrls = ''
            this.temp.minorFileList = ''
          })
          .catch((e) => console.log('次要', e.response.data.message))
      } else {
        this.product.imagesUrl = [...this.temp.minorImgUrls]
        this.temp.minorImgUrls = ''
      }
    },
    emit() {
      if (this.product.price < 0 || this.product.origin_price < 0) {
        alert('價錢不得為負數')
        return
      }
      const updateProduct = { ...this.product }
      this.$emit('update-product', updateProduct)
      this.hideModal()
    }
  },
  mounted() {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    )
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
    )
    tooltipList.forEach((i) => i.enable())
  }
}
</script>
