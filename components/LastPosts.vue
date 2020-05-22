<template>
  <div class="last-news-grid">
    <h2 class="last-news-header">Последнее</h2>
    <Post
      v-for="mypost in posts"
      :key="mypost.ID"
      :post="mypost"
    />
  </div>
</template>

<script>
import postMixin from '@/components/mixins/Posts.js'
import Post from '@/components/Post.vue'

export default {
  name: 'LastPosts',
  mixins: [
    postMixin
  ],
  components: {
    Post
  },
  props: {
    filter: String
  },
  data () {
    return {
      attached: false,
      perPage: 10,
      loadBorder: 99999,
      isLoading: false
    }
  },
  created () {
    this.load()
  },
  mounted () {
    this.$root.$on('loadPosts', () => { this.load() })
  }

}
</script>
