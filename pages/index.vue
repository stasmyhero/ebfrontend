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
            <div slot="spinner">
              <div class="loading-triangle-wrapper">
                <div class="loading-triangle loading-triangle-left" />
                <div class="loading-triangle loading-triangle-right" />
              </div>
            </div>
          </infinite-loading>
        </template>
        <template v-if="!isLoadedOnce && isNeedToUpload">
          <transition name="fade">
            <LoadMore />
          </transition>
        </template>
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
          // this.$store.commit('header/isBurger', false)
          // this.$store.commit('header/isLogo', true)
          break
        case 'category' :
          this.$store.commit('header/setHeaderClass', 'header-inner-page header-category')
          if (window.scrollY > (document.querySelector('.clear-item-cont ').offsetHeight ?? 300)) {
            this.$store.commit('header/isBurger', true)
          } else {
            this.$store.commit('header/isBurger', false)
          }
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
    AttachedPosts,
    Telegram,
    Twitter,
    Adv
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
    // if (this.$store.getters['header/isMobile'] === true) { return }
    // window.addEventListener('scroll', () => {
    //   this.isScrolled = true
    // })
    // if (this.isScrolled) {
    //   if (window.scrollY > 300) {
    //     this.$store.commit('header/isBurger', true)
    //     this.$store.commit('header/isLogo', true)
    //   } else {
    //     this.$store.commit('header/isBurger', false)
    //     this.$store.commit('header/isLogo', true)
    //   }
    // }

    this.$root.$on('loadPosts', () => { this.isLoadedOnce = true })
  },
  methods: {
    infiniteHandler ($state) {
      if (this.isLoading === true) { return }
      this.isLoading = true
      const request = {
        endpoint: `${urls.restURL}/posts/${this.page}`,
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
  }
}
</script>
