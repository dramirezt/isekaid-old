export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'isekai-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/styles.scss',
    'swiper/css/swiper.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-inline-svg',
    '~/plugins/vue-awesome-swiper'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    { path: '~/components/cards', extensions: ['vue'] },
    { path: '~/components/character', extensions: ['vue'] },
    { path: '~/components/combat', extensions: ['vue'] },
    { path: '~/components/dice', extensions: ['vue'] },
    { path: '~/components/create-character', extensions: ['vue'] }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n'
  ],
  
  i18n: {
    /* module options */
    locales: ['es'],
    defaultLocale: 'es',
    vueI18n: {
      fallbackLocale: 'es',
      messages: {
        es: require('./locale/es.json'),
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  
  target: 'static',
  router: {
    base: '/<repository-name>/'
  }
}
