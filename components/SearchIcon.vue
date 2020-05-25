<template>
  <div class="search">
    <nuxt-link
      class="search-open icon-search"
      :to="'/search'"
      @click.native="openSearchWindow"
    >
      <svg
        ref="searchIcon"
        class="icon-search-svg"
      >
        <use xlink:href="/images/sprite.svg#icon-search" />
      </svg>
    </nuxt-link>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'SearchIcon',
  methods: {
    openSearchWindow () {
      this.$emit('openSearch')
      gsap.to(this.$refs.searchIcon, { x: '-=200', duration: 1 })
    }
  }
}
</script>
