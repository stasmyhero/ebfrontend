<template>
  <div class="article-item-wrapper">
    <a class="article-item" :class="'rubric'+ post.category_id" :href="post.permalink">
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
            <span class="article-item-header">{{ post.title }}></span>
            <span class="article-item-subheader">{{ post.subtitle }}</span>
          </div>
          <div class="publication-date">{{ post.date }}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    post: Object
  }
}
</script>
