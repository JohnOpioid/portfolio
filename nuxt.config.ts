import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  routeRules: {
    '/.well-known/**': { ssr: false }
  },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' }
  },
  nitro: {
    prerender: {
      ignore: [
        '/news/0',
        '/news/1', 
        '/news/2',
        '/news/3',
        '/news/4',
        '/news/5'
      ]
    }
  }
});