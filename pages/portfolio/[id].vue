<template>
  <div></div>
</template>

<script setup>
useHead({
  title: 'Новость',
  meta: [
    { name: 'description', content: 'Описание моей страницы' }
  ]
})

definePageMeta({
  validate: async (route) => {
    const id = parseInt(route.params.id)
    return !isNaN(id)
  }
})

const route = useRoute()
const router = useRouter()

onMounted(() => {
  // Перенаправляем на главную страницу с параметром
  router.replace({
    path: '/portfolio',
    query: { id: route.params.id }
  })
})
</script>