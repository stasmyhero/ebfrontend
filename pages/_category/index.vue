<template>
  <main>
    <div class="category-grid rubric-1">
      <div class="superheader">
        <template v-if="posts[0]">
          {{ posts[0].category }}
        </template>
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
    </div>
    <LoadMore />
  </main>
</template>

<script>
import postsLoader from '@/components/mixins/PostsLoader.js'
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
      category: params.category
    }, $axios)
    return res
  },
  data () {
    return {
      category: this.$route.params.category
    }
  }
}
</script>
