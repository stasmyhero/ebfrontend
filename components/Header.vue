<template>
  <header :class="headerClass">
    <div style="display: none;" class="logo-cont">
      <a class="logo-link" href="/">
        <i>Эльбрус</i>
        <span class="logo-triangle">▲</span>пресс
      </a>
    </div>
    <div class="logo-and-nav-cont">
      <Logo />
      <Navbar />
    </div>
    <transition name="fade">
      <div
        v-show="isShowMenu"
        class="header-social-cont"
        @openSearch="menuFadeOut"
      >
        <div class="header-social-cont-title-wrapper">
          <span class="header-social-cont-title">В соцсетях</span>
        </div>
        <a class="header-social-link social-link social-link-telegram" :href="socialURL.telegram" />
        <a class="header-social-link social-link social-link-facebook" :href="socialURL.facebook" />
        <a class="header-social-link social-link social-link-vk" :href="socialURL.vk" />
        <a class="header-social-link social-link social-link-twitter" :href="socialURL.twitter" />
      </div>
    </transition>
    <div class="search">
      <SearchInput />
    </div>
  </header>
</template>

<script>
import urls from '@/assets/js/url.js'
import Logo from '@/components/Logo.vue'
import Navbar from '@/components/NavBar.vue'
import SearchInput from '@/components/search/Input.vue'

export default {
  name: 'Header',
  components: {
    Navbar,
    Logo,
    SearchInput
  },
  data () {
    return {
      socialURL: urls.socials,
      isShowMenu: true
    }
  },
  computed: {
    headerClass () {
      if (this.$route.name === 'index') { return 'header-main-page' }
      if (this.$route.name === 'search' || this.$route.name === 'search-s') { return 'header-search-page' }
      return 'header-inner-page'
    }
  },
  created () {
    this.$on('goSearch', (searchString) => {
      console.log('a')
      this.$emit('goSearch', 'asd')
    })
  },
  methods: {
    menuFadeOut () {
      this.isShowMenu = false
    }
  }
}
</script>
<style scoped>

 .header-search-page {
    position: fixed;
    top: 0px;
 }
 .header-search-page .search-icon {

 }
</style>
