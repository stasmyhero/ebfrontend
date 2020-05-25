<template>
  <div class="search-results-grid">
    <div v-if=" count !='' " class="search-count">
      Найдено {{ count }}
    </div>
    <template v-if="results">
      <Post
        v-for="mypost in results"
        :key="mypost.id"
        :post="mypost"
      />
    </template>
    <template v-else>
      <div class="search-no-results">
        Ничего не найдено
      </div>
    </template>
  </div>
</template>

<script>
import Post from '@/components/Post.vue'

export default {
  name: 'SearchResults',
  components: {
    Post
  },
  props: {
    results: {
      type: [Array, Boolean],
      default: () => { return [] }
    },
    count: {
      type: String,
      default: () => { return '' }
    }
  }
}
</script>
