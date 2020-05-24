<template>
  <div class="search-results-grid">
    <Post
      v-for="mypost in posts"
      :key="mypost.id"
      :post="mypost"
    />
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
    posts: {
      type: [Array],
      default: () => { return [] }
    }
  }
}
</script>
