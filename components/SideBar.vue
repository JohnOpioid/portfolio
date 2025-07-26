<script lang="ts" setup>
    const { navLinks, isActive } = useNavigation()
</script>

<template>
<!-- Боковая колонка (1/3 ширины) -->
<aside class="fixed bg-white h-full p-6 xl:p-12 shadow-md w-50 xl:w-68">
    <div class="flex flex-col h-full space-y-4">
        <div class="grow content-center">
            <div class="flex flex-col mt-2 space-y-5">
                <NuxtLink
                    v-for="link in navLinks"
                    :key="link.path"
                    :to="link.path"
                    class="px-3 py-2 rounded-md text-lg md:text-xl"
                    :class="{
                        'font-bold text-md uppercase text-indigo-400 hover:text-indigo-400': isActive(link.path),
                        'font-normal text-md uppercase text-slate-700 hover:text-indigo-400': !isActive(link.path)
                    }"
                >
                    {{ link.name }}
                </NuxtLink>
            </div>
        </div>

        <div class="aspect-square bg-slate-50 p-4 h-auto w-full max-w-40 flex items-center justify-center text-4xl font-black text-slate-700">
            DЖ<span class="text-indigo-400">O</span>
        </div>
    </div> 
</aside>
</template>
