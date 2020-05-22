import urls from '@/assets/js/url'

export default {
  async load (config, $axios) {
    // if (this.isLoading || this.nothingToLoad) { return }
    // this.isLoading = true
    let method = 'posts'
    if (config.category !== undefined) {
      method = `category/${config.category}`
    } else {
      method = config.attached ? 'attached' : 'posts'
    }
    const request = {
      endpoint: `${urls.restURL}/${method}/${config.paged}`,
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
