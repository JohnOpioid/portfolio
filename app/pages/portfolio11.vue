<template>
  <div>
    <!-- Грид с новостями -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12 py-12 mb-12 w-full xl:max-w-7xl mx-auto content-center min-h-full">
      <NuxtLink 
        v-for="(news, index) in newsList" 
        :key="index" 
        :to="`/news/${index}`"
        class="flex flex-col items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
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
        <div class="text-slate-500 font-medium">{{ news.title }}</div>
      </NuxtLink>
    </div>

    <!-- Модальное окно с анимацией -->
    <Transition name="modal">
      <div 
        v-if="isModalOpen" 
        class="fixed inset-0 z-50 overflow-y-auto"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <!-- Затемнение фона -->
        <div 
          class="fixed inset-0 bg-slate-700/50 bg-opacity-50 transition-opacity duration-300" 
          @click="closeModal"
        ></div>
        
        <!-- Контент модального окна -->
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <Transition
            name="modal-content"
            appear
          >
            <div 
              v-if="isModalOpen"
              class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              :style="swipeStyle"
              ref="modalContent"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div class="flex justify-between items-start">
                      <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                        {{ currentNews.title }}
                      </h3>
                      <button 
                        @click="closeModal"
                        class="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div class="mt-4">
                      <div v-if="currentNews.image" class="mb-4 rounded-lg overflow-hidden">
                        <img 
                          :src="currentNews.image" 
                          :alt="currentNews.title" 
                          class="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                        >
                      </div>
                      
                      <div class="prose max-w-none">
                        <p class="text-gray-600">{{ currentNews.content }}</p>
                        <p v-if="currentNews.date" class="text-sm text-gray-500 mt-4">
                          Опубликовано: {{ currentNews.date }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <NuxtLink 
                  v-if="currentNewsIndex < newsList.length - 1"
                  :to="`/news/${currentNewsIndex + 1}`"
                  class="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-50 font-semibold focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                >
                  Следующая
                </NuxtLink>
                <button 
                  type="button" 
                  @click="closeModal"
                  class="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-50 font-semibold focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                >
                  Закрыть
                </button>
                <NuxtLink 
                  v-if="currentNewsIndex > 0"
                  :to="`/news/${currentNewsIndex - 1}`"
                  class="mt-3 w-full inline-flex justify-center rounded-md px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-slate-50 font-semibold focus:outline-none focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                >
                  Предыдущая
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalOpen: false,
      currentNewsIndex: 0,
      touchStartX: 0,
      touchEndX: 0,
      swipeDelta: 0,
      isSwiping: false,
      newsList: [
        {
          title: "Новость 1",
          content: "Подробное описание первой новости. Здесь может быть много текста с описанием события или материала.",
          image: "https://placeholderjs.com/500x500",
          date: "10 января 2023"
        },
        {
          title: "Новость 2",
          content: "Подробное описание второй новости. Различные детали и информация о событии.",
          image: "https://placeholderjs.com/500x500",
          date: "15 февраля 2023"
        },
        {
          title: "Новость 3",
          content: "Третья новость с интересными фактами и подробностями.",
          image: "https://placeholderjs.com/500x500",
          date: "20 марта 2023"
        },
        {
          title: "Новость 4",
          content: "Четвертая новость в нашем списке с важной информацией.",
          date: "5 апреля 2023"
        },
        {
          title: "Новость 5",
          content: "Пятая новость без изображения, но с текстовым содержанием.",
          date: "12 мая 2023"
        },
        {
          title: "Новость 6",
          content: "Шестая новость завершает наш список примеров.",
          image: "https://placeholderjs.com/500x500",
          date: "18 июня 2023"
        }
      ]
    }
  },
  computed: {
    swipeStyle() {
      return {
        transform: `translateX(${this.swipeDelta}px)`,
        transition: this.isSwiping ? 'none' : 'transform 0.3s ease'
      }
    },
    currentNews() {
      return this.newsList[this.currentNewsIndex] || {}
    }
  },
  watch: {
  '$route.params.id': {
    immediate: true,
    handler(newId) {
      if (newId !== undefined) {
        const index = Number(newId)
        // Проверяем что это число, в пределах массива и не NaN
        if (!isNaN(index) && index >= 0 && index < this.newsList.length) {
          this.currentNewsIndex = index
          this.openModal(index)
        } else {
          // Если некорректный ID, перенаправляем на первую новость или закрываем
          this.$router.replace('/news/0').catch(() => {})
        }
      }
    }
  }
},
  methods: {
    openModal(index) {
      this.currentNewsIndex = index
      this.isModalOpen = true
      document.body.style.overflow = 'hidden'
      // Обновляем URL без перезагрузки страницы
      if (process.client) {
        window.history.pushState({}, '', `/news/${index}`)
      }
    },
    closeModal() {
      this.isModalOpen = false
      this.swipeDelta = 0
      document.body.style.overflow = ''
      // Возвращаем URL на предыдущий при закрытии
      if (process.client) {
        window.history.pushState({}, '', '/')
      }
    },
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX
      this.isSwiping = true
    },
    handleTouchMove(e) {
      this.touchEndX = e.changedTouches[0].screenX
      this.swipeDelta = this.touchEndX - this.touchStartX
    },
    handleTouchEnd() {
      this.isSwiping = false
      
      // Определяем был ли это свайп (минимум 50px)
      if (Math.abs(this.swipeDelta) > 50) {
        if (this.swipeDelta > 0 && this.currentNewsIndex > 0) {
          // Свайп вправо - предыдущая новость
          this.$router.push(`/news/${this.currentNewsIndex - 1}`)
        } else if (this.swipeDelta < 0 && this.currentNewsIndex < this.newsList.length - 1) {
          // Свайп влево - следующая новость
          this.$router.push(`/news/${this.currentNewsIndex + 1}`)
        }
      }
      
      // Сброс позиции
      this.swipeDelta = 0
      this.touchStartX = 0
      this.touchEndX = 0
    }
  }
}
</script>

<style>
/* Анимация для модального окна */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Анимация для контента модального окна */
.modal-content-enter-active {
  transition: all 0.3s ease-out;
}

.modal-content-leave-active {
  transition: all 0.2s ease-in;
}

.modal-content-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.modal-content-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

/* Стиль для активных ссылок */
.nuxt-link-active {
  text-decoration: none;
}
</style>