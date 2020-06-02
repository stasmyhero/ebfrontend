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
      <div class="button-showmore-wrapper">
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
      </div>
    </template>
  </main>
</template>

<script>
import postsLoader from '@/components/mixins/PostsLoader'
import urls from '@/assets/js/url'
import og from '@/assets/js/og'
import Single from '@/components/Single'
import SingleArticle from '@/components/SingleArticle'
import LastPosts from '@/components/LastPosts.vue'
import LoadMore from '@/components/LoadMore.vue'

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
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-category')
          this.$store.commit('header/isBurger', false)
          this.$store.commit('header/isLogo', false)
          break
        case 'category-slug': case 'page-pageslug' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-single')
          this.$store.commit('header/isBurger', true)
          break
        default: break
      }
    }
  },
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
    console.log('mounted single')
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
  },
  head () {
    return {
      title: process.env.baseTitle + this.post.post_title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'ЭльбрусПресс - ' + this.post.post_title },
        { hid: 'twitter:title', name: 'twitter:title', content: 'ЭльбрусПресс - ' + this.post.post_title },
        { hid: 'og:description', name: 'og:description', content: this.post.subtitle || 'Новостной сайт ЭльбруссПресс' },
        { hid: 'og:url', name: 'og:url', content: urls.baseURL + this.$route.fullPath },
        { hid: 'twitter-description', name: 'twitter:description', content: this.post.subtitle || 'Новостной сайт ЭльбруссПресс' },
        { hid: 'twitter-image', name: 'twitter:image', content: this.post.thumb || '' },
        { hid: 'og-image', name: 'og:image', content: this.post.thumb || '' },
        ...og
      ]
    }
  }
}
</script>
