<template>
  <nav class="footer-rubrics-cont">
    <a
      v-for="(menuItem, index) in menu"
      :key="menuItem.ID"
      class="rubric-link footer-rubric-link"
      :class="'rubric-' + (index+1)"
      :href="menuItem.url"
    >{{ menuItem.title }}
    </a>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      menu: [],
      active: false
    }
  },
  created () {
    this.menu = this.$store.getters['menu/menu']
  }
}
</script>
