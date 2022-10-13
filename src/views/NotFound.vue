<template>
  <div class="bg-p">
    <main
      class="bg position-absolute top-50 start-50 translate-middle rounded py-5"
    >
      <h1 class="h3 text-darkbrown text-center fw-bold">找不到頁面</h1>
      <router-link
        to="/"
        class="d-block h5 fw-semibold text-center link-darkbrown"
        >回首頁</router-link
      >
    </main>
  </div>
</template>

<style>
.bg-p {
  height: 100vh;
  background-image: linear-gradient(45deg, transparent 45%, #D1D1D1 45%, #D1D1D1 55%, transparent 55%);
  background-size: 20px 20px;
  background-repeat: repeat;
}
.bg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 30%;
  background-image: url('@/assets/img/01_Leaf_Pattern_generated.jpg');
  background-size: 300px 300px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, .3) inset;
}
@media(max-width: 576px) {
  .bg {
    width: 50%;
    height: 50%;
  }
}
</style>
