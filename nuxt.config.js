
export default {
  mode: 'universal',
  cache: true,
  env: {
    baseTitle: 'ЭльбрусПресс - '
  },
  filenames: {
  },
  head: {
    title: 'ЭльбрусПресс - Главная',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Новостной сайт ЭльбрусПресс' },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'icons/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'icons/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', size: '32x32', href: 'icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', size: '16x16', href: 'icons/favicon-16x16.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap' }
    ]
  },
  router: {
    linkActiveClass: 'header-rubric-link-active',
    middleware: 'header'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'var(--Orange100)' },
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
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/device'
    // { defaultUserAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36' }
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      'gsap'
    ]
  }
}
