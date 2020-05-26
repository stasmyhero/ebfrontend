<template>
  <main>
    <SearchResults :results="posts" :count="resultsCount" />
  </main>
</template>

<script>
import searchParser from '../../assets/js/searchParser'
import urls from '@/assets/js/url'
import SearchResults from '@/components/search/Results'

export default {
  transition: 'fade',
  components: {
    SearchResults
  },
  async asyncData ({ $axios, route }) {
    const s = route.fullPath
    const request = {
      endpoint: `${urls.restURL}${s}`,
      headers: urls.restHeaders
    }
    try {
      const res = await $axios.get(request.endpoint)
      if (res.data.posts.length > 0) {
        return {
          posts: res.data.posts,
          needToLoad: res.data.allCount > res.data.posts.length
        }
      } else {
        return {
          posts: false,
          needToLoad: false
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  created () {
    this.$root.$on('goSearch', async (searchString) => {
      console.log(searchParser.sanitizeString(searchString))
      const parseResult = searchParser.parseString(searchString)
      if (parseResult !== false) {
        const s = parseResult.restString
        const request = {
          endpoint: `${urls.restURL}/search${s}`,
          headers: urls.restHeaders
        }
        try {
          const res = await this.$axios.get(request.endpoint, request.headers)
          if (res.data.posts.length > 0) {
            // this.$router.replace({ path: '/search/' + this.searchString })
            this.posts = res.data.posts
            this.needToLoad = res.data.allCount > res.data.posts.length
          } else {
            // this.$router.replace({ path: '/search/' + this.searchString })
            this.posts = false
            this.needToLoad = false
          }
        } catch (error) {
          console.log(error)
        }
      }
    })
  }
}
</script>
