<template>
  <div class="h-full">
    <!-- Грид с новостями -->
    <div v-if="newsList && newsList.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 py-12 mb-12 w-full xl:max-w-3/4 mx-auto content-center min-h-full">
      <div 
        v-for="(news, index) in newsList" 
        :key="news.id" 
        class="flex flex-col items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
        @click="openModal(index)"
      >
        <div class="bg-slate-200 w-full aspect-square rounded-lg overflow-hidden">
          <img 
            v-if="news.image" 
            :src="news.image" 
            :alt="news.title" 
            class="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-110"
          >
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div class="text-slate-400 text-lg font-normal">{{ news.title }}</div>
      </div>
    </div>
    <div v-else class="text-center py-12">
      {{ loading ? 'Загрузка новостей...' : 'Новости не найдены' }}
    </div>

    <!-- Модальное окно -->
    <ClientOnly>
      <NewsModal 
        :is-open="isModalOpen"
        :news="currentNews" 
        :index="currentIndex" 
        :total="newsList.length" 
        @close="closeModal"
        @navigate="navigateToNews"
        @swipe-left="handleSwipeLeft"
        @swipe-right="handleSwipeRight"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

useHead({
  title: 'Мое портфолио',
  meta: [
    { name: 'description', content: 'Описание моей страницы' }
  ]
})

const newsList = ref([])
const loading = ref(true)
const isModalOpen = ref(false)
const currentIndex = ref(0)
const route = useRoute()

// Загрузка данных
const fetchNews = async () => {
  try {
    const response = await fetch('http://desjo.ru/api/news')
    if (!response.ok) throw new Error('Ошибка загрузки')
    const data = await response.json()
    newsList.value = data || []
    
    // Проверяем параметр из query после загрузки данных
    if (route.query.id) {
      const index = newsList.value.findIndex(news => news.id.toString() === route.query.id)
      if (index !== -1) {
        currentIndex.value = index
        isModalOpen.value = true
      }
    }
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error)
    newsList.value = []
  } finally {
    loading.value = false
  }
}

// Инициализация
onMounted(async () => {
  await fetchNews()
})

const currentNews = computed(() => newsList.value[currentIndex.value] || {})

const openModal = (index) => {
  currentIndex.value = index
  isModalOpen.value = true
  window.history.pushState({}, '', `/portfolio?id=${newsList.value[index].id}`)
}

const closeModal = () => {
  isModalOpen.value = false
  window.history.pushState({}, '', '/portfolio')
}

const navigateToNews = (index) => {
  currentIndex.value = index
  window.history.pushState({}, '', `/portfolio?id=${newsList.value[index].id}`)
}

// Обработка изменения маршрута
watch(() => route.query.id, (newId) => {
  if (newId && newsList.value.length) {
    const index = newsList.value.findIndex(news => news.id.toString() === newId)
    if (index !== -1) {
      currentIndex.value = index
      isModalOpen.value = true
    }
  }
})

// Обработка свайпов
const handleSwipeLeft = () => {
  if (currentIndex.value < newsList.value.length - 1) {
    navigateToNews(currentIndex.value + 1)
  }
}

const handleSwipeRight = () => {
  if (currentIndex.value > 0) {
    navigateToNews(currentIndex.value - 1)
  }
}
</script>