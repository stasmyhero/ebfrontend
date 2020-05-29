<template>
  <div v-show="post">
    <div class="news-body-cont">
      <div class="news-item-page-header-cont">
        <h1 class="news-item-page-header">
          {{ post.post_title }}
        </h1>
      </div>
      <div class="news-item-page-meta-cont">
        <div class="publication-date">
          <nobr class="publication-time">
            {{ post.time }}
          </nobr>, {{ post.day }}&nbsp;{{ post.month }}&nbsp;{{ post.year }}
        </div>
        <template v-if="post.author">
          <div class="news-item-author-source-cont">
            <a class="news-item-author-source-cont-link link-underline" href="#">{{ post.author }}</a>
          </div>
        </template>
        <div class="news-item-rubrics-cont">
          <a class="news-item-rubric-link link-underline rubric-1" :href="post.category_url">{{ post.category }}</a>
        </div>
        <template v-if="post.views">
          <div class="news-item-page-views-counter">
            {{ post.views }}
          </div>
        </template>
        <template v-else>
          <div class="news-item-page-views-counter">
            1 просмотр
          </div>
        </template>
      </div>
      <div class="news-item-text-wrapper">
        <div v-if="post.thumb" class="news-item-pic-wrapper">
          <img class="news-item-pic" :src="post.thumb">
          <div class="news-item-pic-comment-wrapper">
            <div class="news-item-pic-copyright">
              {{ post.thumb_caption }}
            </div>
          </div>
        </div>
        <div v-html="post.post_content" />
        <template v-if="post.tags">
          <div class="news-item-page-tags-cont">
            <a
              v-for="tag in post.tags"
              :key="tag.id"
              class="tag"
              :href="tag.url"
            >{{ tag.name }}</a>
          </div>
        </template>
      </div>
    </div>
    <LightBox v-show="isLightboxOpened" />
  </div>
</template>
  </div>
</template>

<script>
import LightBox from '@/components/LightBox'

export default {
  name: 'Single',
  components: {
    LightBox
  },
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
    console.log(images.length)
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('click', () => {
        if (!this.isLightboxOpened) {
          const gallerObj = {
            images: images[i].parentNode.querySelectorAll('.gallery-pic-wrapper'),
            currentIndex: i
          }
          this.$root.$emit('openLightBox', gallerObj)
          console.log(gallerObj.images)
          this.isLightboxOpened = true
        }
      })
    }
    this.$root.$on('closeLightBox', () => { this.isLightboxOpened = false })
  }
}
</script>
