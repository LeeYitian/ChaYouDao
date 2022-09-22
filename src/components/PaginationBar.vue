<template>
  <nav aria-label="products pages">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{'disabled':!has_pre}">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="i in total_pages" :key="i" class="page-item" :class="{'active':i===current_page}"><a class="page-link" href="#">1</a></li>
      <li class="page-item" :class="{'disabled':!has_next}">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['total_pages', 'current_page', 'has_pre', 'has_next', 'category']
}
</script>
