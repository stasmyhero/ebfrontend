<template>
  <main>
    <template v-if="$route.params.category === 'news'">
      <Single :slug="$route.params.slug" :post="post" />
    </template>
    <template v-else>
      <SingleArticle :slug="$route.params.slug" :post="post" />
    </template>
    <LastPosts />
    <LoadMore />
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
  }
}
</script>
