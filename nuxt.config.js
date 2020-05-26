
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  cache: true,
  head: {
    title: 'ЭльбрусПресс',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Новостной сайт ЭльбрусПресс'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon-2.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap' }
    ]
  },
  router: {
    linkActiveClass: 'header-rubric-link-active'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: '~static/style.css' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/infiniteloading', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxyHeaders: false,
    credentials: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
