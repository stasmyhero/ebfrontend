<template>
  <main>
    <template v-if="$route.params.category === 'news'">
      <Single :slug="$route.params.slug" :post="post" />
    </template>
    <template v-else-if="$route.params.category">
      <SingleArticle :slug="$route.params.slug" :post="post" />
    </template>
    <LastPosts :posts="lastPosts" />
    <template v-if="isNeedToUpload">
      <transition name="fade">
        <template v-if="isLoadedOnce">
          <infinite-loading
            spinner="spiral"
            distance="300"
            @infinite="infiniteHandler"
          >
            <div slot="no-more" />
          </infinite-loading>
        </template>
        <template v-else>
          <LoadMore />
        </template>
      </transition>
    </template>
  </main>
</template>

<script>
import postsLoader from '@/components/mixins/PostsLoader'
import urls from '@/assets/js/url'
import Single from '@/components/Single'
import SingleArticle from '@/components/SingleArticle'
import LastPosts from '@/components/LastPosts.vue'
import LoadMore from '@/components/LoadMore.vue'

export default {
  transition: 'fade',
  components: {
    Single,
    SingleArticle,
    LastPosts,
    LoadMore
  },
  async asyncData ({ $axios, params, error }) {
    const request = {
      endpoint: `${urls.restURL}/single/${params.slug}`,
      headers: urls.restHeaders
    }
    try {
      const res = await $axios.get(request.endpoint)
      if (res.data.day === false) {
        // eslint-disable-next-line no-throw-literal
        throw ({ statusCode: 404, message: 'Страница не найдена' })
      }
      const last = await postsLoader.load({
        paged: 1,
        perPage: 10,
        method: 'last'
      }, $axios)
      return {
        post: res.data,
        lastPosts: last.posts
      }
    } catch (e) {
      error(e)
    }
  },
  data () {
    return {
      page: 2,
      lastPosts: [],
      isLoadedOnce: false,
      isNeedToUpload: true,
      isLoading: false
    }
  },
  mounted () {
    this.$root.$on('loadPosts', () => { this.isLoadedOnce = true })
  },
  methods: {
    infiniteHandler ($state) {
      if (this.isLoading === true || this.isLoadedOnce === false) { return }
      this.isLoading = true
      const request = {
        endpoint: `${urls.restURL}/last/${this.page}`,
        headers: urls.restHeaders
      }
      this.$axios.get(request.endpoint)
        .then((res) => {
          if (res.data.posts.length > 0) {
            this.page += 1
            this.lastPosts.push(...res.data.posts)
            $state.loaded()
          } else {
            $state.complete()
          }
          this.isLoading = false
        })
        .catch((error) => { console.log(error) })
    }
  }
}
</script>
