<template>
  <header class="header-search-page">
    <div class="logo-and-nav-cont">
      <div class="search">
        <template v-if="!isOpened">
          <a class="search-open icon-search" @click.prevent="search">
            <svg class="icon-search-svg">
              <use xlink:href="/images/sprite.svg#icon-search" />
            </svg>
          </a>
        </template>
        <template v-else>
          <div class="search-input-container">
            <a class="search-close icon-close" href="#search-close">
              <svg class="icon-close-svg">
                <use xlink:href="/images/sprite.svg#icon-close" />
              </svg>
            </a>
            <div class="search-request-item" />
            <SearchInput />
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import SearchInput from '@/components/search/Input'

export default {
  name: 'SearchHeader',
  components: {
    SearchInput
  },
  data () {
    return {
      searchString: this.$route.params.string ? this.$route.params.string : ''
    }
  },
  methods: {
    parseSearchString () {
      const s = this.searchString
      if (s.trim() === '') { return false }
    },
    search () {
      this.$route.push('/search/' + this.searchString)
    }
  }
}
</script>
