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
  console.log('Форма отправлена:', form.value)
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
    data: '+7 (980) 010-30-03',
    type: 'phone'
  },
  {
    icons: [
      { 
        path: '/icon/envelope.svg', 
        bgColor: 'bg-amber-500' 
      }
    ],
    title: 'E-mail',
    data: 'message@johnone.ru',
    type: 'email'
  },
  {
    icons: [
      { 
        path: '/icon/telegram-original.svg', 
        bgColor: 'bg-blue-400' 
      }
    ],
    title: 'Telegram',
    data: '@desjohnone',
    type: 'telegram'
  },
])

const handleContactClick = (contact) => {
  switch(contact.type) {
    case 'phone':
      window.location.href = `tel:${contact.data.replace(/[^0-9+]/g, '')}`
      break
    case 'email':
      window.location.href = `mailto:${contact.data}`
      break
    case 'telegram':
      window.open(`https://t.me/${contact.data.replace('@', '')}`, '_blank')
      break
  }
}

const downloadVCard = () => {
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:Евгений Одинцов (Desjo)`,
    `TEL;TYPE=CELL:${contacts.value[0].data.replace(/[^0-9+]/g, '')}`,
    `EMAIL:${contacts.value[1].data}`,
    `URL:https://desjo.ru`,
    `URL:https://t.me/${contacts.value[2].data.replace('@', '')}`,
    `NOTE:Telegram: @desjohnone`,
    'END:VCARD'
  ].join('\n')

  const blob = new Blob([vCardData], { type: 'text/vcard' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = 'desjo_contact.vcf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<template>
<div class="flex flex-col gap-0 min-h-screen bg-[url(/pattern.svg)] dark:bg-[url(/pattern-dark.svg)] bg-center bg-repeat bg-contain bg-fixed">
  <div class="flex flex-col px-6 py-8 md:px-12 gap-8 w-full xl:max-w-7xl mx-auto">

    <div class="inline-block max-w-60 bg-transparent rounded-lg text-slate-500 overflow-hidden">
      <img src="/Sticker_4.png" alt="">
    </div>

    <div class="inline-block p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/75 dark:border-slate-700 text-slate-500 dark:text-slate-300 shadow-xs w-full md:max-w-md">
      <p class="font-bold text-slate-600 dark:text-slate-200 text-lg">Ниже представлены мои контакты. Пишите, звоните не стесняйтесь. Я всегда на связи.</p>
      <p class="mt-2">🌙 <span class="italic text-slate-500 dark:text-slate-300 font-light text-lg">Да-да, даже ночью...</span></p>
    </div>

    <div class="w-full md:max-w-md">
      <div class="p-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/75 dark:border-slate-700 text-slate-500 dark:text-slate-300 shadow-xs">
        <div class="flex flex-col">
          <div 
            v-for="(contact, index) in contacts" 
            :key="index"
            class="flex gap-3 cursor-pointer rounded hover:bg-slate-100 dark:hover:bg-slate-700 p-2.5"
            @click="handleContactClick(contact)"
          >
            <div 
              v-for="(icon, iconIndex) in contact.icons" 
              :key="iconIndex"
              class="aspect-square p-2 flex items-center justify-center w-12 h-12 rounded relative"
              :class="icon.bgColor || contact.bgColor || 'bg-slate-500'"
            >
              <img 
                :src="icon.path" 
                class="w-6 h-6"
                :class="icon.class || ''"
              >
            </div>
            <div class="block">
              <div class="text-slate-400 dark:text-slate-300">{{ contact.title }}</div>
              <div class="font-semibold text-slate-600 dark:text-slate-200">{{ contact.data }}</div>
            </div>
          </div>
          <p class="p-1.5 text-slate-500 dark:text-slate-200 font-light text-lg">Вы можете скачать мою цифровую визитку, нажав на кнопку ниже. 👇</p>
        </div>
      </div>
      <button 
        type="button" 
        class="block w-full bg-indigo-500 hover:bg-indigo-400 text-slate-50 font-semibold rounded py-2 px-4 mt-2 cursor-pointer"
        @click="downloadVCard"
      >
        Сохранить визитку
      </button>
    </div>

    <div class="hidden md:inline-block w-full md:max-w-md bg-white dark:bg-slate-800 rounded-lg border border-slate-200/75 dark:border-slate-700 text-slate-500 dark:text-slate-300 shadow-xs overflow-hidden">
      <div class="bg-slate-200/75 dark:bg-slate-900 p-4 w-full max-w-75"><img src="/QR.svg" alt=""></div>
      <p class="p-3 max-full text-slate-500 dark:text-slate-300 font-light text-lg">Отсканируйте этот QR-код, чтобы сохранить мои контакты к себе на телефон. ☺️</p>
    </div>
  </div>

  <div class="inline-flex items-center justify-center w-full">
      <hr class="w-full h-px my-20 bg-slate-200 dark:bg-slate-800 border-0">
      <span class="absolute px-6 py-1 text-sm font-medium text-nowrap text-slate-400 dark:text-slate-500 -translate-x-1/2 md:ms-20 lg:ms-40 bg-white dark:bg-slate-800 left-1/2 rounded-full border border-slate-200 dark:border-slate-800 uppercase">Обратная связь</span>
  </div>

  <div class="flex flex-col px-6 py-6 md:px-12 gap-8 w-full xl:max-w-7xl mx-auto">
    <div class="flex flex-col gap-8">
      <!--Раздел обратной связи-->
      <div class="inline-block md:max-w-md bg-white dark:bg-slate-800 rounded-lg border border-slate-200/75 dark:border-slate-700 text-slate-500 dark:text-slate-300 shadow-xs overflow-hidden">
        <p class="p-3 max-full text-slate-500 dark:text-slate-300 font-light text-lg">Вы можете описать свою задачу, заполнив форму обратной связи. Постараюсь не пропустить ваше письмо и ответить как можно быстрее. 🤭</p>
      </div>

      <div class="inline-block max-w-60 bg-transparent rounded-lg text-slate-500 overflow-hidden">
        <img src="/Sticker.png" alt="">
      </div>
    </div>
    <div class="sticky bottom-4">
        <FormMail />
    </div>
  </div>
</div>
</template>

<style scoped>
</style>