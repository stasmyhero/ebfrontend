<template>
  <main>
    <div class="mainpage-grid">
      <div class="clear-item-cont on-desktop-and-tablet" />
      <AttachedPosts :posts="attachedPosts" />
      <Telegram :link="socials.telegram" />
      <Twitter :link="socials.twitter" />
      <Adv pos="1" img="/images/ad-banner-350x500-1.png" link="#" />
      <Adv pos="2" img="/images/ad-banner-350x500-2.png" link="#" />
      <Post
        v-for="mypost in posts"
        :key="mypost.id"
        :post="mypost"
      />
      <template v-if="isNeedToUpload">
        <template v-if="isLoadedOnce">
          <infinite-loading
            spinner="spiral"
            :distance="200"
            @infinite="infiniteHandler"
          >
            <div slot="no-more" />
          </infinite-loading>
        </template>
      </template>
    </div>
    <template v-if="!isLoadedOnce && isNeedToUpload">
      <transition name="fade">
        <LoadMore />
      </transition>
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
  transition: 'fade',
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
      socials: urls.socials
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
