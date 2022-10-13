<template>
  <div
    v-if="page === 'details'"
    class="placeholder-details row"
    style="height: 400px"
  >
    <div class="col-sm-5 col-lg-4 placeholder-glow">
      <div class="placeholder rounded" style="height: 80%; width: 100%"></div>
      <div class="row g-1 mt-auto" style="height: 18%">
        <div class="col-4" style="height: 100%">
          <div class="placeholder" style="height: 100%; width: 100%"></div>
        </div>
        <div class="col-4" style="height: 100%">
          <div class="placeholder" style="height: 100%; width: 100%"></div>
        </div>
        <div class="col-4" style="height: 100%">
          <div class="placeholder" style="height: 100%; width: 100%"></div>
        </div>
      </div>
    </div>
    <div
      class="col-sm-7 col-lg-6 mt-3 mt-sm-0 d-flex flex-column placeholder-glow"
    >
      <h1><span class="placeholder col-10"></span></h1>
      <p>
        <span class="col-3 placeholder me-1"></span>
        <span class="col-7 placeholder me-1"></span>
        <span class="col-8 placeholder me-1"></span>
        <span class="col-2 placeholder me-1"></span>
        <span class="col-12 placeholder me-1"></span>
      </p>
      <h3>
        <span class="col-3 placeholder"></span>
      </h3>
      <button
        type="button"
        class="btn btn-darkbrown col-5 disabled placeholder mt-auto align-self-end"
      ></button>
    </div>
  </div>
  <div v-if="page === 'product'" class="placeholder-selectProducts row">
    <div class="col-lg-4 col-md-6 mb-5 placeholder-glow">
      <div class="card bg-transparent border-0" style="height: 400px">
        <div class="placeholder rounded" style="height: 45%"></div>
        <div class="card-body d-flex flex-column">
          <h2 class="card-title">
            <span class="placeholder col-12"></span>
          </h2>
          <p class="card-text">
            <span class="placeholder col-3 me-1"></span>
            <span class="placeholder col-7 me-1"></span>
            <span class="placeholder col-12 me-1"></span>
            <span class="placeholder col-6 me-1"></span>
            <span class="placeholder col-4 me-1"></span>
          </p>
          <span class="placeholder col-5 align-self-end"></span>
        </div>
      </div>
      <button class="btn btn-darkbrown disabled placeholder w-100"></button>
    </div>
    <div class="col-lg-4 col-md-6 mb-5 placeholder-glow">
      <div class="card bg-transparent border-0" style="height: 400px">
        <div class="placeholder rounded" style="height: 45%"></div>
        <div class="card-body d-flex flex-column">
          <h2 class="card-title">
            <span class="placeholder col-12"></span>
          </h2>
          <p class="card-text">
            <span class="placeholder col-3 me-1"></span>
            <span class="placeholder col-7 me-1"></span>
            <span class="placeholder col-12 me-1"></span>
            <span class="placeholder col-6 me-1"></span>
            <span class="placeholder col-4 me-1"></span>
          </p>
          <span class="placeholder col-5 align-self-end"></span>
        </div>
      </div>
      <button class="btn btn-darkbrown disabled placeholder w-100"></button>
    </div>
    <div class="col-lg-4 col-md-6 mb-5 placeholder-glow">
      <div class="card bg-transparent border-0" style="height: 400px">
        <div class="placeholder rounded" style="height: 45%"></div>
        <div class="card-body d-flex flex-column">
          <h2 class="card-title">
            <span class="placeholder col-12"></span>
          </h2>
          <p class="card-text">
            <span class="placeholder col-3 me-1"></span>
            <span class="placeholder col-7 me-1"></span>
            <span class="placeholder col-12 me-1"></span>
            <span class="placeholder col-6 me-1"></span>
            <span class="placeholder col-4 me-1"></span>
          </p>
          <span class="placeholder col-5 align-self-end"></span>
        </div>
      </div>
      <button class="btn btn-darkbrown disabled placeholder w-100"></button>
    </div>
    <div class="col-lg-4 col-md-6 mb-5 placeholder-glow">
      <div class="card bg-transparent border-0" style="height: 400px">
        <div class="placeholder rounded" style="height: 45%"></div>
        <div class="card-body d-flex flex-column">
          <h2 class="card-title">
            <span class="placeholder col-12"></span>
          </h2>
          <p class="card-text">
            <span class="placeholder col-3 me-1"></span>
            <span class="placeholder col-7 me-1"></span>
            <span class="placeholder col-12 me-1"></span>
            <span class="placeholder col-6 me-1"></span>
            <span class="placeholder col-4 me-1"></span>
          </p>
          <span class="placeholder col-5 align-self-end"></span>
        </div>
      </div>
      <button class="btn btn-darkbrown disabled placeholder w-100"></button>
    </div>
    <div class="col-lg-4 col-md-6 mb-5 placeholder-glow">
      <div class="card bg-transparent border-0" style="height: 400px">
        <div class="placeholder rounded" style="height: 45%"></div>
        <div class="card-body d-flex flex-column">
          <h2 class="card-title">
            <span class="placeholder col-12"></span>
          </h2>
          <p class="card-text related-none">
            <span class="placeholder col-3 me-1"></span>
            <span class="placeholder col-7 me-1"></span>
            <span class="placeholder col-12 me-1"></span>
            <span class="placeholder col-6 me-1"></span>
            <span class="placeholder col-4 me-1"></span>
          </p>
          <span class="placeholder col-5 align-self-end"></span>
        </div>
      </div>
      <button
        class="btn btn-darkbrown disabled placeholder w-100 related-none"
      ></button>
    </div>
  </div>
  <div v-if="page === 'article'" class="placeholder-selectArticle row">
    <div class="placeholder-glow bg-darkgreen p-2 rounded">
      <p>
        <span class="placeholder col-8 me-1"></span>
        <span class="placeholder col-3 me-1"></span>
        <span class="placeholder col-2 me-1"></span>
        <span class="placeholder col-8 me-1"></span>
        <span class="placeholder col-4 me-1"></span>
      </p>
    </div>
    <div class="placeholder-glow row flex-column flex-sm-row">
      <h1 class="my-3 order-1">
        <span class="placeholder col-12"></span>
      </h1>
      <div class="col-md-6 order-3 order-sm-2 pb-3">
        <span class="placeholder col-2 me-1"></span>
        <span class="placeholder col-9 me-1"></span>
        <span class="placeholder col-4 me-1"></span>
        <span class="placeholder col-3 me-1"></span>
        <span class="placeholder col-5 me-1"></span>
        <span class="placeholder col-11 me-1"></span>
        <span class="placeholder col-3 me-1"></span>
        <span class="placeholder col-6 me-1"></span>
        <span class="placeholder col-7 me-1"></span>
        <span class="placeholder col-3 me-1"></span>
        <span class="placeholder col-5 me-1"></span>
        <span class="placeholder col-10 me-1"></span>
        <span class="placeholder col-8 me-1"></span>
        <span class="placeholder col-4 me-1"></span>
        <span class="placeholder col-3 me-1"></span>
        <span class="placeholder col-3 me-1"></span>
        <span class="placeholder col-6 me-1"></span>
      </div>
      <div class="col-md-6 order-2 order-sm-3 pb-3">
        <div class="placeholder" style="height: 400px; width: 100%"></div>
      </div>
    </div>
  </div>
  <tr v-if="page === 'createOrder'" class="placeholder-selectArticle">
    <td
      class="d-flex justify-content-between align-items-center placeholder-glow"
    >
      <button
        type="button"
        class="btn btn-sm btn-outline-danger me-2 me-sm-0 flex-shrink-0 placeholder"
      >
        刪除
      </button>
      <div class="text-end me-sm-2 w-50">
        <span class="placeholder col-10"></span>
      </div>
      <div
        class="d-none d-sm-block placeholder"
        style="height: 80px; width: 80px"
      ></div>
    </td>
    <td class="align-middle placeholder-glow">
      <div class="input-group input-group-sm" role="group">
        <button type="button" class="btn btn-lightbrown d-none d-sm-block placeholder">
          －
        </button>
        <input type="number" class="form-control placeholder" />
        <button type="button" class="btn btn-lightbrown d-none d-sm-block placeholder">
          ＋
        </button>
      </div>
    </td>
    <td class="text-end align-middle placeholder-glow">
      <span class="placeholder col-6"></span>
    </td>
  </tr>
  <tr v-if="page === 'createOrder'" class="placeholder-selectArticle">
    <td
      class="d-flex justify-content-between align-items-center placeholder-glow"
    >
      <button
        type="button"
        class="btn btn-sm btn-outline-danger me-2 me-sm-0 flex-shrink-0 placeholder"
      >
        刪除
      </button>
      <div class="text-end me-sm-2 w-50">
        <span class="placeholder col-10"></span>
      </div>
      <div
        class="d-none d-sm-block placeholder"
        style="height: 80px; width: 80px"
      ></div>
    </td>
    <td class="align-middle placeholder-glow">
      <div class="input-group input-group-sm" role="group">
        <button type="button" class="btn btn-lightbrown d-none d-sm-block placeholder">
          －
        </button>
        <input type="number" class="form-control placeholder" />
        <button type="button" class="btn btn-lightbrown d-none d-sm-block placeholder">
          ＋
        </button>
      </div>
    </td>
    <td class="text-end align-middle placeholder-glow">
      <span class="placeholder col-6"></span>
    </td>
  </tr>
  <tr v-if="page === 'createOrder'" class="placeholder-selectArticle">
    <td
      class="d-flex justify-content-between align-items-center placeholder-glow"
    >
      <button
        type="button"
        class="btn btn-sm btn-outline-danger me-2 me-sm-0 flex-shrink-0 placeholder"
      >
        刪除
      </button>
      <div class="text-end me-sm-2 w-50">
        <span class="placeholder col-10"></span>
      </div>
      <div
        class="d-none d-sm-block placeholder"
        style="height: 80px; width: 80px"
      ></div>
    </td>
    <td class="align-middle placeholder-glow">
      <div class="input-group input-group-sm" role="group">
        <button type="button" class="btn btn-lightbrown d-none d-sm-block placeholder">
          －
        </button>
        <input type="number" class="form-control placeholder" />
        <button type="button" class="btn btn-lightbrown d-none d-sm-block placeholder">
          ＋
        </button>
      </div>
    </td>
    <td class="text-end align-middle placeholder-glow">
      <span class="placeholder col-6"></span>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['page']
}
</script>
