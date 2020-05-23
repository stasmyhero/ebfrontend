<template>
  <div class="last-news-grid">
    <h2 class="last-news-header">
      Последнее
    </h2>
    <Post
      v-for="mypost in posts"
      :key="mypost.ID"
      :post="mypost"
    />
  </div>
</template>

<script>
import Post from '@/components/Post.vue'

export default {
  name: 'LastPosts',
  components: {
    Post
  },
  props: {
    posts: Array
  }
}
</script>
