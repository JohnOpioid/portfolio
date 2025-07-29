<template>
  <div class="h-full content-center min-h-full">
    <div class="flex flex-col gap-1 px-6 md:px-12 py-6 pt-15 w-full xl:max-w-3/4 mx-auto content-center">
      <div class="text-slate-500 font-bold text-2xl uppercase">Мои работы</div>
      <p class="w-full text-slate-500 font-light text-xl">Выложена только часть моих работ на остальные наложен NDA. По мере возможности буду дополнять портфолио.</p>
    </div>

    <!-- Грид с работами -->
    <div v-if="portfolioItems && portfolioItems.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 py-6 mb-12 w-full xl:max-w-3/4 mx-auto">
      <div 
        v-for="(item, index) in portfolioItems" 
        :key="item._id" 
        class="flex flex-col items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
        @click="openModal(index)"
      >
        <div class="bg-slate-200 w-full aspect-square rounded-lg overflow-hidden">
          <img 
            v-if="item.coverImage" 
            :src="getFullImageUrl(item.coverImage)" 
            :alt="item.title" 
            class="w-full h-full object-cover rounded-lg transition-transform duration-500 hover:scale-110"
            loading="lazy"
          >
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div class="text-slate-400 text-lg font-normal">{{ item.title }}</div>
      </div>
    </div>
    <div v-else class="text-center py-12">
      {{ loading ? 'Загрузка работ...' : 'Работы не найдены' }}
    </div>

    <!-- Модальное окно -->
    <ClientOnly>
      <PortfolioModal 
        v-if="portfolioItems.length"
        :is-open="isModalOpen"
        :item="currentItem" 
        :index="currentIndex" 
        :total="portfolioItems.length" 
        @close="closeModal"
        @navigate="navigateToItem"
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
    { name: 'description', content: 'Описание моего портфолио' }
  ]
})

const portfolioItems = ref([])
const loading = ref(true)
const isModalOpen = ref(false)
const currentIndex = ref(0)
const route = useRoute()

// Функция для получения полного URL изображения
const getFullImageUrl = (path) => {
  if (!path) return ''
  return path.startsWith('http') ? path : `https://desjo.ru${path}`
}

// Загрузка данных
const fetchPortfolioItems = async () => {
  try {
    loading.value = true
    const response = await fetch('https://desjo.ru/api/portfolio')
    if (!response.ok) throw new Error('Ошибка загрузки')
    const data = await response.json()
    portfolioItems.value = Array.isArray(data) ? data : []
    
    // Автоматическое открытие модалки при наличии query параметра
    if (route.query.id) {
      const index = portfolioItems.value.findIndex(item => item._id === route.query.id)
      if (index !== -1) {
        currentIndex.value = index
        isModalOpen.value = true
      }
    }
  } catch (error) {
    console.error('Ошибка загрузки работ:', error)
    portfolioItems.value = []
  } finally {
    loading.value = false
  }
}

// Инициализация
onMounted(async () => {
  await fetchPortfolioItems()
})

const currentItem = computed(() => {
  if (!portfolioItems.value.length) return {}
  const item = portfolioItems.value[currentIndex.value] || {}
  // Добавляем полный URL для изображения в текущем элементе
  return {
    ...item,
    coverImage: item.coverImage ? getFullImageUrl(item.coverImage) : null,
    content: item.content || []
  }
})

const openModal = (index) => {
  if (index < 0 || index >= portfolioItems.value.length) return
  currentIndex.value = index
  isModalOpen.value = true
  // Обновляем URL без перезагрузки страницы
  window.history.pushState({}, '', `/portfolio?id=${portfolioItems.value[index]._id}`)
}

const closeModal = () => {
  isModalOpen.value = false
  window.history.pushState({}, '', '/portfolio')
}

const navigateToItem = (index) => {
  if (index < 0 || index >= portfolioItems.value.length) return
  currentIndex.value = index
  isModalOpen.value = true
  window.history.pushState({}, '', `/portfolio?id=${portfolioItems.value[index]._id}`)
}

// Обработка изменения URL
watch(() => route.query.id, (newId) => {
  if (newId && portfolioItems.value.length) {
    const index = portfolioItems.value.findIndex(item => item._id === newId)
    if (index !== -1) {
      currentIndex.value = index
      isModalOpen.value = true
    }
  }
})

// Обработка свайпов
const handleSwipeLeft = () => {
  if (currentIndex.value < portfolioItems.value.length - 1) {
    navigateToItem(currentIndex.value + 1)
  }
}

const handleSwipeRight = () => {
  if (currentIndex.value > 0) {
    navigateToItem(currentIndex.value - 1)
  }
}
</script>