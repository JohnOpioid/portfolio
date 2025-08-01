<template>
  <div class="">
    
    <!-- Фиксированный Sidebar с улучшенной анимацией -->
    <div 
      class="fixed h-full w-64 z-10 transform transition-all duration-200 ease-out"
      :class="{
        '-translate-x-full md:translate-x-0': true,
        'translate-x-0': isSidebarOpen
      }"
    >
      <SideBar />
      
    </div>
    
    <!-- Адаптивный Main контейнер -->
    <main class="flex-1 min-h-screen md:ml-[12.5rem] xl:ml-[17rem] bg-slate-50 dark:bg-slate-700 ">      
      
      <div class="md:hidden sticky top-0 z-10 flex justify-between py-4 px-6 md:px-12 bg-white dark:bg-slate-800 shadow-sm">
        <div class="grow">
            <!-- Кнопка меню с анимированной иконкой -->
            <button 
                @click="toggleSidebar"
                class="md:hidden p-2 text-slate-500 dark:text-slate-400 transition-all duration-200"
                :class="{'left-[calc(16rem+1rem)]': isSidebarOpen}"
            >
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-6 w-6 transition-all duration-200" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                >
                <path 
                    v-if="!isSidebarOpen" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M4 6h16M4 12h16M4 18h16" 
                />
                <path 
                    v-else 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M6 18L18 6M6 6l12 12" 
                />
                </svg>
            </button>
        </div>
        <div class="flex gap-4">
          <Status />
          <ThemeToggle />
        </div>
      </div>
      <!-- Оверлей с плавной анимацией -->
            <transition
                enter-active-class="transition-opacity duration-200 ease-out"
                leave-active-class="transition-opacity duration-200 ease-in"
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
            >
                <div 
                v-if="isSidebarOpen"
                @click="toggleSidebar"
                class="md:hidden fixed inset-0 bg-slate-700/50 bg-opacity-50 z-[5]"
                ></div>
            </transition>

      <NuxtPage />

    </main>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const isSidebarOpen = ref(false);
    const route = useRoute();

    // Функция для управления скроллом
    const toggleBodyScroll = (disable) => {
      if (process.client) {
        document.body.style.overflow = disable ? 'hidden' : '';
        document.body.style.position = disable ? 'fixed' : '';
        document.body.style.width = disable ? '100%' : '';
      }
    };

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
      toggleBodyScroll(isSidebarOpen.value);
    };

    // Закрываем меню при изменении маршрута
    watch(() => route.path, () => {
      if (isSidebarOpen.value) {
        isSidebarOpen.value = false;
        toggleBodyScroll(false);
      }
    });

    // Закрываем меню при изменении размера экрана на desktop
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSidebarOpen.value) {
        isSidebarOpen.value = false;
        toggleBodyScroll(false);
      }
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      // Восстанавливаем скролл при размонтировании компонента
      toggleBodyScroll(false);
    });

    return {
      isSidebarOpen,
      toggleSidebar
    };
  }
};
</script>