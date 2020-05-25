<template>
  <main>
    <SearchResults :results="posts" :count="resultsCount" />
    <div>KEKW</div>
  </main>
</template>

<script>
import urls from '@/assets/js/url'
import SearchResults from '@/components/search/Results'

export default {
  layout: 'default',
  components: {
    SearchResults
  },
  async fetch () {
    // const s = this.$route.fullPath
    // if (s.trim() !== '') {
    //   const request = {
    //     endpoint: `${urls.restURL}${s}`,
    //     headers: urls.restHeaders
    //   }
    //   try {
    //     const res = await this.$axios.get(request.endpoint, request.headers)
    //     console.log(request.endpoint)
    //     if (res.data.posts.length > 0) {
    //       this.posts = res.data.posts
    //       this.needToLoad = res.data.allCount > res.data.posts
    //       this.resultsCount = res.data.resultsCount
    //     } else {
    //       this.posts = false
    //       this.needToLoad = false
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  },
  async asyncData ({ $axios, route }) {
    console.log(route)
    const s = route.fullPath
    const request = {
      endpoint: `${urls.restURL}${s}`,
      headers: urls.restHeaders
    }
    console.log(request.endpoint)

    try {
      const res = await $axios.get(request.endpoint, request.headers)
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
  data () {
    return {
      posts: [],
      needToLoad: false,
      resultsCount: ''
    }
  }
}
</script>
