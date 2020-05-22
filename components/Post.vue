<template>
  <div v-if="post.category_id === 1" class="news-item-wrapper">
    <a class="news-item">
      <nuxt-link :to="'/'+ post.category_link + '/' + post.slug">
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
            <div class="publication-date">{{ post.date }}</div>
          </div>
        </div>
      </nuxt-link>
    </a>
  </div>
  <div v-else class="article-item-wrapper" :class="'rubric-'+ post.category_id">
    <a class="article-item">
      <nuxt-link :to="'/'+ post.category_link + '/' + post.slug">
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
            <div class="publication-date">{{ post.date }}</div>
          </div>
        </div>
      </nuxt-link>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: Object
  }
}
</script>
