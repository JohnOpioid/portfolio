<script setup>
import { ref } from 'vue'

useHead({
  title: 'Мои контакты',
  meta: [
    { name: 'description', content: 'Описание моей страницы' }
  ]
})

const showForm = ref(false)
const form = ref({
  name: '',
  phone: '',
  email: ''
})

const submitForm = () => {
  // Здесь можно добавить обработку формы
  console.log('Форма отправлена:', form.value)
  
  // Сбрасываем форму и скрываем
  form.value = { name: '', phone: '', email: '' }
  showForm.value = false
}

const contacts = ref([
  {
    icons: [
      { 
        path: '/icon/phone-ring.svg', 
        bgColor: 'bg-green-500' 
      }
    ],
    title: 'Телефон',
    data: '+7 (980) 010-30-03'
  },
  {
    icons: [
      { 
        path: '/icon/envelope.svg', 
        bgColor: 'bg-amber-500' 
      }
    ],
    title: 'E-mail',
    data: 'desjohnone@yandex.ru'
  },
  {
    icons: [
      { 
        path: '/icon/telegram-original.svg', 
        bgColor: 'bg-blue-400' 
      }
    ],
    title: 'Telegram',
    data: '@desjohnone'
  },
])
</script>

<template>

<div class="flex flex-col gap-0 min-h-screen bg-[url(/pattern.svg)] bg-center bg-repeat bg-contain bg-fixed">
  <div class="flex flex-col flex-grow px-6 md:px-12 pt-12 gap-8 w-full xl:max-w-3/4 mx-auto">

    <div class="inline-block p-3 bg-white rounded-lg border border-slate-200/75 text-slate-500 shadow-xs max-w-85">
      <Status />
      <p class="mt-2 font-bold text-slate-600 text-lg">Ниже представлены мои контакты. Пишите, звоните не стесняйтесь. Я всегда на связи.</p>
      <p class="mt-2">🌙 <span class="italic text-slate-500 font-light text-lg">Да-да, даже ночью...</span></p>
    </div>

    <div class="max-w-70">
      <div class="p-1.5 bg-white rounded-lg border border-slate-200/75 text-slate-500 shadow-xs">
        <div class="flex flex-col ">
          <div 
          v-for="(contact, index) in contacts" 
            :key="index"
            class="flex gap-3 cursor-pointer rounded hover:bg-slate-100 p-2.5"
          >
            <a 
              v-for="(icon, iconIndex) in contact.icons" 
              href="#"
              :key="iconIndex"
              class="aspect-square p-2 flex items-center justify-center w-12 h-12 rounded relative"
              :class="icon.bgColor || contact.bgColor || 'bg-slate-500'"
            >
              <img 
                :src="icon.path" 
                class="w-6 h-6"
                :class="icon.class || ''"
              >
            </a>
            <div class="block">
              <div class="text-slate-400">{{ contact.title }}</div>
              <div class="font-semibold text-slate-600">{{ contact.data }}</div>
            </div>
          </div>
          <p class="p-1.5 text-slate-500 font-light text-lg">Вы можете скачать мою цифровую визитку, нажав на кнопку ниже. 👇</p>
        </div>
      </div>
      <button type="button" class="block w-full bg-indigo-400/75 hover:bg-indigo-500/75 text-slate-50 font-semibold rounded py-2 px-4 mt-2 cursor-pointer">Сохранить визитку</button>
    </div>

    <div class="inline-block max-w-75 bg-white rounded-lg border border-slate-200/75 text-slate-500 shadow-xs overflow-hidden">
      <div class="bg-slate-200/75 p-4 w-full max-w-75"><img src="/QR.svg" alt=""></div>
      <p class="p-3 max-full text-slate-500 font-light text-lg">По этому QR-коду можно перейти в мой Telegram канал. Не забудь подписаться. ☺️</p>
    </div>

    <!--Раздел обратной связи-->
    <div class="inline-flex items-center justify-center w-full">
      <hr class="w-full h-px my-8 bg-slate-200 border-0 dark:bg-gray-700">
      <span class="absolute px-6 py-1 text-sm font-medium text-nowrap text-slate-400 -translate-x-1/2 md:ms-20 lg:ms-40 bg-white left-1/2 dark:text-white dark:bg-gray-900 rounded-full border border-slate-200 uppercase">Обратная связь</span>
    </div>
    <div class="flex flex-col gap-8 ">
      <div class="inline-block lg:max-w-2/3 xl:max-w-3/7 bg-white rounded-lg border border-slate-200/75 text-slate-500 shadow-xs overflow-hidden">
        <p class="p-3 max-full text-slate-500 font-light text-lg">Вы можете описать свою задачу, заполнив форму обратной связи. Постараюсь не пропустить ваше письмо и ответить как можно быстрее. 🤭</p>
      </div>

      <div class="inline-block max-w-60 bg-transparent rounded-lg text-slate-500 overflow-hidden">
        <img src="/Sticker.png" alt="">
      </div>

      <div class="sticky bottom-4">
        <FormMail />
      </div>
    </div>

  </div>




</div>

</template>

<style scoped>

</style>