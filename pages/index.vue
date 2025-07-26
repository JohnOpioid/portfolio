<script setup>
useHead({
  title: 'Обо мне',
  meta: [
    { name: 'description', content: 'Описание моей страницы' }
  ]
})
</script>

<template>
<div class="h-full min-h-screen flex flex-col ">
    <div class="flex justify-end p-6 md:p-12">
        <Status />
    </div>
    <div class="flex flex-col px-6 md:px-12 pt-12 mb-12 gap-8 w-full xl:max-w-3/4 mx-auto md:h-full md:justify-center">
        <div class="flex flex-col gap-8">
            <div>
                <span class="text-slate-500 font-semibold text-xl uppercase">UX/UI - дизайнер</span>
                <div class="mt-2">
                    <img src="/public/logo-text.svg" alt="">
                </div>
            </div>
            <p class="w-full text-slate-500 font-light text-xl">Молодой специалист в области UI/UX дизайна с опытом работы более года. Специализируюсь на создании удобных и эстетичных интерфейсов, разработке пользовательских решений и прототипировании.</p>
        </div>
        
        <div class="flex flex-col gap-6 mt-6">
            <div class="text-slate-700 font-bold text-xl uppercase">Могу, умею, практикую</div>
            <Skills />
        </div>
    </div>
</div>

</template>

<style scoped>

</style>