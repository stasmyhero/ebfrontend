<template>
  <main>
    <div class="news-body-cont">
      <div class="news-item-page-header-cont">
       <h1 class="news-item-page-header"> {{ pageTitle }} </h1>
      </div>
      <div class="news-item-text-wrapper" v-html="pageContent" />
    </div>
  </main>
</template>

<script>
import urls from '@/assets/js/url'

export default {
  transition: {
    name: 'fade',
    beforeLeave (el) {
      switch (this.$route.name) {
        case 'search': case 'search-s' :
          this.$store.commit('header/setHeaderClass', 'header-search-page header-search')
          break
        case 'index' :
          this.$store.commit('header/setHeaderClass', 'header-main-page header-index')
          this.$store.commit('header/isBurger', false)
          this.$store.commit('header/isLogo', true)
          break
        case 'category' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page')
          this.$store.commit('header/isBurger', false)
          this.$store.commit('header/isLogo', false)
          break
        case 'category-slug': case 'page-pageslug' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-single')
          this.$store.commit('header/isBurger', true)
          break
      }
    }
  },
  async asyncData ({ $axios, params, error }) {
    console.log(error)
    try {
      const res = await $axios.get(urls.apiBaseURL + 'wp-json/wp/v2/pages/?slug=' + params.pageslug, urls.restHeaders)
      if (res.data.length > 0 && res.status !== 200) {
        return {
          pageTitle: res.data[0].title.rendered,
          pageContent: res.data[0].content.rendered
        }
      } else {
        // eslint-disable-next-line no-throw-literal
        throw ({ statusCode: 404, message: 'Страница не найдена' })
      }
    } catch (e) {
      error(e)
    }
  }
}
</script>
