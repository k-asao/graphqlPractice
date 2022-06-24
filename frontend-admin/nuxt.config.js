import * as fs from 'fs'
import * as path from 'path'
import colors from 'vuetify/es5/util/colors'

let serverOptions = {}
if (process.env.NODE_ENV === 'localhost') {
  if (process.env.HTTPS_DISABLED !== '1') {
    serverOptions = {
      ...serverOptions,
    }
  }
}

export default {
  srcDir: 'src',

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  server: {
    ...serverOptions,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: `%s`,
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/admin/favicon.ico' }],
    script: [
      { src: 'https://static.line-scdn.net/liff/edge/2/sdk.js' },
      { src: 'https://unpkg.com/vconsole/dist/vconsole.min.js' },
    ],
  },

  env: {
    STAGE: process.env.STAGE,
    LOGGER_ENABLED: process.env.LOGGER_ENABLED,
    FE_MAIN_LIFF_ID: process.env.FE_MAIN_LIFF_ID,
    LIFF_FE_BACKEND_URL: process.env.LIFF_FE_BACKEND_URL,
    LINE_ACCOUNT_URL: process.env.LINE_ACCOUNT_URL,
    LIFF_FE_CONTENTS_BUCKET: process.env.LIFF_FE_CONTENTS_BUCKET,
    VCONSOLE_ENABLED: process.env.VCONSOLE_ENABLED,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/global.sass', '~/assets/styles/util.sass'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/logger',
    '~/plugins/vconsole.js',
    '~/plugins/error-handler',
    '~/plugins/vee-validate',
    '~/plugins/vue-ctk-date-time-picker',
  ],
  router: {},
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-typed-vuex',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/styles/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    dir: 'dist/admin',
  },
}
