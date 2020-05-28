<template>
  <header class="header-main-page">
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
    <SearchIcon />
    <div class="header-social-cont">
      <div class="header-social-cont-title-wrapper">
        <span class="header-social-cont-title">В соцсетях</span>
      </div>
      <a class="header-social-link social-link social-link-telegram" :href="socialURL.telegram">
        <svg class="icon icon-social-telegram">
            <use xlink:href="/images/sprite.svg#icon-telegram"></use>
        </svg>
      </a>
      <a class="header-social-link social-link social-link-facebook" :href="socialURL.facebook">
        <svg class="icon icon-social-facebook">
            <use xlink:href="/images/sprite.svg#icon-facebook"></use>
        </svg>
      </a>
      <a class="header-social-link social-link social-link-vk" :href="socialURL.vk">
        <svg class="icon icon-social-vk">
            <use xlink:href="/images/sprite.svg#icon-vk"></use>
        </svg>
      </a>
      <a class="header-social-link social-link social-link-twitter" :href="socialURL.twitter">
        <svg class="icon icon-social-twitter">
            <use xlink:href="/images/sprite.svg#icon-twitter"></use>
        </svg>
      </a>
    </div>
  </header>
</template>

<script>
import urls from '@/assets/js/url'
import Logo from '@/components/Logo.vue'
import Navbar from '@/components/NavBar.vue'
import SearchIcon from '@/components/SearchIcon.vue'

export default {
  name: 'Header',
  components: {
    Navbar,
    Logo,
    SearchIcon
  },
  data () {
    return {
      socialURL: urls.socials
    }
  }
}
</script>
