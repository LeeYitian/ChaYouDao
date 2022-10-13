<template>
  <div class="index-bg min-vh-100 text-primary overflow-hidden">
    <section id="indexCarousel" class="carousel slide" data-bs-ride="true">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#indexCarousel"
          data-bs-slide-to="0"
          class="active"
        ></button>
        <button
          type="button"
          data-bs-target="#indexCarousel"
          data-bs-slide-to="1"
        ></button>
        <button
          type="button"
          data-bs-target="#indexCarousel"
          data-bs-slide-to="2"
        ></button>
        <button
          type="button"
          data-bs-target="#indexCarousel"
          data-bs-slide-to="3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <router-link to="/article/-NDXL9zUAlCX2S0fuInX" target="_blank">
            <img
              src="../assets/img/vivek-kumar-JS_ohjocm00-unsplash.jpg"
              class="d-block w-100"
              alt="關於茶友道"
            />
          </router-link>
        </div>
        <div class="carousel-item">
          <a href="#" @click.prevent="scrollToFarmer">
            <img
              src="../assets/img/danurwendho-adyakusuma-dYxx-jPaF34-unsplash.jpg"
              class="d-block w-100"
              alt="農友宣傳"
            />
          </a>
        </div>
        <div class="carousel-item">
          <a href="#" @click.prevent="scrollToSales">
            <img
              src="../assets/img/tanushree-rao-qA4wf2TQ1q0-unsplash.jpg"
              class="d-block w-100"
              alt="組合宣傳"
            />
          </a>
        </div>
        <div class="carousel-item">
          <router-link to="/product/all" target="_blank">
            <img
              src="../assets/img/sun-tea-g70c4f983e_1920.jpg"
              class="d-block w-100"
              alt="產品宣傳"
            />
          </router-link>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#indexCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#indexCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </section>
    <main>
      <div class="container mt-4">
        <article class="row mb-3 tea-intro tea-intro-first">
          <div class="col-sm-7">
            <h2 class="text-darkgreen mt-5">山陵‧清風‧茶香</h2>
            <p>
              茶友道精心挑選台灣好茶，送到客人手中。從茶友道訂購一包茶葉，泡一壺好茶，水氣氤氳，茶香繚繞。
            </p>
            <p>
              低眉抿茶，感受茶湯華入喉間，猶如山陵清風吹拂而過；抬眼一望，日常煩擾盡皆消散，只餘靜謐寧和。
            </p>
          </div>
          <div class="col-5 col-sm-4 bg-lightbrown p-4 ms-auto">
            <img
              src="../assets/img/akash-kannan-ZsfmwFv-XOY-unsplash.jpg"
              class="rounded shadow"
              alt="茶葉插圖"
            />
          </div>
        </article>
        <article class="row mb-5 flex-row-reverse tea-intro tea-intro-second">
          <div class="col-sm-7">
            <h2 class="text-darkgreen mt-5">自斟自飲‧親友相伴</h2>
            <p>
              茶友道希望不論是誰，都能體驗道喝茶的樂趣。若是喜歡一人靜靜品茶，我們就為您準備尋找符合您的風格的茶具，以及一個人吃也沒有負擔的小點心。
            </p>
            <p>
              若是熱愛和同好一起喝茶談天，我們就為您將茶葉包裝成精美禮品。就算距離遙遠，透過茶友道您的心意絕對能傳遞給對方。
            </p>
          </div>
          <div class="col-5 col-sm-4 bg-lightbrown p-4 me-auto">
            <img
              src="../assets/img/sergey-norkov-0bSRG6z--6s-unsplash.jpg"
              class="rounded shadow"
              alt="茶葉插圖"
            />
          </div>
        </article>
      </div>
      <section class="mb-5 sales-intro">
        <div class="container">
          <div class="row">
            <div
              class="col-sm-8 col-lg-6 mx-auto text-center text-white p-5 rounded sales-intro-text"
            >
              <h2>茶葉 × 茶具 × 茶點</h2>
              <h3 class="h5 mb-5">好雅趣組合優惠</h3>
              <small>任意搭配一組茶葉、茶具、茶點即享5折優惠</small>
            </div>
            <div class="col-12 text-center">
              <button
                type="button"
                class="btn btn-danger shadow mt-5"
                @click="getCoupon"
              >
                馬上索取優惠券！
              </button>
            </div>
          </div>
        </div>
      </section>
      <div class="container">
        <div class="row mb-5 rounded dessert-intro">
          <article
            class="col-6 d-flex flex-column rounded-start bg-altowhite dessert-intro-text"
          >
            <h2 class="display-1 fw-bolder">甜品合作</h2>
            <div class="mt-auto">
              <h3 class="h5">與知名甜點店攜手打造精緻的午後時光</h3>
              <p>
                茶友道每月和不同的甜點店合作，推出不論是自己享受或是送禮都讓人很有面子的美味點心。逛逛茶友道，你就會發現質樸不一定就要無華！
              </p>
            </div>
            <router-link
              to="product/dessert"
              target="_blank"
              class="fw-semibold mb-2 align-self-end"
              >→ 去看茶點</router-link
            >
          </article>
        </div>
      </div>
      <div class="container">
        <div class="row mb-5 p-2 p-sm-3 p-lg-5 farmer-intro">
          <h4 class="text-center mb-5">─── 農友們 ───</h4>
          <div class="col-sm-4 mb-2">
            <div class="card rounded-0 border-0 text-primary shadow h-100">
              <img
                src="../assets/img/68.jpg"
                class="mt-3 mx-auto"
                alt="茶農大頭照"
              />
              <div class="card-body">
                <h5 class="card-title text-center">日月潭譚美茶農</h5>
                <h6 class="card-subtitle mb-2 fw-light text-center text-muted">
                  景美 人美 茶美
                </h6>
                <p class="card-text fs-6 fw-light mt-3">
                  茶友道長期合作的茶農。每次和譚美進貨都能感受到她對茶葉的堅持。譚美的茶葉就是品質保證！
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-4 mb-2">
            <div class="card rounded-0 border-0 text-primary shadow h-100">
              <img
                src="../assets/img/67.jpg"
                class="mt-3 mx-auto"
                alt="茶農大頭照"
              />
              <div class="card-body">
                <h5 class="card-title text-center">阿里山拉里</h5>
                <h6 class="card-subtitle mb-2 fw-light text-center text-muted">
                  日出笑容 雲開霧散
                </h6>
                <p class="card-text fs-6 fw-light mt-3">
                  拉里種出來的茶葉，就像他的人一樣，親和力十足。醇厚回甘，非常容易上手。
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-4 mb-2">
            <div class="card rounded-0 border-0 text-primary shadow h-100">
              <img
                src="../assets/img/43.jpg"
                class="mt-3 mx-auto"
                alt="茶農大頭照"
              />
              <div class="card-body">
                <h5 class="card-title text-center">鹿谷路卡斯</h5>
                <h6 class="card-subtitle mb-2 fw-light text-center text-muted">
                  自信 頂級 堅持
                </h6>
                <p class="card-text fs-6 fw-light mt-3">
                  路卡斯把所有的心力都花在製程上。看著路卡斯對茶葉的付出，就能理解他臉上為什麼總是掛著自信的笑。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-5 align-items-center sales-product">
          <h4 class="col-6 col-sm-3 h2">隨機推薦</h4>
          <div class="col-6 col-sm-3">
            <button
              type="button"
              class="btn btn-darkgreen text-nowrap"
              @click="randomPick"
            >
              換一批看看
            </button>
          </div>
          <div
            class="row flex-nowrap overflow-auto mt-2 position-relative sales-product-row"
            @mouseenter="removeArrow"
            @touchstart="removeArrow"
          >
            <i
              class="display-1 position-absolute top-50 start-0 translate-middle-y text-end bi bi-arrow-right-circle-fill"
            ></i>
            <IndexProductSelect
              :select-products="randomProducts"
            ></IndexProductSelect>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel.js'
import IndexProductSelect from '@/views/IndexProductSelect.vue'

export default {
  inject: ['emitter'],
  data() {
    return {
      carousel: {},
      products: [],
      randomProducts: []
    }
  },
  components: {
    IndexProductSelect
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((res) => {
        if (!res.data.success) {
          alert(res.data.message)
          return
        }
        this.products = res.data.products
        this.randomPick()
      })
    },
    getCoupon() {
      if (sessionStorage.getItem('coupon')) {
        if (sessionStorage.getItem('coupon').includes('teaparty')) {
          const toastMsg = {
            state: false,
            action: '優惠券',
            msg: '已經領過了喔'
          }
          this.emitter.emit('indexToastMsg', toastMsg)
          return
        }
        const str = sessionStorage.getItem('coupon') + ', ' + 'teaparty'
        sessionStorage.setItem('coupon', str)
      } else {
        sessionStorage.setItem('coupon', 'teaparty')
      }
      const toastMsg = {
        state: true,
        action: '優惠券',
        msg: '恭喜你獲得優惠券「teaparty」'
      }
      this.emitter.emit('indexToastMsg', toastMsg)
    },
    shuffle(array) {
      let i = array.length
      let j = 0
      let temp = 0
      while (i--) {
        j = Math.floor(Math.random() * (i + 1))
        // swap randomly chosen element with current element
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }

      return array
    },
    randomPick() {
      const arrow = document.querySelector('.sales-product-row i')
      arrow.classList.add('arrow-glow')
      this.randomProducts = []
      const temp = []
      for (let i = 0; i <= this.products.length - 1; i++) {
        temp.push(i)
      }
      const newTemp = this.shuffle(temp).slice(0, 6)
      newTemp.forEach((i) => this.randomProducts.push(this.products[i]))
      document.querySelector('.sales-product-row').scrollTo({ left: 0 })
    },
    removeArrow() {
      const arrow = document.querySelector('.sales-product-row i')
      arrow.classList.remove('arrow-glow')
    },
    createCarousel() {
      const carousel = new Carousel(document.querySelector('#indexCarousel'), {
        ride: 'carousel'
      })
      this.carousel = carousel
    },
    scrollAnimation() {
      const docScrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      const teaImgFirst = document.querySelector('.tea-intro-first img')
      const teaImgSecond = document.querySelector('.tea-intro-second img')
      const teaIntroFirst =
        document.querySelector('.tea-intro-first').children[1]
      const teaIntroFirstTop = teaIntroFirst.getBoundingClientRect().top
      const teaIntroSecond =
        document.querySelector('.tea-intro-second').children[1]
      const teaIntroSecondTop = teaIntroSecond.getBoundingClientRect().top
      const teaIntroText = document.querySelectorAll('.tea-intro p')
      if (docScrollTop > 30) {
        teaIntroText[0].classList.add('show')
        teaIntroText[1].classList.add('show')
      }
      if (docScrollTop > 400) {
        teaIntroText[2].classList.add('show')
        teaIntroText[3].classList.add('show')
      }
      if (
        teaIntroFirstTop < docScrollTop &&
        teaIntroFirstTop > teaIntroFirst.offsetHeight * -1
      ) {
        teaImgFirst.style.opacity = '1'
        teaImgFirst.style.transform = `translateX(-${
          (docScrollTop - teaIntroFirst.offsetHeight) / 5
        }px) rotate(20deg)`
      }
      if (
        teaIntroSecondTop < docScrollTop &&
        teaIntroSecondTop > teaIntroSecond.offsetHeight * -1
      ) {
        teaImgSecond.style.opacity = '1'
        teaImgSecond.style.transform = `translateX(${
          (docScrollTop -
            teaIntroSecond.offsetHeight -
            teaIntroFirst.offsetHeight) /
          5
        }px) rotate(345deg)`
      }
    },
    scrollToSales() {
      const target = document
        .querySelector('.sales-intro')
        .getBoundingClientRect().top
      window.scrollTo({
        top: target - 50
      })
    },
    scrollToFarmer() {
      const farmerTop = document
        .querySelector('.farmer-intro')
        .getBoundingClientRect().top
      window.scrollTo({ top: farmerTop - 50 })
    }
  },
  created() {
    this.getProducts()
  },
  mounted() {
    this.createCarousel()
    window.addEventListener('scroll', this.scrollAnimation)
    if (window.innerWidth < 900) {
      const teaIntroText = document.querySelectorAll('.tea-intro p')
      teaIntroText.forEach((i) => i.classList.add('show'))
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.scrollAnimation)
  }
}
</script>
