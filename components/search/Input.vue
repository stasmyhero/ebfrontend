<template>
  <div ref="search" class="search" :style="'width:'+ width">
    <nuxt-link
      class="search-open icon-search"
      :to="'/search/'"
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
        <div ref="wrapper" class="search-request-wrapper">
          <template v-if="blocks.length">
            <InputBlock
              v-for="(block, index) in blocks"
              :key="index"
              :block="block"
              :ind="index"
              class="search-request-item"
            />
          </template>
        </div>
        <input
          ref="searchInput"
          v-model="searchString"
          :style="{ 'padding-left': paddingLeft }"
          type="text"
          class="search-input"
          @keyup.enter="goSearch()"
        >
      </div>
    </transition>
  </div>
</template>

<style scoped>

</style>

<script>
import gsap from 'gsap'
import searchParser from '../../assets/js/searchParser'
import urls from '../../assets/js/url'
import InputBlock from '@/components/search/InputBlock'

export default {
  name: 'SearchInput',
  components: {
    InputBlock
  },
  data () {
    return {
      isAnimate: false,
      isShowCloseButton: false,
      searchString: '',
      blocks: [],
      paddingLeft: '6rem'
    }
  },
  computed: {
    isOpened () {
      return (this.$route.name === 'search' || this.$route.name === 'search-s')
    },
    width: {
      get () {
        return (this.$route.name === 'search' || this.$route.name === 'search-s') ? 'calc(100% - 4.2rem)' : '4.2rem'
      },
      set (newValue) {
        return newValue
      }
    }
  },
  mounted () {
    this.$root.$on('deleteBlock', (index) => { this.deleteBlock(index) })
    this.$root.$on('parseURL', (url) => { this.parseURL(url) })
    window.setTimeout(() => {
      if (this.blocks.length > 0) { console.log(this.$refs.wrapper.offsetWidth); this.paddingLeft = this.$refs.wrapper.offsetWidth + 10 + 'px' }
    }, 100)
  },
  methods: {
    open () {
      this.$root.$emit('openSearch')
      this.width = 'calc(100% - 4.2rem)'
      gsap.set(this, { isShowCloseButton: true, delay: 0.5 })
      this.$refs.searchInput.focus()
      this.paddingLeft = '6rem'
    },
    close () {
      this.isShowCloseButton = false
      this.searchString = ''
      this.blocks = []
      this.$refs.searchInput.blur()
      this.$router.go(-1)
      window.setTimeout(() => {
        this.$root.$emit('closeSearch')
      }, 1000)
    },
    goSearch () {
      if (this.searchString.trim() === '') {
        this.searchString = ''
        return
      }
      const newWords = searchParser.stringToWords(this.searchString)
      const newBlocks = searchParser.parseWords(newWords)
      if (newBlocks.length === 0) { this.$root.$emit('goSearch', '') }
      this.blocks.push(...newBlocks)
      this.blocks = Array.from(new Set(this.blocks))
      this.$nextTick(() => {
        if (this.blocks.length > 0) { this.paddingLeft = this.$refs.wrapper.offsetWidth + 10 + 'px' } else { this.paddingLeft = '6rem' }
      })
      this.searchString = ''
      const restString = searchParser.blocksToRestString(this.blocks)
      const urlString = searchParser.blocksToURLString(this.blocks)
      window.history.replaceState({ }, '', urls.baseURL + 'search/?s=' + urlString)
      this.$root.$emit('goSearch', restString)
    },
    deleteBlock (ind) {
      if (ind === 0) {
        this.paddingLeft = '6rem'
        this.$root.$emit('goSearch', '')
        this.$refs.searchInput.focus()
      }
      this.blocks.splice(ind, 1)
      this.goSearch()
    },
    deleteLastBlock () {
      if (this.searchString === '' && this.blocks.length > 0) {
        this.blocks.splice(-1, 1)
        this.goSearch()
      }
      if (this.blocks.length === 0 && this.searchString === '') {
        this.goSearch()
      }
    },
    parseURL (url) {
      if (url === '') { return }
      this.blocks = searchParser.URLtoBlocks(url)
      const restString = searchParser.blocksToRestString(this.blocks)
      this.$root.$emit('goSearch', restString)
    }
  }

}
</script>

<style scoped>
  .search {
    transition: width 0.5s linear;
  }

  .search-request-wrapper {
    display: inline;
    position: absolute;
    top:1rem;
    padding-left: 6rem;
  }
</style>
