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
              @infinite="infiniteHandler"
            >
              <div slot="no-more" />
              <div slot="spinner" />
            </infinite-loading>
          </template>
          <template v-else>
            <LoadMore />
          </template>
        </transition>
      </div>
    </template>
    <LoadIndicator v-show="isLoading" />
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
import LoadIndicator from '@/components/LoadIndicator.vue'

export default {
  transition: {
    name: 'fade',
    beforeLeave (el) {
      if (this.$store.getters['header/isMobile'] === true) {
        this.$root.$emit('closeMenuPage')
        return
      }
      switch (this.$route.name) {
        case 'search': case 'search-s' :
          this.$store.commit('header/setHeaderClass', 'header-search-page header-search')
          break
        case 'index' :
          this.$store.commit('header/setHeaderClass', 'header-main-page header-index')
          this.$store.commit('header/isLogo', true)
          break
        case 'category' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-category')
          this.$store.commit('header/isLogo', false)
          this.$store.commit('header/isBurger', false)

          break
        case 'category-slug': case 'page-slug' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-single')
          this.$store.commit('header/isLogo', false)
          this.$root.$emit('closeMenuPage')
          break
        default: break
      }
    }
  },
  components: {
    Single,
    SingleArticle,
    LastPosts,
    LoadMore,
    LoadIndicator
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
      isLoading: false,
      loadPostview: false
    }
  },
  mounted () {
    this.$root.$on('loadPosts', () => { this.isLoadedOnce = true })
    if (!localStorage.getItem(this.post.ID) && !this.loadPostview) {
      this.loadPostview = true
      const url = urls.restURL + '/postview/' + this.post.ID
      this.$axios.post(url)
        .then((res) => {
          this.loadPostview = false
          localStorage.setItem(this.post.ID, 'true')
        })
    }
  },
  methods: {
    infiniteHandler ($state) {
      if (this.isLoading === true || this.isLoadedOnce === false) { return }
      this.isLoading = true
      const request = {
        endpoint: `${urls.restURL}/last/${this.page}`,
        headers: urls.restHeaders
      }
      window.setTimeout(() => {
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
      }, 800)
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
