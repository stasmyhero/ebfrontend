import axios from 'axios'
import urls from '@/assets/js/url'

export default {
  data () {
    return {
      posts: [],
      paged: 1,
      isLoading: false,
      loadedPostCount: 0,
      allCount: 0,
      nothingToLoad: false
    }
  },
  methods: {
    async load () {
      if (this.isLoading || this.nothingToLoad) { return }
      this.isLoading = true
      let method = 'posts'
      if (this.category !== undefined) {
        method = `category/${this.category}`
      } else {
        method = this.attached ? 'attached' : 'posts'
      }
      const request = {
        endpoint: `${urls.restURL}/${method}/${this.paged}`,
        headers: {
          ContentType: 'application/json',
          Accept: 'application/json'
        }
      }
      console.log(request.endpoint)
      try {
        const res = await axios.get(request.endpoint, request.headers)
        this.posts = this.posts.concat(res.data.posts)
        this.allCount = res.data.allCount
        this.loadedPostCount = this.loadedPostCount + res.data.postCount
        this.paged += 1
        this.isLoading = false
        if (this.allCount === this.loadedPostCount) {
          this.nothingToLoad = true
          this.$root.$emit('nothingToLoad')
        }
        if (this.paged > 2) { this.$root.$emit('loadingOver') }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
