<template>
  <main>
    <div class="search-results-grid">
      <div v-if=" resultsCount !=='' " class="search-count">
        Найдено {{ resultsCount }}
      </div>
      <template v-if="posts">
        <Post
          v-for="mypost in posts"
          :key="mypost.id"
          :post="mypost"
        />
      </template>
      <template v-else>
        <div class="search-no-results">
          Ничего не найдено
        </div>
      </template>
    </div>
    <template v-if="isNeedToUpload">
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteHandler"
      >
        <div slot="no-more" />
      </infinite-loading>
    </template>
  </main>
</template>

<script>
import urls from '@/assets/js/url'
import Post from '@/components/Post'

export default {
  name: 'SearchPage',
  transition: 'fade',
  components: {
    Post
  },
  async asyncData ({ $axios, route }) {
    if (route.params.s === undefined || route.params.s === '') {
      return {
        posts: null,
        isNeedToUpload: false,
        resultsCount: ''
      }
    }
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
          isNeedToUpload: res.data.allCount > res.data.posts.length,
          resultsCount: res.data.resultsCount
        }
      } else {
        return {
          posts: false,
          isNeedToUpload: false,
          resultsCount: ''
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      isLoading: false,
      page: 1
    }
  },
  computed: {
    searchString () {
      return this.$route.fullPath
    }
  },
  watch: {
    async searchString (old, newS) {
      this.page = 1
      if (this.isLoading === true) { return }
      this.isLoading = true
      const request = {
        endpoint: `${urls.restURL}${newS}&page=${this.page}`,
        headers: urls.restHeaders
      }
      try {
        const res = await this.$axios.get(request.endpoint)
        if (res.data.posts.length > 0) {
          this.posts = res.data.posts
          this.isNeedToUpload = res.data.allCount > res.data.posts.length
          this.resultsCount = res.data.resultsCount
        } else {
          this.posts = false
          this.isNeedToUpload = false
        }
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    }
  },
  methods: {
    infiniteHandler () {
      const request = {
        endpoint: `${urls.restURL}${this.searchString}&page=${this.page}`,
        headers: urls.restHeaders
      }
      this.$axios.get(request.endpoint)
        .then((res) => {
          this.posts = res.data.posts
          this.isNeedToUpload = res.data.allCount > res.data.posts.length
          this.resultsCount = res.data.resultsCount
          this.page += 1
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
