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
    <div :class="'attached-news-item-' + currentPost.category_id">
      <nuxt-link :to="`/${currentPost.category_link}/${currentPost.slug}`">
        <div class="attached-news-item-info-wraper">
          <div class="rubric-title-wrapper">
            <span class="rubric-title">{{ currentPost.category }}</span>
          </div>
          <div class="attached-news-item-header-and-date-wrapper">
            <div class="news-item-header-cont">
              <span class="news-item-header">{{ currentPost.title }}</span>
              <span class="news-item-subheader">{{ currentPost.subtitle }}</span>
            </div>
            <div class="publication-date">{{ currentPost.date }}</div>
          </div>
        </div>
        <div class="attached-news-item-bg-container">
          <div v-if="currentPost.thumb" class="attached-news-item-img-cont">
            <img :src="currentPost.thumb">
          </div>
          <div class="attached-news-item-gradient-cont" />
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import urls from '@/assets/js/url.js'

export default {
  name: 'AttachedPosts',
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
      console.log('a')
    }
  }
}
</script>
