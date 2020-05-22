<template>
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
</template>

<script>
import axios from 'axios'
import urls from '@/assets/js/url'

export default {
  name: 'Navbar',
  data () {
    return {
      menu: [],
      activeItem: false,
      baseURL: urls.baseURL
    }
  },
  // computed: {
  //   classObject: () => {
  //     return {
  //       active: this.activeItem ===
  //     }
  //   }
  // },
  beforeMount () {
    if (this.getFromStore() === false) {
      this.load()
    }
  },
  methods: {
    setActive (index) {
      this.activeItem = parseInt(index, 10)
    },
    load () {
      const request = {
        endpoint: urls.restURL + '/menu/',
        headers: {
          ContentType: 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
      axios.get(request.endpoint, request.headers)
        .then((response) => {
          if (response.data) {
            this.menu = response.data
            localStorage.setItem('menuItems', JSON.stringify(this.menu))
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getFromStore () {
      if (localStorage.getItem('menuItems') !== null) {
        this.menu = JSON.parse(localStorage.getItem('menuItems'))
      } else {
        return false
      }
    }
  }
}
</script>
