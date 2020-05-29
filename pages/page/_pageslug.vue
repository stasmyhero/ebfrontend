<template>
  <main>
    <div class="page-title">
      {{ pageTitle }}
    </div>
    <div class="page-content" v-html="pageContent" />
  </main>
</template>

<script>
import urls from '@/assets/js/url'

export default {
  async asyncData ({ $axios, params, error }) {
    try {
      const res = await $axios.get(urls.restURL + '/pages/?slug=' + params.pageslug, urls.restHeaders)
      if (res.data.content) {
        return {
          pageTitle: res.data.title,
          pageContent: res.data.content
        }
      } else {
        // eslint-disable-next-line no-throw-literal
        throw ({ statusCode: 404, message: 'Страница не найдена' })
      }
    } catch (error) {
      error(error)
    }
  }
}
</script>
