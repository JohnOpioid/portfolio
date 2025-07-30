<script lang="ts" setup>
interface StatusData {
  status: 'available' | 'working' | 'vacation'
  colors: {
    available: string
    working: string
    vacation: string
  }
}

const { data: statusData } = await useFetch<StatusData>('https://desjo.ru/api/status')

const status = ref(statusData.value?.status ?? 'available')
const statusColors = ref(statusData.value?.colors ?? {
  available: 'bg-green-600',
  working: 'bg-yellow-500',
  vacation: 'bg-indigo-600'
})

const statusText = computed(() => {
  switch (status.value) {
    case 'available': return 'Доступен'
    case 'working': return 'В работе'
    case 'vacation': return 'Отпуск'
    default: return 'Доступен'
  }
})

const pingColor = computed(() => {
  switch (status.value) {
    case 'available': return 'bg-green-400'
    case 'working': return 'bg-yellow-400'
    case 'vacation': return 'bg-indigo-400'
    default: return 'bg-green-400'
  }
})

const dotColor = computed(() => {
  switch (status.value) {
    case 'available': return 'bg-green-500'
    case 'working': return 'bg-yellow-500'
    case 'vacation': return 'bg-indigo-500'
    default: return 'bg-green-500'
  }
})

const textColor = computed(() => {
  switch (status.value) {
    case 'available': return 'text-green-600'
    case 'working': return 'text-yellow-600'
    case 'vacation': return 'text-indigo-600'
    default: return 'text-green-600'
  }
})
</script>

<template>
  <div class="relative inline-flex items-center rounded-full border border-1 border-slate-300 dark:border-slate-700 px-4 py-2 gap-2">
    <span class="relative flex size-3">
      <span 
        class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
        :class="pingColor"
      ></span>
      <span 
        class="relative inline-flex size-3 rounded-full"
        :class="dotColor"
      ></span>
    </span>
    <span 
      class="inline-block align-middle text-xs font-medium uppercase"
      :class="textColor"
    >{{ statusText }}</span>
  </div>
</template>