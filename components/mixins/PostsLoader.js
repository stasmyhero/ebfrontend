import urls from '@/assets/js/url'

export default {
  async load (config, $axios, error) {
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
      if (res.status !== 200 || res.data.posts.length === 0) {
        // eslint-disable-next-line no-throw-literal
        throw ({ statusCode: 404, message: 'Страница не найдена' })
      }
      if (res.data.posts.length === 0) {
        // eslint-disable-next-line no-throw-literal
        throw ({ statusCode: 404, message: 'Страница не найдена' })
      }
      return res.data
    } catch (e) {
      error(e)
    }
  }
}
