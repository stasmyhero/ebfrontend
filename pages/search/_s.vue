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
  data () {
    return {
      isLoading: false,
      page: 1,
      posts: [],
      isNeedToUpload: false,
      resultsCount: ''
    }
  },
  methods: {
    // infiniteHandler ($state) {
    //   if (this.isLoading) { return }
    //   this.isLoading = true
    //   const request = {
    //     endpoint: `${urls.restURL}${this.searchString}&page=${this.page}`,
    //     headers: urls.restHeaders
    //   }
    //   this.$axios.get(request.endpoint)
    //     .then((res) => {
    //       if (res.data.posts.length > 0) {
    //         this.page += 1
    //         this.posts.push(...res.data.posts)
    //         this.isNeedToUpload = res.data.allCount > res.data.posts.length
    //         this.resultsCount = res.data.resultsCount
    //         this.isLoading = false
    //         $state.loaded()
    //       } else {
    //         this.isLoading = true
    //         $state.complete()
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    async searchRequest (restString) {
    }
  }
}
</script>
