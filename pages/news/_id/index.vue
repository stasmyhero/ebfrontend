<template>
  <main>
    <Single :id="$route.params.id" />
    <LastPosts />
    <LoadMore />
  </main>
</template>

<script>
import Single from '@/components/Single'
import LastPosts from '@/components/LastPosts.vue'
import LoadMore from '@/components/LoadMore.vue'

export default {
  components: {
    Single,
    LastPosts,
    LoadMore
  }
}
</script>
