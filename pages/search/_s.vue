<template>
  <main>
    <div class="search-results-grid">
      <div v-if="resultsCount !=='' " class="search-count">
        Найдено {{ resultsCount }}
      </div>
      <div v-else-if="resultsCount === false">
        Ничего не найдено
      </div>
      <template v-if="posts">
        <Post
          v-for="mypost in posts"
          :key="mypost.ID"
          :post="mypost"
        />
      </template>
    </div>
  </main>
</template>

<script>
import urls from '@/assets/js/url'
import Post from '@/components/Post'

export default {
  name: 'SearchPage',
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
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-category')
          this.$store.commit('header/isBurger', false)
          this.$store.commit('header/isLogo', false)
          break
        case 'category-slug': case 'page-slug' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-single')
          this.$store.commit('header/isBurger', true)
          break
      }
    }
  },
  components: {
    Post
  },
  async asyncData ({ $axios, route, error }) {
    // if (route.params.s === undefined || route.params.s === '') {
    //   return {
    //     posts: null,
    //     isNeedToUpload: false,
    //     resultsCount: ''
    //   }
    // }
    // const s = route.fullPath
    // const request = {
    //   endpoint: `${urls.restURL}${s}`,
    //   headers: urls.restHeaders
    // }
    // try {
    //   const res = await $axios.get(request.endpoint)
    //   if (res.data.posts.length > 0) {
    //     return {
    //       posts: res.data.posts,
    //       isNeedToUpload: res.data.allCount > res.data.posts.length,
    //       resultsCount: res.data.resultsCount
    //     }
    //   } else {
    //     return {
    //       posts: false,
    //       isNeedToUpload: false,
    //       resultsCount: ''
    //     }
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  },
  data () {
    return {
      isLoading: false,
      page: 1,
      posts: [],
      isNeedToUpload: false,
      resultsCount: ''
    }
  },
  computed: {
    searchString () {
      return this.$route.fullPath
    }
  },
  created () {
    if ((!this.$route.query.w && !this.$route.query.t && !this.$route.query.a) && this.$route.params.s === 's') {
      // this.error({ statusCode: 404, message: 'Страница не найдена' })
    }
  },
  mounted () {
    this.$root.$on('goSearch', (restString) => { this.searchRequest(restString) })
    // if (this.$route.params.s === undefined || this.$route.params.s === '' && !this.$route.query) {
    //     this.posts = false
    //     this.isNeedToUpload = false
    //     this.resultsCount = ''
    // }
    // const s = this.$route.fullPath
    // const request = {
    //   endpoint: `${urls.restURL}${s}`,
    //   headers: urls.restHeaders
    // }
    // try {
    //   const res = await this.$axios.get(request.endpoint)
    //   if (res.data.posts.length > 0) {
    //       this.posts = res.data.posts
    //       this.isNeedToUpload = res.data.allCount > res.data.posts.length
    //       this.resultsCount = res.data.resultsCount
    //     }
    //    else {
    //     this.posts = res.data.posts
    //     this.isNeedToUpload = res.data.allCount > res.data.posts.length
    //     this.resultsCount = res.data.resultsCount
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  },
  methods: {
    infiniteHandler ($state) {
      if (this.isLoading) { return }
      this.isLoading = true
      const request = {
        endpoint: `${urls.restURL}${this.searchString}&page=${this.page}`,
        headers: urls.restHeaders
      }
      this.$axios.get(request.endpoint)
        .then((res) => {
          if (res.data.posts.length > 0) {
            this.page += 1
            this.posts.push(...res.data.posts)
            this.isNeedToUpload = res.data.allCount > res.data.posts.length
            this.resultsCount = res.data.resultsCount
            this.isLoading = false
            $state.loaded()
          } else {
            this.isLoading = true
            $state.complete()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async searchRequest (restString) {
      if (restString === '' || restString === '/s?') {
        this.isNeedToUpload = false
        this.resultsCount = ''
        this.posts = []
        this.isLoading = false
        if (this.$route.path !== '/search') { this.$router.replace({ path: '/search' }) }
        return
      }
      this.page = 1
      if (this.isLoading === true) { return }
      this.isLoading = true
      const request = {
        endpoint: `${urls.restURL}/search${restString}&page=${this.page}`,
        headers: urls.restHeaders
      }
      try {
        const res = await this.$axios.get(request.endpoint)
        if (res.data.posts.length > 0) {
          this.posts = res.data.posts
          this.isNeedToUpload = res.data.allCount > res.data.posts.length
          this.resultsCount = res.data.resultsCount
          this.page += 1
          this.isLoading = false
          if (this.$route.path !== '/search' + restString) { this.$router.replace({ path: '/search' + restString }) }
        } else {
          this.posts = false
          this.isNeedToUpload = false
          this.resultsCount = ''
          this.isLoading = false
          if (this.$route.path !== '/search' + restString) { this.$router.replace({ path: '/search' + restString }) }
        }
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
