<template>
  <div class="search">
    <nuxt-link
      class="search-open icon-search"
      :to="'/search'"
      @click.native="open"
    >
      <svg
        ref="searchIcon"
        class="icon-search-svg"
      >
        <use xlink:href="/images/sprite.svg#icon-search" />
      </svg>
    </nuxt-link>
    <div v-if="isOpened" class="search-input-container">
      <transition name="fade">
        <a v-show="isShowCloseButton" class="search-close icon-close" @click="close">
          <svg class="icon-close-svg">
            <use xlink:href="/sprite.svg#icon-close" />
          </svg>
        </a>
      </transition>
      <div class="search-request-item" />
      <input type="text" class="search-input">
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'SearchInput',
  data () {
    return {
      isOpened: false,
      isShowCloseButton: false
    }
  },
  mounted () {
    this.$root.$on('openSearch', this.open())
  },
  methods: {
    open () {
      this.$emit('openSearch')
      this.isOpened = true
      gsap.set(this, { isShowCloseButton: true, delay: 0.5 })
    },
    close () {
      this.className = ''
      gsap.set(this, { isOpened: false, delay: 0.5 })
    }
  }
}
</script>
