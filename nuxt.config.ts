// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  colorMode: {
    preference: 'system', // по умолчанию
    fallback: 'light',
    classSuffix: ''
  },

  server: {
    headers: {
      '/signature.js': [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Content-Type', value: 'application/javascript' }
      ]
    }
  },

  generate: {
    assets: {
      version: 'v1' // Добавит хеш к URL
    }
  }
})
