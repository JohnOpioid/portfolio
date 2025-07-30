<script setup>
const skills = ref([
  {
    icons: [
      { 
        path: '/icon/figma.svg', 
        alt: 'Figma', 
        class: 'filter brightness-0 invert',
        bgColor: 'bg-slate-500' 
      }
    ],
    title: 'Дизайн-инструменты',
    description: 'Уверенное владение Figma для создания прототипов и дизайна интерфейсов'
  },
  {
    icons: [
      { 
        path: '/icon/html5.svg',
        bgColor: 'bg-orange-500'
      },
      { 
        path: '/icon/css3.svg',
        bgColor: 'bg-blue-400'
      }
    ],
    title: 'Веб-технологии',
    description: 'HTML, CSS, JavaScript для реализации дизайн-решений'
  },
  {
    icons: [
      { 
        path: '/icon/tailwindcss.svg',
        bgColor: 'bg-sky-300'
      },
      { 
        path: '/icon/bootstrap-5.svg',
        bgColor: 'bg-violet-500'
      }
    ],
    title: 'Фреймворки',
    description: 'Опыт работы с Bootstrap и Tailwind CSS для создания адаптивных веб-интерфейсов'
  }
])

const skillsMini = ref(['UI/UX', 'Wireframes', 'Прототипирование', 'Исследования', 'Landing Page', 'Мобильные приложения', 'WEB App'].map(title => ({title})))

</script>

<template>
    <div class="flex flex-col gap-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <div 
            v-for="(skill, index) in skills" 
            :key="index"
            class="flex flex-col gap-4"
            >
            <!-- Контейнер для иконок -->
            <div class="flex gap-2">
                <!-- Отдельный контейнер для каждой иконки со своим цветом -->
                <div 
                v-for="(icon, iconIndex) in skill.icons" 
                :key="iconIndex"
                class="aspect-square p-2 flex items-center justify-center w-10 h-10 rounded relative"
                :class="icon.bgColor || skill.bgColor || 'bg-slate-500'"
                >
                <img 
                    :src="icon.path" 
                    class="w-full h-full"
                    :alt="icon.alt || skill.title"
                    :class="icon.class || ''"
                >
                </div>
            </div>
            
            <div class="flex flex-col gap-1">
                <div class="text-slate-700 dark:text-slate-200 font-medium uppercase">{{ skill.title }}</div>
                <p class="text-slate-500 dark:text-slate-300 font-light text-md">{{ skill.description }}</p>
            </div>
            </div>
        </div>
        <div class="flex flex-wrap gap-3">
            <div class="bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-400 rounded py-1 px-3"
                v-for="(skill, index) in skillsMini" 
                :key="index"
            >{{ skill.title }}</div>
        </div>
        <div class="uppercase text-slate-300 text-xs max-w-2/3 xl:max-w-1/3">список будет пополняться, когда нучусь еще чему-нибудь, а учусь я быстро. P.S. Этот сайт так же разработал с нуля.</div>
    </div>
</template>