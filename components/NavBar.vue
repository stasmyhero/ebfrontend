<template>
  <nav class="header-rubrics-cont">
    <nuxt-link
      v-for="(menuItem, index) in menu"
      :key="menuItem.ID"
      class="rubric-link header-rubric-link"
      :class="[ 'rubric-' + (index+1), { 'active': activeItem === (index+1) }]"
      :to=" '/' + menuItem.url"
      @click="setActive(index+1)"
    >
      {{ menuItem.title }}
    </nuxt-link>
  </nav>
</template>

<script>
import urls from '@/assets/js/url'

export default {
  name: 'Navbar',
  async fetch () {
    if (this.$store.getters['menu/menu'].length === 0) {
      await this.$store.dispatch('menu/fetch')
    }
    this.menu = this.$store.getters['menu/menu']
  },
  data () {
    return {
      menu: [],
      activeItem: false,
      baseURL: urls.baseURL
    }
  },
  methods: {
    setActive (index) {
      this.activeItem = parseInt(index, 10)
    }
  }
}
</script>
