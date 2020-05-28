<template>
  <header :class="headerClass">
    <transition name="fadeFast" mode="out-in">
      <div v-if="!isShowMenu" key="burger" class="logo-and-nav-cont">
        <a>
          <span class="logo-triangle" @click.prevent="showMenu()">▲</span>
        </a>
      </div>
      <div v-else key="normal" class="logo-and-nav-cont">
        <Logo />
        <Navbar />
      </div>
    </transition>
    <div
      class="header-social-cont"
    >
      <div class="header-social-cont-title-wrapper">
        <span class="header-social-cont-title">В соцсетях</span>
      </div>
      <a class="header-social-link social-link social-link-telegram" :href="socialURL.telegram">
        <svg class="icon icon-social-telegram">
          <use xlink:href="/images/sprite.svg#icon-telegram" />
        </svg>
      </a>
      <a class="header-social-link social-link social-link-facebook" :href="socialURL.facebook">
        <svg class="icon icon-social-facebook">
          <use xlink:href="/images/sprite.svg#icon-facebook" />
        </svg>
      </a>
      <a class="header-social-link social-link social-link-vk" :href="socialURL.vk">
        <svg class="icon icon-social-vk">
          <use xlink:href="/images/sprite.svg#icon-vk" />
        </svg>
      </a>
      <a class="header-social-link social-link social-link-twitter" :href="socialURL.twitter">
        <svg class="icon icon-social-twitter">
          <use xlink:href="/images/sprite.svg#icon-twitter" />
        </svg>
      </a>
    </div>
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
      isShowLogo: true,
      isShowAll: true,
      isShowMenu: true
    }
  },
  computed: {
    headerClass: {
      get () {
        if (this.$route.name === 'index') { return 'header-main-page' }
        if (this.$route.name === 'search' || this.$route.name === 'search-s') { return 'header-search-page' }
        return 'header-inner-page'
      },
      set (value) {
        this.headerClass = value
      }
    }
  },
  created () {
    // this.$route.meta
    this.$root.$on('goSearch', (searchString) => {
      this.$emit('goSearch', 'asd')
    })
    this.$root.$on('openSearch', () => { this.menuFadeOut() })
    this.$root.$on('closeSearch', () => { this.menuFadeIn() })
  },
  mounted () {
    let animTrigger = 300
    if (document.querySelector('.clear-item-cont ')) { animTrigger = document.querySelector('.clear-item-cont ').offsetHeight ?? 300 }
    window.addEventListener('scroll', () => {
      if (window.scrollY > animTrigger) {
        this.isShowMenu = false
      } else if (this.$route.name !== 'category-slug') {
        this.isShowMenu = true
      }
    })
  },
  methods: {
    menuFadeOut () {
      this.isShowAll = false
    },
    menuFadeIn () {
      this.isShowAll = true
    },
    showMenu () {
      this.isShowMenu = true
    },
    hideMenu () {
      this.isShowMenu = false
    }
  }
}
</script>
<style scoped>
  header {
    z-index: 100;
  }
 .header-search-page {
    position: fixed;
    top: 0px;
 }
  .logo-and-nav-cont {
      transition:  opacity 0.25s ease;
  }

 .header-search-page .logo-and-nav-cont  {
   opacity: 0;
 }
.header-search-page .header-social-cont  {
   opacity: 0;
 }

  .header-inner-page .logo-cont{
    opacity: 0 !important;
  }

  .logo-cont {
    transition: opacity 0.15s ease;
  }

  .fadeFast-enter-active, .fadeFast-leave-active {
    transition: opacity .25s;
  }
  .fadeFast-enter, .fadeFast-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .header-loading {
    opacity: 0;
  }
</style>
