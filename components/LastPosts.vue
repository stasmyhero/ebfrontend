<template>
  <div>
    <Post
      v-for="mypost in posts"
      :key="mypost.ID"
      :post="mypost"
    />
  </div>
</template>

<script>
import axios from 'axios'
import urls from '@/assets/js/url.js'
import Post from '@/components/Post.vue'

export default {
  name: 'Posts',
  components: {
    Post
  },
  props: {
    filter: String
  },
  data () {
    return {
      posts: [],
      paged: 2,
      perPage: 10,
      scrolled: 0,
      loadBorder: 99999,
      isLoading: false,
      request: {
        endpoint: `${urls.restURL}/upload/`,
        headers: {
          ContentType: 'application/json',
          Accept: 'application/json'
        }
      }
    }
  },
  mounted () {
    this.scrolled = localStorage.getItem('mainPageScrolled') ? localStorage.getItem('mainPageScrolled') : 0
    window.scrollY = this.scrolled
    this.$root.$on('loadPosts', () => { this.load() })
    window.addEventListener('scroll', () => {
      console.log('scroll')
      this.scrolled = window.scrollY
      localStorage.setItem('mainPageScrolled', this.scrolled)
      if (this.scrolled > this.loadBorder) {
        this.load()
      }
    })
  },
  methods: {
    load () {
      if (this.isLoading === true) { return }
      this.isLoading = true
      this.$root.$emit('isLoading')
      this.isLoadBlocked = true
      axios
        .get(this.request.endpoint + this.paged, this.request.headers)
        .then((response) => {
          if (response.data.length > 0) {
            this.posts = response.data
            this.paged += 1
            this.isLoading = false
            this.$root.$emit('loadingOver')
          } else {
            this.$root.$emit('nothingToLoad')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
