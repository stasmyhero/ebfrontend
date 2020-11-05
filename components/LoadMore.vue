<template>
    <button v-show="isShow" class="big-button button-showmore" @hideButton="hide()" @click.prevent="loadPosts()">
      Показать ещё
    </button>
</template>

<script>
export default {
  name: 'LoadMore',
  props: {
    category_id: Number
  },
  data () {
    return {
      isClicked: false,
      isShow: true,
      scrolled: 0,
      loadBorder: 999999
    }
  },
  mounted () {
    this.$root.$on('loadingOver', () => {
      this.hide()
    })
    // this.scrolled = localStorage.getItem('mainPageScrolled') ? localStorage.getItem('mainPageScrolled') : 0
    // window.scrollY = this.scrolled
    // window.addEventListener('scroll', () => {
    //   console.log('scroll')
    //   this.scrolled = window.scrollY
    //   localStorage.setItem('mainPageScrolled', this.scrolled)
    //   if ((this.scrolled > this.loadBorder) && this.isShow === false) {
    //     this.$root.$emit('loadPosts')
    //   }
    // })
  },
  methods: {
    loadPosts () {
      document.querySelector('footer').classList.add('footer__onload')

      this.$root.$emit('loadPosts')
    },
    hide () {
      this.isShow = false
      window.setTimeout(() => {
        document.querySelector('footer').classList.add('footer__onload')
      }, 250)
    }
  }
}
</script>
