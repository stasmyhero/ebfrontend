<template>
  <div class="attached-news-item">
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
          <img v-if="initThumb" :src="initThumb">
        </div>
        <div ref="gradient" class="attached-news-item-gradient-cont" :css="false" />
      </div>
    </div>
    <div ref="bgComputed" style="display:none; opacity:0" :class="'rubric-' + currentPost.category_id" />
  </div>
</template>

<script>
import gsap from 'gsap'

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
        return 'rubric-' + this.currentPost.category_id
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
    className (newClassName, oldClassName) {
      this.$refs.bgComputed.className = 'rubric-' + this.currentPost.category_id
      const bgGradient = window.getComputedStyle(this.$refs.bgComputed).background
      gsap.to(this.$refs.gradient, {
        background: bgGradient,
        duration: 0.3,
        ease: 'slow',
        delay: 0.12
      })
    },
    thumb (newThumb, oldThumb) {
      gsap.to(this.$refs.thumb, { opacity: 0, duration: 0.15, onComplete: () => { this.initThumb = newThumb; console.log(this.initThumb) } })
      gsap.to(this.$refs.thumb, { opacity: 1, duration: 0.2, delay: 0.38 })
    }
  }
}
</script>

<style scoped>
.rubric-1 {
  background:radial-gradient(55.58% 94.3% at 0% 77.4%, rgba(244, 88, 0, 0) 39.5%, rgba(244, 88, 9, 0.56) 61.93%, rgba(244, 88, 9, 1.0) 100%);
}

.rubric-3 {
  background:radial-gradient(55.58% 94.3% at 0% 77.4%, rgba(239, 228, 232, 0) 39.5%, rgba(239, 228, 232, 0.56) 61.93%, #e94c89 100%);
}
</style>
