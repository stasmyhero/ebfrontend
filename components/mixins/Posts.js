import axios from 'axios'
import urls from '@/assets/js/url'

export default {
  data () {
    return {
      posts: Array,
      paged: 1
    }
  },
  methods: {
    async load () {
      const method = this.attached ? 'attached' : 'posts'
      const request = {
        endpoint: `${urls.restURL}/${method}/${this.paged}`,
        headers: {
          ContentType: 'application/json',
          Accept: 'application/json'
        }
      }
      try {
        const res = await axios.get(request.endpoint, request.headers)
        this.posts = res.data
        this.paged += 1
      } catch (error) {
        console.log(error)
      }
    }
  }
}
