<template>
  <div class="attached-news-cont">
    <ul class="attached-news-list">
      <li
        v-for="(post, index) in posts"
        :key="post.id"
        class="attached-news-list-item-link-cont"
        :class="{ 'active': currentPost.id === post.id }"
        @mouseover.prevent="changeCurrentPost(index)"
      >
        <nuxt-link class="attached-news-list-item-link" :to="`/${post.category_link}/${post.slug}`">
          <span class="news-item-header">{{ post.title }}</span>
          <span class="news-item-subheader">{{ post.subtitle }}</span>
        </nuxt-link>
      </li>
    </ul>
    <CurrentAttachedPost :currentPost="currentPost" />
  </div>
</template>

<script>
import urls from '@/assets/js/url.js'
import CurrentAttachedPost from '@/components/CurrentAttachedPost'

export default {
  name: 'AttachedPosts',
  components: {
    CurrentAttachedPost
  },
  props: {
    posts: Array
  },
  data () {
    return {
      currentPost: Object,
      attached: true,
      socialURL: urls.social
    }
  },
  mounted () {
    this.currentPost = this.posts[0]
  },
  methods: {
    changeCurrentPost (index) {
      this.currentPost = this.posts[index]
    }
  }
}
</script>
