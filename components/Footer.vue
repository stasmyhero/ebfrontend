<template>
  <transition name="fade" delay="0.5">
    <footer v-show="isShow">
      <Subscribe />
      <div class="footer-logo-cont">
        <a class="logo-link" href="/">
          <svg class="logo-footer-svg">
            <use xlink:href="/images/sprite.svg#logo-footer" />
          </svg>
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
          ref="triangleLeft"
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
          ref="triangleRight"
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
  </transition>
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
      socialURL: urls.socials,
      shift: 0,
      maxShift: 58
    }
  },
  computed: {
    isShow () {
      return !(this.$route.name === 'search' || this.$route.name === 'search-s')
    }
  },
  mounted () {
    this.shift = (window.scrollY > this.$el.offsetTop - 1000) ? this.maxShift : 0
    this.$refs.triangleLeft.style.transform = `translate(-${this.maxShift}%)`
    this.$refs.triangleRight.style.transform = `translate(${this.maxShift}%)`
    window.addEventListener('scroll', () => {
      this.shift = (window.scrollY > this.$el.offsetTop - 1000) ? this.maxShift : 0
      if (this.shift !== 0) {
        this.$refs.triangleLeft.style.transform = `translate(-${this.maxShift}%)`
        this.$refs.triangleRight.style.transform = `translate(${this.maxShift}%)`
      } else {
        this.$refs.triangleLeft.style.transform = 'translate(-50%)'
        this.$refs.triangleRight.style.transform = 'translate(50%)'
      }
    })
  }
}
</script>

<style scoped>
  .footer-bg-triangles {
    width: 100%;
    left:50%;
    transform:translateX(-50%);
    position:absolute;
  }
  .footer-bg-triangle-left, .footer-bg-triangle-right {
    transition: all .5s linear;
  }
  .footer-bg-triangle-left {
    left: 50%;
    transform: translate(-50%);
  }

   .footer-bg-triangle-right {
    right: 50%;
    transform: translate(50%);
  }

</style>
