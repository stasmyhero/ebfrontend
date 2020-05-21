<template>
  <div v-show="isShow" class="button-showmore-wrapper" @hideButton="hide()">
    <button class="big-button button-showmore" @click.prevent="loadPosts()">
      Показать ещё
    </button>
  </div>
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
      isShow: true
    }
  },
  mounted () {
    this.$root.$on('loadingOver', () => {
      this.isShow = false
    })
  },
  methods: {
    loadPosts () {
      console.log('click')
      this.$root.$emit('loadPosts')
    },
    hide () {
      this.isShow = false
    }
  }
}
</script>
