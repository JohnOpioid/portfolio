<template>
  <div>
    <!-- Overlay -->
    <transition name="fade">
      <div 
        v-if="showForm"
        @click="closeForm"
        class="fixed inset-0 bg-slate-700/20 bg-opacity-50 z-10 pt-[2rem] pb-[4.5rem]"
      ></div>
    </transition>

    <!-- Form -->
    <transition name="slide-up">
      <div 
        v-if="showForm"
        class="fixed bottom-[7rem] left-0 bg-white p-6 border-t border-slate-200/75 z-20 mx-6 rounded-lg shadow-sm max-w-full md:max-w-80 md:ml-[16rem] xl:ml-[33rem] flex flex-col items-center"
      >
        <transition name="fade" mode="out-in">
          <!-- Loading state -->
          <div v-if="isSubmitting" key="loading" class="flex flex-col items-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
            <p class="text-slate-600">Отправка сообщения...</p>
          </div>

          <!-- Success state -->
          <div v-else-if="isSuccess" key="success" class="flex flex-col items-center py-8">
            <div class="flex items-center justify-center bg-green-100 rounded-full h-16 w-16 mb-4">
              <svg class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-slate-800 mb-1">Сообщение отправлено!</h3>
            <p class="text-slate-500 text-center">Мы свяжемся с вами в ближайшее время</p>
            <button 
              @click="closeForm"
              class="mt-6 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors cursor-pointer"
            >
              Хорошо
            </button>
          </div>

          <!-- Form state -->
          <div v-else key="form" class="w-full">
            <div class="flex content-center max-w-3/5 bg-transparent rounded-lg text-slate-500 overflow-hidden mb-4 mx-auto">
              <img src="/Sticker_2.png" alt="">
            </div>
            <p class="max-full pb-4 text-slate-400">Пожалуйста, заполните поля, чтобы я смог Вам ответить.</p>
            
            <div v-if="errorMessage" class="mb-4 text-red-500 text-sm">{{ errorMessage }}</div>
            
            <div class="max-w-full mx-auto space-y-4 w-full">
              <div>
                <input 
                  v-model="form.name"
                  type="text" 
                  placeholder="Ваше имя*" 
                  class="placeholder:text-slate-400"
                  :class="inputClass('name')"
                >
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
              </div>
              
              <div>
                <input 
                  v-model="form.phone"
                  v-phone-mask
                  type="tel" 
                  placeholder="Номер телефона*" 
                  class="placeholder:text-slate-400"
                  :class="inputClass('phone')"
                >
                <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
              </div>
              
              <input 
                v-model="form.email"
                type="email" 
                placeholder="Email (по желанию)"
                class="w-full px-4 py-2 border border-slate-200/75 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
              >

            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- Bottom panel -->
    <div 
      :class="[
        'flex px-6 md:px-6 py-4 rounded-lg border border-slate-200/75 relative z-30 transition-colors duration-200',
        hasMessageError ? 'bg-red-100' : 'bg-white'
      ]"
    >
      <input 
        v-model="form.message"
        @click="openForm"
        @focus="openForm"
        type="text" 
        placeholder="Опишите задачу..." 
        class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-slate-700 placeholder:text-slate-400 focus:outline-none bg-transparent"
      >
      <button 
        @click="handleButtonClick"
        class="cursor-pointer"
        :disabled="isSubmitting"
      >
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.6484 21L10.5 10.5C18.0313 12.7479 25.1333 16.2989 31.5 21C25.1337 25.701 18.0321 29.252 10.5012 31.5L13.6484 21ZM13.6484 21H22.2946" 
                :stroke="isSubmitting ? '#94a3b8' : '#62748E'" 
                stroke-width="1.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, nextTick } from 'vue'

export default {
  directives: {
    'phone-mask': {
      mounted(el) {
        el.addEventListener('input', function(e) {
          const numbers = e.target.value.replace(/\D/g, '')
          const match = numbers.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)
          
          if (!match) {
            e.target.value = ''
            return
          }
          
          const formatted = [
            match[1],
            match[2] ? ` (${match[2]}` : '',
            match[3] ? `) ${match[3]}` : '',
            match[4] ? `-${match[4]}` : '',
            match[5] ? `-${match[5]}` : ''
          ].join('')
          
          e.target.value = formatted.trim()
        })
      }
    }
  },

  setup() {
    const showForm = ref(false)
    const isSubmitting = ref(false)
    const isSuccess = ref(false)
    const errorMessage = ref('')
    const formMessageInput = ref(null)

    const form = ref({
      name: '',
      phone: '',
      email: '',
      message: ''
    })

    const errors = ref({
      name: '',
      phone: '',
      message: ''
    })

    const hasMessageError = computed(() => {
      return !!errors.value.message
    })

    const inputClass = (field) => [
      'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2',
      errors.value[field] ? 'border-red-500 focus:ring-red-500' : 'border-slate-200/75 focus:ring-indigo-500'
    ]

    const openForm = async () => {
      if (!showForm.value) {
        showForm.value = true
        isSuccess.value = false
        await nextTick()
        if (formMessageInput.value) {
          formMessageInput.value.focus()
        }
      }
    }

    const closeForm = () => {
      showForm.value = false
      isSuccess.value = false
    }

    const validateForm = () => {
      let isValid = true
      errors.value = { name: '', phone: '', message: '' }

      if (!form.value.name.trim()) {
        errors.value.name = 'Пожалуйста, введите ваше имя'
        isValid = false
      }

      const phoneDigits = form.value.phone.replace(/\D/g, '')
      if (!phoneDigits) {
        errors.value.phone = 'Пожалуйста, введите номер телефона'
        isValid = false
      } else if (phoneDigits.length !== 11) {
        errors.value.phone = 'Номер должен содержать 11 цифр'
        isValid = false
      }

      if (!form.value.message.trim()) {
        errors.value.message = 'Пожалуйста, опишите задачу'
        isValid = false
      }

      return isValid
    }

    const handleButtonClick = () => {
      if (showForm.value) {
        submitForm()
      } else {
        openForm()
      }
    }

    const submitForm = async () => {
      if (!validateForm()) return

      isSubmitting.value = true
      errorMessage.value = ''

      try {
        // Имитация отправки формы
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Успешная отправка
        isSuccess.value = true
        form.value = { name: '', phone: '', email: '', message: '' }
      } catch (error) {
        errorMessage.value = 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.'
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      showForm,
      isSubmitting,
      isSuccess,
      errorMessage,
      form,
      errors,
      hasMessageError,
      formMessageInput,
      inputClass,
      openForm,
      closeForm,
      handleButtonClick,
      submitForm
    }
  }, 
  watch: {
    showForm(newVal) {
      // Для дополнительной надежности можно добавить обработку на уровне body
      if (process.client) {
        if (newVal) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = ''
        }
      }
    }
  },
  beforeDestroy() {
    // Восстанавливаем скролл при уничтожении компонента
    if (process.client) {
      document.body.style.overflow = ''
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s ease-out;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>