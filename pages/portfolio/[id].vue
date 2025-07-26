<template>
  <div></div>
</template>

<script setup>
useHead({
  title: 'Работа портфолио',
  meta: [
    { name: 'description', content: 'Описание работы из портфолио' }
  ]
})

definePageMeta({
  validate: async (route) => {
    // Проверяем что id существует, но не проверяем его валидность в БД
    return !!route.params.id
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