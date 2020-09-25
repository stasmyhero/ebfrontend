
<template>
  <div v-if="isLoaded">
    <div class="ad-item">
      <a class="ad-item-link" :href="url"><img class="ad-item-img" :src="img"></a>
      <nuxt-link to="pages/adv" class="link-to-ad-prices link-underline" href="#">Разместить рекламу</nuxt-link>
    </div>
  </div>
</template>

<script>
import urls from '@/assets/js/url'

export default {
  name: 'Adv',
  props: {
    pos: {
      type: Number,
      required: true,
      default: () => 1
    }
  },
  async fetch () {
    try {
      const res = await this.$axios.get(urls.restURL + `/adv/${this.pos}`)
      if (res.data !== false) {
        this.img = res.data[(Math.random() * res.data.length) >> 0].img
        this.url = res.data[(Math.random() * res.data.length) >> 0].url
        this.isLoaded = true
      } else { this.isLoaded = false }
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      img: '',
      url: '',
      isLoaded: false
    }
  }
}

</script>
