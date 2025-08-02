<script lang="ts" setup>
    const { navLinks, isActive } = useNavigation()
</script>

<template>
<!-- Боковая колонка (1/3 ширины) -->
<aside class="fixed flex flex-col bg-white dark:bg-slate-800 h-full p-6 xl:p-12 shadow-md w-[12.5rem] xl:w-[17rem]">
    <div class="hidden md:flex justify-start gap-6">
        <ThemeToggle />
        <Status />
    </div>
    <div class="grow content-center">
        <div class="flex flex-col mt-2 space-y-5">
            <NuxtLink
                v-for="link in navLinks"
                :key="link.path"
                :to="link.path"
                class="px-3 py-2 rounded-md text-lg md:text-xl"
                :class="{
                    'font-bold text-md uppercase text-indigo-400 hover:text-indigo-400': isActive(link.path),
                    'font-normal text-md uppercase text-slate-700 hover:text-indigo-400 dark:text-slate-300': !isActive(link.path)
                }"
            >
                {{ link.name }}
            </NuxtLink>
        </div>
    </div> 
        
    <div class="relative aspect-square bg-slate-50 p-4 h-auto w-full flex items-center justify-center text-4xl font-black text-slate-700 dark:bg-slate-700 dark:text-slate-100">
        DЖ<span class="text-indigo-400">O</span>
    </div>  
</aside>
</template>
