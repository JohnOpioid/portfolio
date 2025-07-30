<script setup>
import { useHead } from '#imports';

useHead({
  title: 'Обо мне',
  meta: [
    { 
      name: 'description', 
      content: 'Молодой специалист в области UI/UX дизайна с опытом работы более года. Специализируюсь на создании удобных и эстетичных интерфейсов.' 
    }
  ]
});
</script>

<template>
  <!-- Основное содержимое -->
    <div class="flex flex-col px-6 py-6 md:px-12 md:py-0 gap-8 w-full xl:max-w-7xl mx-auto min-h-screen md:h-full md:justify-center">
      <!-- Блок с заголовком и описанием -->
      <div class="flex flex-col gap-8">
        <div>
          <span class="text-slate-500 font-semibold text-xl uppercase">
            UX/UI - дизайнер
          </span>
          <div class="mt-2">
            <img 
              src="/logo-text.svg" 
              alt="Логотип" 
              class="max-w-full h-auto"
            >
          </div>
        </div>
        
        <p class="w-full text-slate-500 font-light text-xl">
          Молодой специалист в области UI/UX дизайна с опытом работы более года. 
          Специализируюсь на создании удобных и эстетичных интерфейсов, 
          разработке пользовательских решений и прототипировании.
        </p>
      </div>
      
      <!-- Блок с навыками -->
      <div class="flex flex-col gap-6 mt-6">
        <div class="text-slate-700 font-bold text-xl uppercase">
          Могу, умею, практикую
        </div>
        <Skills />
      </div>
    </div>
</template>

<style scoped>
/* Можно добавить кастомные стили при необходимости */
</style>