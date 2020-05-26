<template>
  <div ref="search" class="search" :style="'width:'+ width">
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
    <transition name="fade">
      <div v-if="isOpened" class="search-input-container">
        <a v-show="isShowCloseButton" class="search-close icon-close" @click="close">
          <svg class="icon-close-svg">
            <use xlink:href="/images/sprite.svg#icon-close" />
          </svg>
        </a>
        <div class="search-request-item" />
        <input v-model="searchString" type="text" class="search-input" @keyup.enter="goSearch()">
      </div>
    </transition>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'SearchInput',
  data () {
    return {
      isOpened: false,
      isAnimate: false,
      isShowCloseButton: false,
      searchString: '',
      searchBlocks: [],
      width: '4.2rem'
    }
  },
  mounted () {
    // this.$root.$on('openSearch', this.open())
  },
  methods: {
    open () {
      this.$emit('openSearch')
      this.isOpened = true
      this.width = 'calc(100% - 4.2rem)'
      gsap.set(this, { isShowCloseButton: true, delay: 0.5 })
    },
    close () {
      this.width = '4.2rem'
      this.isShowCloseButton = false
      gsap.set(this, { isOpened: false, delay: 0.5 })
      this.$router.go(-1)
    },
    goSearch () {
      this.$root.$emit('goSearch', this.searchString)
    }
  }

}
</script>

<style scoped>
  .search {
    transition: width 0.5s ease;
  }
</style>
