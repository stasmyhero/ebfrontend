<template>
  <main>
    <div class="mainpage-grid">
      <div class="clear-item-cont on-desktop-and-tablet" />
      <AttachedPosts />
      <div class="social-item-wrapper telegram-item-wrapper">
        <a class="social-item telegram-item" href="#">
          <div class="telegram-item-bg" />
          <div class="telegram-item-logo" />
          <div class="social-item-account" />
          <div class="social-item-title">Наш канал<br>в&nbsp;<i>Телеграме</i></div>
        </a>
      </div>
      <div class="social-item-wrapper twitter-item-wrapper">
        <a class="social-item twitter-item" href="#">
          <div class="twitter-item-bg" />
          <div class="twitter-item-logo" />
          <div class="social-item-account" />
          <div class="social-item-title">Мы&nbsp;в<br><i>Твиттере</i></div>
        </a>
      </div>
      <div class="ad-item-wrapper mainpage-ad-grid-1">
        <div class="ad-item">
          <a class="ad-item-link" href="#"><img class="ad-item-img" src="/images/ad-banner-350x500-1.png"></a>
          <a class="link-to-ad-prices link-underline" href="#">Разместить рекламу</a>
        </div>
      </div>
      <div class="ad-item-wrapper mainpage-ad-grid-2">
        <div class="ad-item">
          <a class="ad-item-link" href="#"><img class="ad-item-img" src="/images/ad-banner-350x500-2.png"></a>
          <a class="link-to-ad-prices link-underline" href="#">Разместить рекламу</a>
        </div>
      </div>
      <Post
        v-for="mypost in posts"
        :key="mypost.id"
        :post="mypost"
      />
    </div>
    <LoadMore />
  </main>
</template>

<script>
import postsMixin from '@/components/mixins/Posts.js'
import LoadMore from '@/components/LoadMore.vue'
import Post from '@/components/Post.vue'
import AttachedPosts from '@/components/AttachedPosts.vue'

export default {
  components: {
    LoadMore,
    Post,
    AttachedPosts
  },
  mixins: [
    postsMixin
  ],
  data () {
    return {
      posts: [],
      paged: 1,
      perPage: 10,
      scrolled: 0,
      loadBorder: 99999,
      isLoading: false,
      attached: false
    }
  },
  created () {
    this.load()
  },
  mounted () {
    this.scrolled = localStorage.getItem('mainPageScrolled') || 1
    window.addEventListener('scroll', () => {
      this.scrolled = window.scrollY
      localStorage.setItem('mainPageScrolled', this.scrolled)
      // if (this.scrolled > this.loadBorder) {
      //   this.load()
      // }
      this.$root.$on('loadPosts', () => {
        this.load()
      })
    })
  }
}
</script>

<style></style>
