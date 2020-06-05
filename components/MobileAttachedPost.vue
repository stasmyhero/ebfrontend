<template>
  <div class="attached-news-item" :class="'rubric-'+ currentPost.category_id">
    <div class="attached-news-item-wrapper">
      <nuxt-link :to="`/${currentPost.category_link}/${currentPost.slug}`" class="attached-news-item-info-link">
        <div class="rubric-title-wrapper">
          <span class="rubric-title">{{ currentPost.category }}</span>
        </div>
        <div class="attached-news-item-header-and-date-wrapper">
          <div class="news-item-header-cont">
            <span class="news-item-header">{{ currentPost.title }}</span>
            <span class="news-item-subheader">{{ currentPost.subtitle }}</span>
          </div>
          <div class="publication-date">
            {{ currentPost.date }}
          </div>
        </div>
      </nuxt-link>
      <div class="attached-news-item-bg-container">
        <div ref="thumb" class="attached-news-item-img-cont">
          <img v-if="currentPost.thumb" :src="currentPost.thumb">
        </div>
        <div ref="gradient" class="attached-news-item-gradient-cont" :css="false" />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import background from '@/assets/js/backgrounds'

export default {
  name: 'CurrentAttachedPost',
  props: {
    currentPost: {
      type: [Object, Boolean, Function],
      default: false,
      required: true
    }
  },
  data () {
    return {
      timeline: gsap.timeline(),
      initThumb: this.currentPost.thumb
    }
  },
  computed: {
    gradient () {
      return background.mobileGradients[this.currentPost.category_link]
    }
  }
}
</script>
