<template>
  <header :class="headerClass">
    <div class="logo-and-nav-cont">
      <transition name="fadeFast" mode="out-in">
        <div v-if="isLogo" key="normal">
          <Logo />
        </div>
        <div v-else key="mobile">
          <nuxt-link to="/" class="logo-short-link">
            <svg class="logo-short-link-svg">
              <use xlink:href="/images/sprite.svg#logo-short" />
            </svg>
          </nuxt-link>
        </div>
      </transition>
      <transition name="fadeFast" mode="out-in">
        <div v-if="isBurger" key="burger" class="burger-menu-link-wrapper" >
          <a class="burger-menu-link" @click.prevent="showMenu">
            <span class="icon-burger">
              <span class="icon-burger-line" />
              <span class="icon-burger-line" />
              <span class="icon-burger-line" />
            </span>
          </a>
        </div>
        <div v-else key="normal" class="header-rubrics-cont-wrapper">
          <Navbar />
        </div>
      </transition>
    </div>
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
    },
    isBurger () {
      return this.$store.getters['header/isBurger']
    },
    isLogo () {
      return this.$store.getters['header/isLogo']
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      if (this.$store.getters['header/isMobile'] === true) { return }
      if (window.scrollY > 300) {
        this.$store.commit('header/isBurger', true)
        if (this.$route.name === 'index') { this.$store.commit('header/isLogo', false) }
      } else if (this.$route.name !== 'category-slug') {
        this.$store.commit('header/isBurger', false)
        if (this.$route.name === 'index') { this.$store.commit('header/isLogo', true) }
      }
    })
  },
  methods: {
    showMenu () {
      this.$store.commit('header/isBurger', false)
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
      display: flex;
      flex-direction: row;
  }

 .header-search-page .logo-and-nav-cont  {
   opacity: 0;
 }

.header-search-page .header-social-cont  {
   opacity: 0;
 }

  .header-search-page .logo-cont{
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
