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
        <template v-if="blocks.length">
          <InputBlock
            v-for="(block, index) in blocks"
            :key="index"
            :block="block"
            :ind="index"
            class="search-request-item"
          />
        </template>
        <input v-model="searchString" type="text" class="search-input" @keyup.enter="goSearch()" @keyup.delete="deleteLastBlock()">
      </div>
    </transition>
  </div>
</template>

<script>
import gsap from 'gsap'
import searchParser from '../../assets/js/searchParser'
import InputBlock from '@/components/search/InputBlock'

export default {
  name: 'SearchInput',
  components: {
    InputBlock
  },
  fetch () {
    if (this.$route.name === 'search' || this.$route.name === 'search-s') {
      this.isShowCloseButton = true
    } else {
      this.isShowCloseButton = false
    }
  },
  data () {
    return {
      isAnimate: false,
      isShowCloseButton: false,
      searchString: '',
      blocks: []
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
  },
  methods: {
    open () {
      this.$root.$emit('openSearch')
      this.width = 'calc(100% - 4.2rem)'
      gsap.set(this, { isShowCloseButton: true, delay: 0.5 })
    },
    close () {
      this.isShowCloseButton = false
      // gsap.set(this, { isOpened: false, delay: 0.2 })
      this.searchString = ''
      this.$router.go(-1)
      window.setTimeout(() => {
        this.$root.$emit('closeSearch')
      }, 1000)
    },
    goSearch () {
      const newBlocks = searchParser.stringToBlocks(this.searchString)
      if (newBlocks.length === 0) { this.$root.$emit('goSearch', '') }
      // const acum = []
      // for (const nb in newBlocks) {
      //   for (const b in this.blocks) {
      //     if (nb.toLowerCase() !== b.toLowerCase()) { this.acum }
      //   }
      // }
      this.blocks.push(...newBlocks)
      this.blocks = Array.from(new Set(this.blocks))
      this.searchString = ''
      const restString = searchParser.blocksToRestString(this.blocks)
      // if (this.$route.fullPath !== ('/search' + parseResult.restString)) {
      //   this.$router.replace({ path: '/search' + parseResult.restString })
      // }
      console.log(restString)
      this.$root.$emit('goSearch', restString)
    },
    deleteBlock (ind) {
      console.log(ind)
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
    }
  }

}
</script>

<style scoped>
  .search {
    transition: width 0.5s ease;
  }
</style>
