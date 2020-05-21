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
      <a class="header-social-link social-link social-link-telegram" href="#" />
      <a class="header-social-link social-link social-link-facebook" href="#" />
      <a class="header-social-link social-link social-link-vk" href="#" />
      <a class="header-social-link social-link social-link-twitter" href="#" />
    </div>
  </header>
</template>

<script>
import Logo from '@/components/Logo.vue'
import Navbar from '@/components/NavBar.vue'
import SearchIcon from '@/components/SearchIcon.vue'

export default {
  name: 'Header',
  components: {
    Navbar,
    Logo,
    SearchIcon
  }
}
</script>
