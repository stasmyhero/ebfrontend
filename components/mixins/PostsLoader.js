import urls from '@/assets/js/url'

export default {
  async load (config, $axios) {
    // if (this.isLoading || this.nothingToLoad) { return }
    // this.isLoading = true
    const request = {
      endpoint: `${urls.restURL}/${config.method}/${config.paged}`,
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json'
      }
    }
    try {
      const res = await $axios.get(request.endpoint, request.headers)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
}
