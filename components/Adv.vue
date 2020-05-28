
<template>
  <div :class="'ad-item-wrapper mainpage-ad-grid-' + pos">
    <div class="ad-item" v-if="isLoaded">
      <a class="ad-item-link" :href="url"><img class="ad-item-img" :src="img"></a>
      <a class="link-to-ad-prices link-underline" href="#">Разместить рекламу</a>
    </div>
    <div v-else class="ad-item-loading">
      Загрузка
    </div>
  </div>
</template>

<script>
import urls from '@/assets/js/url'

export default {
  name: 'Adv',
  props: {
    pos: {
      type: String,
      required: true,
      default: () => 1
    }
  },
  async fetch () {
    try {
      const res = await this.$axios.get(urls.restURL + `/adv/${this.pos}`)
      if (res.data !== false) {
        this.img = res.data[0].img
        this.url = res.data[0].url
        this.isLoaded = true
      }
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
