<template>
  <footer v-show="isShow">
    <Subscribe />
    <div class="footer-logo-cont">
      <a class="logo-link" href="/">
        <i>Эльбрус</i>
        <span class="logo-triangle">▲</span>пресс
      </a>
    </div>
    <div class="footer-social-cont">
      <span class="footer-social-cont-title">В соцсетях</span>
      <a class="footer-social-link social-link social-link-telegram" :href="socialURL.telegram">
        <svg class="icon icon-social-telegram">
          <use xlink:href="/images/sprite.svg#icon-telegram" />
        </svg>
      </a>
      <a class="footer-social-link social-link social-link-facebook" :href="socialURL.facebook">
        <svg class="icon icon-social-facebook">
          <use xlink:href="/images/sprite.svg#icon-facebook" />
        </svg>
      </a>
      <a class="footer-social-link social-link social-link-vk" :href="socialURL.vk">
        <svg class="icon icon-social-vk">
          <use xlink:href="/images/sprite.svg#icon-vk" />
        </svg>
      </a>
      <a class="footer-social-link social-link social-link-twitter" :href="socialURL.twitter">
        <svg class="icon icon-social-twitter">
          <use xlink:href="/images/sprite.svg#icon-twitter" />
        </svg>
      </a>
    </div>
    <div class="footer-bottom-cont">
      <div class="copyright">
        ©&thinsp;2020
      </div>
      <FooterNavBar />
      <div class="by-kontora-cont">
        <a class="by-kontora-link" href="https://kontora.cc" />
      </div>
    </div>
    <div class="footer-bg-triangles">
      <svg
        class="footer-bg-triangle-left"
        width="991"
        height="679"
        viewBox="0 0 991 679"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="footer-bg-triangle-left-path"
          d="M495.799 3.29857e-06L991 679.163L0.597656 679.163L495.799 3.29857e-06Z"
        />
      </svg>
      <svg
        class="footer-bg-triangle-right"
        width="991"
        height="679"
        viewBox="0 0 991 679"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="footer-bg-triangle-right-path"
          d="M495.799 3.29857e-06L991 679.163L0.597656 679.163L495.799 3.29857e-06Z"
        />
      </svg>
    </div>
  </footer>
</template>

<script>
import urls from '@/assets/js/url'
import Subscribe from '@/components/footer/Subscribe'
import FooterNavBar from '@/components/footer/FooterNavBar'

export default {
  name: 'Footer',
  components: {
    Subscribe,
    FooterNavBar
  },
  data () {
    return {
      menu: [],
      socialURL: urls.socials
    }
  },
  computed: {
    isShow () {
      return !(this.$route.name === 'search' || this.$route.name === 'search-s')
    }
  }
}
</script>
