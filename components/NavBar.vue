<template>
  <nav class="header-rubrics-cont">
    <a
      v-for="(menuItem, index) in menu"
      :key="menuItem.ID"
      class="rubric-link header-rubric-link"
      :class="'rubric-' + (index+1)"
      :href="menuItem.url"
    >{{ menuItem.title }}
    </a>
  </nav>
</template>

<script>
import axios from 'axios'
import urls from '../assets/js/url'

export default {
  name: 'Navbar',
  data () {
    return {
      menu: [],
      active: false
    }
  },
  created () {
    const request = {
      endpoint: urls.restURL + '/menu/',
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json'
      }
    }
    axios.get(request.endpoint, request.headers)
      .then((response) => {
        if (response.data) {
          this.menu = response.data
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
