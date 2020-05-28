<template>
  <main>
    <div class="category-grid" :class="'rubric-'+ categoryID">
      <div class="superheader">
        <div class="superheader-inner">
          <nobr class="superheader-inner-nobr">
            <template v-if="posts">{{ posts[0].category }}</template>
          </nobr>
        </div>
      </div>
      <div class="clear-item-cont on-desktop-and-tablet" />
      <div class="ad-item-wrapper category-ad-grid-1">
        <div class="ad-item">
          <a class="ad-item-link" href="#"><img class="ad-item-img" src="/images/ad-banner-350x500-1.png"></a>
          <a class="link-to-ad-prices link-underline" href="#">Разместить рекламу</a>
        </div>
      </div>
      <div class="ad-item-wrapper category-ad-grid-2">
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
    </div>
    <template v-if="!isLoadedOnce && isNeedToUpload">
      <transition name="fade">
        <LoadMore />
      </transition>
    </template>
  </main>
</template>

<script>
import postsLoader from '@/components/mixins/PostsLoader.js'
import urls from '@/assets/js/url'
import Post from '@/components/Post'
import LoadMore from '@/components/LoadMore'

export default {
  transition: 'fade',
  components: {
    LoadMore,
    Post
  },
  async asyncData ({ params, $axios }) {
    const res = await postsLoader.load({
      paged: 1,
      perPage: 10,
      category: params.category,
      method: `category/${params.category}`
    }, $axios)
    return {
      posts: res.posts,
      categoryID: res.posts[0].category_id,
      isNeedToUpload: res.allCount > res.posts.length
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
  }
}
</script>
