<template>
  <div :class="'attached-news-cont rubric-' + currentPost.category_id">
    <template v-if="!isMobile">
      <div class="attached-news-cont-inner">
        <ul class="attached-news-list">
          <li
            v-for="(post, index) in posts"
            :key="post.id"
            class="attached-news-list-item-link-cont"
            :class="{ 'active': currentPost.id === post.id }"
            @mouseover.prevent="changeCurrentPost(index)"
          >
            <nuxt-link class="attached-news-list-item-link" :to="`/${post.category_link}/${post.slug}`">
              <span class="news-item-header">{{ post.title }}</span>
              <span class="news-item-subheader">{{ post.subtitle }}</span>
            </nuxt-link>
          </li>
        </ul>
        <CurrentAttachedPost :current-post="currentPost" />
      </div>
    </template>
    <template v-else>
      <div v-for="post in posts" :key="post.id" class="attached-news-cont-inner">
        <MobileAttachedPost :current-post="post" />
      </div>
    </template>
  </div>
</template>

<script>
import urls from '@/assets/js/url.js'
import CurrentAttachedPost from '@/components/CurrentAttachedPost'
import MobileAttachedPost from '@/components/MobileAttachedPost'

export default {
  name: 'AttachedPosts',
  components: {
    CurrentAttachedPost,
    MobileAttachedPost
  },
  props: {
    posts: Array
  },
  data () {
    return {
      currentPost: Object,
      attached: true,
      socialURL: urls.social
    }
  },
  computed: {
    isMobile () {
      return this.$store.getters['header/isMobile']
    }
  },
  mounted () {
    this.currentPost = this.posts[0]
  },
  methods: {
    changeCurrentPost (index) {
      this.currentPost = this.posts[index]
    }
  }
}
</script>
<style scoped>
.attached-news-cont.rubric-1 {
    background: var(--Rubric-1);
}
.attached-news-cont.rubric-2 {
    background: var(--Rubric-2);
}
.attached-news-cont.rubric-3 {
    background: var(--Rubric-3);
}
.attached-news-cont.rubric-4 {
    background: var(--Rubric-4);
}
.attached-news-cont.rubric-5 {
    background: var(--Rubric-5);
}
.attached-news-cont.rubric-6 {
    background: var(--Rubric-6);
}
.attached-news-cont.rubric-7 {
    background: var(--Rubric-7);
}
.attached-news-cont.rubric-8 {
    background: var(--Rubric-8);
}
.attached-news-cont.rubric-9 {
    background: var(--Rubric-9);
}
.attached-news-cont.rubric-10 {
    background: var(--Rubric-10);
}
</style>
