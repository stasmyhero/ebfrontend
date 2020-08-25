<template>
  <div class="article-body-cont">
    <div v-if="post.thumb" class="article-image-cover-cont">
      <img class="article-image-cover" :src="post.thumb">
    </div>
    <div class="article-item-header-card" :class="'rubric-' + post.category_id">
      <div class="article-item-rubrics-cont">
        <nuxt-link class="article-item-rubric-link link-underline" :to="'/' + post.category_link">
          {{ post.category }}
        </nuxt-link>
      </div>
      <div class="article-item-page-header-cont">
        <h1 class="article-item-page-header">
          {{ post.post_title }}
        </h1>
        <span class="article-item-page-subheader">{{ post.subheader }}</span>
      </div>
      <div class="article-item-page-meta-cont">
        <div class="publication-date">
          <nobr class="publication-time">
            {{ post.time }}
          </nobr>, {{ post.day }}&nbsp;{{ post.month }}&nbsp;{{ post.year }}
        </div>
        <template v-if="post.views">
          <div class="article-item-page-views-counter">
            {{ post.views }}
          </div>
        </template>
        <template v-else>
          <div class="article-item-page-views-counter">
            1 просмотр
          </div>
        </template>
      </div>
    </div>
    <div v-if="post.subtitle" class="article-item-subtitle">
      {{ post.subtitle }}
    </div>
    <div class="article-item-text-wrapper" v-html="post.post_content" />
    <div v-if="post.author" class="article-author">
      <nuxt-link :to="'/search/?s=' + encodeURIComponent( JSON.stringify(['@'+ post.author.replace(' ','_')]))" class="link-underline">
        {{ post.author }}
      </nuxt-link>
    </div>
    <template v-if="post.tags">
      <div class="article-item-page-tags-cont">
        <nuxt-link
          v-for="tag in post.tags"
          :key="tag.id"
          class="tag"
          :to="'/search/?s=' + encodeURIComponent( JSON.stringify(['#'+ tag.name.replace(' ', '_')]))"
        >
          {{ tag.name }}
        </nuxt-link>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SingleArticle',
  props: {
    slug: String,
    post: Object
  },
  data () {
    return {
      isLightboxOpened: false
    }
  },
  mounted () {
    const images = document.querySelectorAll('.gallery-pic-wrapper')
    if (this.$store.getters['header/isMobile'] === false) {
      for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', () => {
          if (this.$store.getters['header/isMobile']) { return }
          if (!this.isLightboxOpened) {
            const gallerObj = {
              images: images[i].parentNode.querySelectorAll('.gallery-pic-wrapper'),
              currentIndex: i
            }
            this.$root.$emit('openLightBox', gallerObj)
            this.isLightboxOpened = true
          }
        })
      }
    }
    this.$root.$on('closeLightBox', () => { this.isLightboxOpened = false })
  }
}
</script>
