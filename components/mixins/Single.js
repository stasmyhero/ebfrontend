import axios from 'axios'
import urls from '@/assets/js/url'

export default {
  methods: {
    async loadPost (slug) {
      const request = {
        endpoint: `${urls.restURL}/single/${slug}`,
        headers: urls.restHeaders
      }
      try {
        const res = await axios.get(request.endpoint, request.headers)
        return res.data
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
}
