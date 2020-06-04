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
    className: {
      get () {
        return 'rubrics-' + this.currentPost.category_id
      },
      set (val) {
        this.className = val
      }
    },
    thumb () {
      return this.currentPost.thumb
    }
  },
  watch: {
    className (oldClassName, newClassName) {
      const bgGradient = background.gradients[this.currentPost.category_link]
      gsap.to(this.$refs.gradient, {
        background: bgGradient,
        duration: 0.6,
        ease: 'slow'
      })
    },
    thumb (oldThumb, newThumb) {
      if (this.currentPost.thumb === undefined) {
        return
      }
      if (newThumb !== false) {
        gsap.fromTo(this.$refs.thumb, { opacity: 0, duration: 0.0 }, { opacity: 1, duration: 0.4 })
      } else {
        gsap.to(this.$refs.thumb, { opacity: 1, duration: 0.4, delay: 0.2 })
      }
    }
  }
}
</script>
