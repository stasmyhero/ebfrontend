<template>
  <main>
    <template v-if="$route.params.category === 'news'">
      <Single :slug="$route.params.slug" :post="post" />
    </template>
    <template v-else>
      <SingleArticle :slug="$route.params.slug" :post="post" />
    </template>
    <LastPosts :posts="lastposts" />
    <template v-if="isNeedToUpload">
      <LoadMore v-if="isLoadedOnce" />
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteHandler"
      />
    </template>
  </main>
</template>

<script>
import urls from '@/assets/js/url'
import Single from '@/components/Single'
import SingleArticle from '@/components/SingleArticle'
import LastPosts from '@/components/LastPosts.vue'
import LoadMore from '@/components/LoadMore.vue'

export default {
  transition: 'fade',
  components: {
    Single,
    SingleArticle,
    LastPosts,
    LoadMore
  },
  async asyncData ({ $axios, params }) {
    const request = {
      endpoint: `${urls.restURL}/single/${params.slug}`,
      headers: urls.restHeaders
    }
    try {
      const res = await $axios.get(request.endpoint)
      return { post: res.data }
    } catch (error) {
      console.log(error)
      return { post: false }
    }
  },
  data () {
    return {
      page: 1,
      lastPosts: [],
      isLoadedOnce: false,
      isNeedToUpload: true
    }
  },
  methods: {
    async infiniteHandler ($state) {
      const request = {
        endpoint: `${urls.restURL}/single/${this.$params.slug}`,
        headers: urls.restHeaders
      }
      const res = await this.$axios.get(request.endpoint, request.headers)
      if (res.data.lenght > 0) {
        this.page += 1
        this.lastPosts.push(...res.data.posts)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  }
}
</script>
