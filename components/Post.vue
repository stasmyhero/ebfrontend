<template>
  <div v-if="post.category_id === 1" class="news-item-wrapper new-post">
    <nuxt-link :to="'/'+ post.category_link + '/' + post.slug" class="news-item">
      <div v-if="post.thumb" class="news-item-ill-cont">
        <div class="item-ill-gradient-wrapper">
          <div class="item-ill-gradient" />
          <img class="news-item-ill" :src="post.thumb">
        </div>
      </div>
      <div class="news-item-info-wrapper">
        <div class="rubric-title-wrapper">
          <span class="rubric-title">{{ post.category }}</span>
        </div>
        <div class="news-item-header-and-date-wrapper">
          <div class="news-item-header-cont">
            <span class="news-item-header">{{ post.title }}</span>
            <span class="news-item-subheader">{{ post.subheader }}</span>
          </div>
          <div class="publication-date">
            {{ post.date }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
  <div v-else class="article-item-wrapper new-post" :class="'rubric-'+ post.category_id">
    <nuxt-link :to="'/'+ post.category_link + '/' + post.slug" class="article-item">
      <template v-if="post.thumb">
        <div class="article-item-ill-cont">
          <div class="item-ill-gradient-wrapper">
            <div class="item-ill-gradient" />
            <img class="article-item-ill" :src="post.thumb">
          </div>
        </div>
      </template>
      <div class="article-item-info-wrapper">
        <div class="rubric-title-wrapper">
          <span class="rubric-title">{{ post.category }}</span>
        </div>
        <div class="article-item-header-and-date-wrapper">
          <div class="article-item-header-cont">
            <span class="article-item-header">{{ post.title }}</span>
            <span class="article-item-subheader">{{ post.subtitle }}</span>
          </div>
          <div class="publication-date">
            {{ post.date }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: [Object, Boolean],
      default: false,
      required: true
    }
    // page: {
    //   type: [String, Number],
    //   default: 1,
    //   required: false
    // }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.new-post {
  animation: fadeIn 0.8s ease forwards;
}

</style>
