<template>
  <main>
    <div class="category-grid" :class="'rubric-'+ categoryID">
      <div class="superheader">
        <div class="superheader-inner">
          <nobr class="superheader-inner-nobr">
            <template v-if="posts">
              {{ posts[0].category }}
            </template>
          </nobr>
        </div>
      </div>
      <div class="clear-item-cont on-desktop-and-tablet" />
      <Adv :pos="3" class="ad-item-wrapper mainpage-ad-grid-1" />
      <Adv :pos="4" class="ad-item-wrapper mainpage-ad-grid-2" />
      <Post
        v-for="mypost in posts"
        :key="mypost.id"
        :post="mypost"
      />
    </div>
    <div class="button-showmore-wrapper">
      <template v-if="isNeedToUpload">
        <template v-if="isLoadedOnce">
          <infinite-loading
            spinner="spiral"
            :distance="250"
            @infinite="infiniteHandler"
          >
            <div slot="no-more" />
          </infinite-loading>
        </template>
      </template>
      <template v-if="!isLoadedOnce && isNeedToUpload">
        <transition name="fade">
          <LoadMore />
        </transition>
      </template>
    </div>
  </main>
</template>

<script>
import postsLoader from '@/components/mixins/PostsLoader.js'
import urls from '@/assets/js/url'
import og from '@/assets/js/og'
import Post from '@/components/Post'
import Adv from '@/components/Adv'
import LoadMore from '@/components/LoadMore'

export default {
  transition: {
    name: 'fade',
    beforeLeave (el) {
      if (this.$store.getters['header/isMobile'] === true) { return }
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
          // if (window.scrollY > (document.querySelector('.clear-item-cont ').offsetHeight ?? 300)) {
          //   this.$store.commit('header/isBurger', true)
          // } else {
          //   this.$store.commit('header/isBurger', false)
          // }
          this.$store.commit('header/isLogo', false)
          break
        case 'category-slug': case 'page-pageslug' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-single')
          this.$store.commit('header/isBurger', true)
          this.$store.commit('header/isLogo', false)
          break
      }
    }
  },
  components: {
    LoadMore,
    Post,
    Adv
  },
  async asyncData ({ params, $axios, error }) {
    let data = []
    try {
      data = await postsLoader.load({
        paged: 1,
        perPage: 10,
        category: params.category,
        method: `category/${params.category}`
      }, $axios, error)
      // eslint-disable-next-line no-throw-literal
      if (data === undefined) { throw ({ statusCode: 404, message: 'Страница не найдена' }) }
      return {
        posts: data.posts,
        isNeedToUpload: data.allCount > data.posts.length,
        categoryID: data.posts[0].category_id,
        categoryName: data.posts[0].category,
        categoryDescription: data.categoryDescr
      }
    } catch (e) {
      error(e)
    }
  },
  data () {
    return {
      category: this.$route.params.category,
      isLoadedOnce: false,
      page: 2,
      isLoading: false
    }
  },
  mounted () {
    this.$root.$on('loadPosts', () => { this.isLoadedOnce = true })
  },
  methods: {
    infiniteHandler ($state) {
      if (this.isLoading === true) { return }
      this.isLoading = true
      const request = {
        endpoint: `${urls.restURL}/category/${this.$route.params.category}/${this.page}`,
        headers: urls.restHeaders
      }
      this.$axios.get(request.endpoint)
        .then((res) => {
          if (res.data.posts.length > 0) {
            this.page += 1
            this.posts.push(...res.data.posts)
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
    const meta = [
      { hid: 'og:title', name: 'og:title', content: 'ЭльбрусПресс - ' + this.categoryName },
      { hid: 'og:description', name: 'og:description', content: 'Рубрика ' + this.categoryDescription },
      { hid: 'og:url', name: 'og:url', content: urls.baseURL + this.$route.fullPath },
      { hid: 'twitter-description', name: 'twitter:description', content: this.categoryDescription },
      { hid: 'twitter-image', name: 'twitter:image', content: '' },
      { hid: 'og-image', name: 'og:image', content: '' },
      { hid: 'description', name: 'description', content: this.categoryDescription }
    ]
    meta.push(...og)
    return {
      title: process.env.baseTitle + this.categoryName,
      meta
    }
  }
}
</script>
