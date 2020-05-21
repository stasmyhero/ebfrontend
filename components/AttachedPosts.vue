<template>
  <div class="attached-news-cont">
    <ul class="attached-news-list">
      <li v-for="(post, index) in posts" :key="post.id" class="attached-news-list-item-link-cont active" >
        <a class="attached-news-list-item-link" :href="post.permalink" @click.prevent="changeCurrentPost(index)">
          <span class="news-item-header">{{ post.title }}</span>
          <span class="news-item-subheader">{{ post.subtitle }}</span>
        </a>
      </li>
    </ul>
    <div class="attached-news-item-1">
      <a :href="currentPost.permalink">
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
      </a>
    </div>
  </div>
</template>

<script>
import postsMixin from '@/components/mixins/Posts'

export default {
  name: 'AttachedPosts',
  mixins: [
    postsMixin
  ],
  data () {
    return {
      currentPost: Object,
      attached: true
    }
  },
  async created () {
    await this.load()
    this.currentPost = this.posts[0]
  },
  methods: {
    changeCurrentPost (index) {
      this.currentPost = this.posts[index]
    }
  }
}
</script>
