<template>
  <nav aria-label="products pages">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{'disabled':!has_pre}">
        <a class="page-link" aria-label="Previous" @click.prevent="$emit('page', current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="i in total_pages" :key="i" class="page-item" :class="{'active':i===current_page}"><a class="page-link" @click.prevent="$emit('page', i)">{{i}}</a></li>
      <li class="page-item" :class="{'disabled':!has_next}">
        <a class="page-link" aria-label="Next"  @click.prevent="$emit('page', current_page + 1)">
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
