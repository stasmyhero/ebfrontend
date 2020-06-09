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
      const bgGradient = window.getComputedStyle(this.$refs.bgComputed).backgroundImage
      gsap.to(this.$refs.gradient, {
        backgroundImage: bgGradient,
        duration: 1,
        delay: 0.15
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
    background-image: var(--Rubric-1-attached-news-gradient);
}
.rubric-2 {
    background-image: var(--Rubric-2-attached-news-gradient);
}
.rubric-3 {
    background-image: var(--Rubric-3-attached-news-gradient);
}
.rubric-4 {
    background-image: var(--Rubric-4-attached-news-gradient);
}
.rubric-5 {
    background-image: var(--Rubric-5-attached-news-gradient);
}
.rubric-6 {
    background-image: var(--Rubric-6-attached-news-gradient);
}
.rubric-7 {
    background-image: var(--Rubric-7-attached-news-gradient);
}
.rubric-8 {
    background-image: var(--Rubric-8-attached-news-gradient);
}
.rubric-9 {
    background-image: var(--Rubric-9-attached-news-gradient);
}
.rubric-10 {
    background-image: var(--Rubric-10-attached-news-gradient);
}
</style>
