<template>
  <div class="header-rubrics-cont-wrapper">
    <template v-if="!isMobile">
      <transition name="fadeFast" mode="out-in">
        <a v-if="isBurger" class="burger-menu-link" @click.prevent="toggleMenu()">
          <span class="icon-burger" :class="{'icon-burger-close': burgerButtonCloseState }">
            <span class="icon-burger-line" />
            <span class="icon-burger-line" />
            <span class="icon-burger-line" />
          </span>
        </a>
      </transition>
      <div class="header-rubrics-cont-wrapper">
        <nav class="header-rubrics-cont">
          <nuxt-link
            v-for="(menuItem, index) in menu"
            :key="menuItem.ID"
            class="rubric-link header-rubric-link"
            :class="[ 'rubric-' + (index+1), { 'active': activeItem === (index+1) }]"
            :to=" '/' + menuItem.url"
            @click="setActive(index+1)"
          >
            {{ menuItem.title }}
          </nuxt-link>
        </nav>
      </div>
    </template>
    <template v-else>
      <a v-if="isBurger" class="burger-menu-link" @click.prevent="toggleMenu()">
        <span class="icon-burger" :class="{'icon-burger-close': burgerButtonCloseState }">
          <span class="icon-burger-line" />
          <span class="icon-burger-line" />
          <span class="icon-burger-line" />
        </span>
      </a>
      <nav v-show="false" class="header-rubrics-cont">
        <nuxt-link
          v-for="(menuItem, index) in menu"
          :key="menuItem.ID"
          class="rubric-link header-rubric-link"
          :class="[ 'rubric-' + (index+1), { 'active': activeItem === (index+1) }]"
          :to=" '/' + menuItem.url"
          @click="setActive(index+1)"
        >
          {{ menuItem.title }}
        </nuxt-link>
      </nav>
    </template>
  </div>
</template>

<script>
import gsap from 'gsap'
import urls from '@/assets/js/url'

export default {
  name: 'Navbar',
  async fetch () {
    if (this.$store.state.menu.menu.length === 0) {
      await this.$store.dispatch('menu/fetch')
    }
    this.menu = this.$store.state.menu.menu
  },
  data () {
    return {
      menu: [],
      activeItem: false,
      baseURL: urls.baseURL,
      isAnimate: false,
      isMenuOpen: false,
      burgerButtonCloseState: false
    }
  },
  computed: {
    isBurger () {
      return this.$store.getters['header/isBurger']
    },
    isMobile () {
      return this.$store.getters['header/isMobile']
    }
  },
  created () {
    this.$root.$on('closeMenuScroll', () => { this.closeMenuScroll() })
    this.$root.$on('openMenuScroll', () => { this.openMenuScroll() })
    this.$root.$on('openMenuPage', () => { this.openMenuPage() })
    this.$root.$on('closeMenuPage', () => { this.closeMenuPage() })
  },
  methods: {
    setActive (index) {
      this.activeItem = parseInt(index, 10)
    },
    toggleMenu () {
      if (this.burgerButtonCloseState === true) {
        this.closeMenu()
      } else {
        this.openMenu()
      }
    },
    openMenu () {
      if (this.isAnimate === true) { return }
      if (this.isMenuOpen === true) { return }
      if (this.isShowMenu === false) { this.isShowMenu = true }
      this.isAnimate = true
      // this.$store.commit('header/isBurger', false)

      gsap.to('.header-rubric-link',
        {
          autoAlpha: 1,
          duration: 0.3,
          stagger: {
            each: 0.05,
            from: 'start'
          },
          onComplete: () => {
            this.isAnimate = false
            this.isMenuOpen = true
            this.burgerButtonCloseState = true
            // this.$store.commit('header/isBurger', false)
          },
          delay: 0.3
        })
    },
    closeMenu () {
      if (this.isAnimate === true) { return }
      if (this.isMenuOpen === false) { return }

      this.isAnimate = true

      gsap.to('.header-rubric-link',
        {
          autoAlpha: 0,
          duration: 0.3,
          stagger: {
            each: 0.09,
            from: 'end'
          },
          onComplete: () => {
            this.isAnimate = false
            this.isMenuOpen = false
            this.burgerButtonCloseState = false
            this.$store.commit('header/isBurger', true)
          }
        })
    },
    openMenuScroll () {
      // if (this.isMenuOpen === true) {
      //   return
      // }
      this.isAnimate = true
      this.$store.commit('header/isBurger', false)

      gsap.to('.header-rubric-link',
        {
          autoAlpha: 1,
          duration: 0.3,
          stagger: {
            each: 0.05,
            from: 'start'
          },
          onComplete: () => {
            this.isAnimate = false
            this.isMenuOpen = true
            this.burgerButtonCloseState = true
            this.isMenuOpen = true
          },
          delay: 0.3
        })
    },
    closeMenuScroll () {
      // this.isAnimate = true
      // if (this.isMenuOpen === false) {
      //   return
      // }
      gsap.to('.header-rubric-link',
        {
          autoAlpha: 0,
          duration: 0.3,
          stagger: {
            each: 0.05,
            from: 'end'
          },
          onComplete: () => {
            this.isAnimate = false
            this.isMenuOpen = false
            this.burgerButtonCloseState = false
            this.$store.commit('header/isBurger', true)
          }
        })
    },
    openMenuPage () {
      window.setTimeout(() => {
        if (window.scrollY > 20) {
          this.$store.commit('header/isBurger', false)
          gsap.to('.header-rubric-link',
            {
              autoAlpha: 1,
              duration: 0.3,
              stagger: {
                each: 0.05,
                from: 'start'
              },
              onComplete: () => {
                this.isAnimate = false
                this.isMenuOpen = true
                this.burgerButtonCloseState = true
                this.isMenuOpen = true
              },
              delay: 0.3
            })
        }
      }, 100)
      this.isAnimate = true
    },
    closeMenuPage () {
      gsap.to('.header-rubric-link',
        {
          autoAlpha: 0,
          duration: 0.3,
          stagger: {
            each: 0.05,
            from: 'end'
          },
          onComplete: () => {
            this.isAnimate = false
            this.isMenuOpen = false
            this.burgerButtonCloseState = false
            this.$store.commit('header/isBurger', true)
          }
        })
    }
  }
}
</script>

<style scoped>
  .fadeNav-enter-active, .fadeFast-leave-active {
    transition: opacity .25s;
  }
  .fadeNav-enter, .fadeFast-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

   .fadeFast-enter-active, .fadeFast-leave-active {
    transition: opacity .25s;
  }
  .fadeFast-enter, .fadeFast-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
