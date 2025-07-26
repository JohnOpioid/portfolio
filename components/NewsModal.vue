<template>
  <Transition 
    name="modal"
    @after-enter="lockBodyScroll"
    @after-leave="unlockBodyScroll"
  >
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
    >
      <div class="fixed inset-0 bg-slate-700/50" @click="$emit('close')"></div>
      
      <!-- Фиксированные кнопки навигации -->
      <button 
        @click="$emit('navigate', index - 1)"
        class="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-lg transition-all"
        :class="{'opacity-50 cursor-default': index <= 0, 'hover:scale-110': index > 0}"
        :disabled="index <= 0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        @click="$emit('navigate', index + 1)"
        class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-lg transition-all"
        :class="{'opacity-50 cursor-default': index >= total - 1, 'hover:scale-110': index < total - 1}"
        :disabled="index >= total - 1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Контент модального окна -->
      <div class="flex items-center justify-center min-h-full p-3">
        <div 
          class="relative w-full max-w-3xl"
          :class="{'transition-transform duration-300': !isSwiping, 'transition-none': isSwiping}"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
          :style="{ transform: `translateX(${offsetX}px)` }"
        >


          <div v-if="news.image" class="mb-4 w-full max-w-68 aspect-square">
              <img :src="news.image" :alt="news.title" class="w-full rounded-lg">
          </div>
          <button @click="$emit('close')" class="fixed top-0 right-0 z-[1000] w-8 h-8 flex items-center justify-center bg-white/80 rounded-full hover:bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
          </button>

          <div class="bg-white rounded-lg shadow-xl p-6">
            <h2 class="text-2xl font-bold text-slate-700 mb-4">{{ news.title }}</h2>
            <div class="prose text-slate-500 font-light text-lg" v-html="news.content"></div>
          </div>

          <!-- Кнопки навигации для мобильных -->
            <div class="flex justify-center md:hidden p-4 w-full">
              <div class="flex gap-8 ">
                <!--
                <button 
                  @click="$emit('navigate', index - 1)"
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-lg transition-all z-10"
                  :class="{'opacity-50': index <= 0}"
                  :disabled="index <= 0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  
                </button>
                -->
                <div class="text-slate-200 flex items-center">
                  Можно свайпом листать :)
                </div>
                <!--
                <button 
                  @click="$emit('navigate', index + 1)"
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-lg transition-all z-10"
                  :class="{'opacity-50': index >= total - 1}"
                  :disabled="index >= total - 1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                -->
              </div>
            </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  news: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'navigate', 'swipe-left', 'swipe-right'])

const touchStartX = ref(0)
const offsetX = ref(0)
const isSwiping = ref(false)
const scrollPosition = ref(0)

const lockBodyScroll = () => {
  scrollPosition.value = window.pageYOffset || document.documentElement.scrollTop
  document.documentElement.style.overflow = 'hidden'
  document.documentElement.style.position = 'fixed'
  document.documentElement.style.top = `-${scrollPosition.value}px`
  document.documentElement.style.width = '100%'
}

const unlockBodyScroll = () => {
  document.documentElement.style.overflow = ''
  document.documentElement.style.position = ''
  document.documentElement.style.top = ''
  document.documentElement.style.width = ''
  window.scrollTo(0, scrollPosition.value)
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    lockBodyScroll()
  } else {
    unlockBodyScroll()
  }
})

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
  isSwiping.value = true
}

const handleTouchMove = (e) => {
  if (!isSwiping.value) return
  const currentX = e.touches[0].clientX
  offsetX.value = currentX - touchStartX.value
}

const handleTouchEnd = (e) => {
  if (!isSwiping.value) return
  
  const touchEndX = e.changedTouches[0].clientX
  const diff = touchStartX.value - touchEndX
  const threshold = 100
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0 && props.index < props.total - 1) {
      emit('swipe-left')
    } else if (diff < 0 && props.index > 0) {
      emit('swipe-right')
    }
  }
  
  isSwiping.value = false
  offsetX.value = 0
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-slide-next-enter-active,
.modal-slide-next-leave-active,
.modal-slide-prev-enter-active,
.modal-slide-prev-leave-active {
  transition: all 0.4s ease;
}

.modal-slide-next-enter-from {
  transform: translateX(100%);
}
.modal-slide-next-leave-to {
  transform: translateX(-100%);
}

.modal-slide-prev-enter-from {
  transform: translateX(-100%);
}
.modal-slide-prev-leave-to {
  transform: translateX(100%);
}
</style>