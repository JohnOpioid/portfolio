export default defineNuxtRouteMiddleware((to) => {
  if (to.path.includes('.well-known/appspecific/com.chrome.devtools.json')) {
    return abortNavigation()
  }
})