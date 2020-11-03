<template>
  <main>
    <div v-if="resultsCount !=='' " class="search-count">
      {{ resultsCount }}
    </div>
    <div v-else-if="resultsCount === false">
      Ничего не найдено
    </div>
    <div class="search-results-grid">
      <template v-if="posts">
        <Post
          v-for="mypost in posts"
          :key="mypost.ID"
          :post="mypost"
        />
      </template>
    </div>
    <infinite-loading
      v-if="isNeedToUpload"
      :distance="200"
      @infinite="infiniteHandler"
    >
      <div slot="no-more" />
      <div slot="spinner" />
    </infinite-loading>
    <LoadIndicator v-show="isLoading" />
  </main>
</template>

<script>
import urls from '@/assets/js/url'
import Post from '@/components/Post'
import LoadIndicator from '@/components/LoadIndicator'

export default {
  name: 'SearchPage',
  transition: {
    name: 'fade',
    beforeLeave (el) {
      if (this.isMobile) { return }
      switch (this.$route.name) {
        case 'index' :
          this.$store.commit('header/setHeaderClass', 'header-main-page header-index')
          this.$store.commit('header/isBurger', false)
          this.$store.commit('header/isLogo', true)
          this.$store.commit('header/isShowMenu', true)
          break
        case 'category' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-category')
          this.$store.commit('header/isBurger', false)
          this.$store.commit('header/isLogo', false)
          this.$store.commit('header/isShowMenu', true)
          break
        case 'category-slug': case 'page-slug' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-single')
          this.$store.commit('header/isBurger', true)
          this.$store.commit('header/isLogo', false)
          this.$store.commit('header/isShowMenu', false)
          break
      }
    }
  },
  components: {
    Post,
    LoadIndicator
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
  mounted () {
    this.$root.$on('goSearch', (restString) => {
      if (this.isLoading === false) {
        this.isLoading = true
        this.searchRequest(restString)
      }
    })
    if (this.$route.name === 'search-s') {
      if (this.$route.query.s !== '' && this.$route.query.s !== undefined) {
        this.$root.$emit('parseURL', this.$route.query.s)
      }
    }
    document.querySelector('.search-input').focus()
  },
  methods: {
    infiniteHandler ($state) {
      if (this.isLoading) { return }
      if (this.isNeedToUpload === false) { return }
      this.isLoading = true
      const request = {
        endpoint: `${urls.restURL}/search${this.restString}&page=${this.page}`,
        headers: urls.restHeaders
      }
      this.$axios.get(request.endpoint)
        .then((res) => {
          if (res.data.posts.length > 0) {
            this.page += 1
            this.posts.push(...res.data.posts)
            this.isNeedToUpload = res.data.allCount > res.data.posts.length
            // this.resultsCount = res.data.resultsCount
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
        return
      }
      this.page = 1
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
        } else {
          this.posts = false
          this.isNeedToUpload = false
          this.resultsCount = ''
          this.isLoading = false
        }
        this.restString = restString
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
  .search-count {
    padding: 16rem 6.8rem 0 2.6rem;
    font-family: var(--font-arnold);
    font-style: italic;
    font-size: 7.2rem;
    text-align: center;
  }

</style>
