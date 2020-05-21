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
      <a class="header-social-link social-link social-link-telegram" :href="socialURL.telegram" />
      <a class="header-social-link social-link social-link-facebook" :href="socialURL.facebook" />
      <a class="header-social-link social-link social-link-vk" :href="socialURL.vk" />
      <a class="header-social-link social-link social-link-twitter" :href="socialURL.twitter" />
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
