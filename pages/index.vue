<template>
  <main>
    <div class="mainpage-grid">
      <div class="clear-item-cont on-desktop-and-tablet" />
      <AttachedPosts :posts="attachedPosts" />
      <Telegram :link="socials.telegram" />
      <Twitter :link="socials.twitter" />
      <Adv :pos="1" class="ad-item-wrapper mainpage-ad-grid-1" />
      <Adv :pos="2" class="ad-item-wrapper mainpage-ad-grid-2" />
      <Post
        v-for="mypost in posts"
        :key="mypost.id"
        :post="mypost"
      />
    </div>
    <template v-if="isNeedToUpload">
      <div class="button-showmore-wrapper">
        <template v-if="isLoadedOnce">
          <infinite-loading
            :distance="200"
            @infinite="infiniteHandler"
          >
            <div slot="no-more" />
            <div slot="spinner" />
          </infinite-loading>
        </template>
        <template v-if="!isLoadedOnce && isNeedToUpload">
          <transition name="fade">
            <LoadMore />
          </transition>
        </template>
      </div>
      <div v-show="isLoading">
        <LoadIndicator />
      </div>
    </template>
  </main>
</template>

<script>
import urls from '@/assets/js/url'
import postsLoader from '@/components/mixins/PostsLoader.js'
import LoadMore from '@/components/LoadMore.vue'
import Post from '@/components/Post.vue'
import AttachedPosts from '@/components/AttachedPosts.vue'
import Telegram from '@/components/Telegram.vue'
import Twitter from '@/components/Twitter.vue'
import Adv from '@/components/Adv.vue'
import LoadIndicator from '@/components/LoadIndicator.vue'

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
          this.$root.$emit('openMenuPage')
          break
        case 'category' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-category')
          this.$store.commit('header/isLogo', false)
          break
        case 'category-slug': case 'page-pageslug' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-single')
          this.$store.commit('header/isLogo', false)
          this.$root.$emit('closeMenuPage')
          break
      }
    }
  },
  components: {
    LoadMore,
    Post,
    AttachedPosts,
    Telegram,
    Twitter,
    Adv,
    LoadIndicator
  },
  async asyncData ({ $axios }) {
    const res = await postsLoader.load({
      paged: 1,
      perPage: 20,
      attached: false,
      method: 'posts'
    }, $axios)
    const attached = await postsLoader.load({
      paged: 1,
      perPage: 10,
      attached: true,
      method: 'attached'
    }, $axios)
    return {
      posts: res.posts,
      allCount: res.allCount,
      loadedPosts: 10,
      attachedPosts: attached.posts,
      isNeedToUpload: (res.allCount > res.posts.length)
    }
  },
  data () {
    return {
      page: 2,
      isLoadedOnce: false,
      isLoading: false,
      socials: urls.socials,
      isScrolled: false
    }
  },

  mounted () {
    this.$root.$on('loadPosts', () => { this.isLoadedOnce = true })
    window.setTimeout(() => {
      if (this.$store.getters['header/isMobile']) { return }
      if (window.scrollY < 20) {
        this.$root.$emit('openMenuScroll')
      }
    }, 50)
  },
  methods: {
    infiniteHandler ($state) {
      if (this.isLoading === true) { return }
      this.isLoading = true
      const request = {
        endpoint: `${urls.restURL}/posts/${this.page}`,
        headers: urls.restHeaders
      }
      window.setTimeout(() => {
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
      }, 800)
    }
  }
}
</script>
