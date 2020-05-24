<template>
  <div class="attached-news-item" :class="className">
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
          <div class="publication-date">
            {{ currentPost.date }}
          </div>
        </div>
      </div>
      <div class="attached-news-item-bg-container">
        <transition name="fade">
          <div
            v-if="currentPost.thumb"
            ref="thumb"
            class="attached-news-item-img-cont"
          >
            <img :src="currentPost.thumb">
          </div>
          <div ref="gradient" class="attached-news-item-gradient-cont" />
        </transition>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import gsap from 'gsap'
import background from '@/assets/js/backgrounds'

export default {
  name: 'CurrentAttachedPost',
  props: {
    currentPost: {
      type: [Object, Boolean],
      default: false,
      required: true
    }
  },
  data () {
    return {
      timeline: gsap.timeline()
    }
  },
  computed: {
    className () {
      return 'rubrics-' + this.currentPost.categoryID
    }
  },
  watch: {
    className (oldClassName, newClassName) {
      this.timeline.pause()
      this.timeline.clear()
      // const bgColor1 = background.gradients[oldClassName]
      const bgGradient = background.gradients[newClassName]
      this.timeline.to(this.$refs.gradient, { background: bgGradient, duration: 0.2 })
    }
  }
}
</script>
