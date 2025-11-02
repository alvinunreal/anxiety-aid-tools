<template>
  <a 
    href="#main-content" 
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
    @click="skipToMain"
  >
    {{ $t('navigation.skipToMain') }}
  </a>
  <header class="relative py-2 border-b border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 transition-colors duration-300">
    <div class="sektion !my-0 flex items-center justify-between">
      <NuxtLink :to="localePath('/')" class="flex items-center justify-center hover:opacity-80 transition-opacity duration-100">
        <div class="w-10 h-10 flex items-center justify-center mr-3 text-gray-800 dark:text-white">
          <AATLogo />
        </div>
        <div class="flex flex-col items-start justify-start">
          <p class="text-lg font-semibold text-gray-800 dark:text-slate-100">{{ $t('header.title') }}</p>
          <div class="text-xs text-gray-500 dark:text-slate-400 -mt-1">{{ $t('header.subtitle') }}</div>
        </div>
      </NuxtLink>
      
      <div class="flex items-center space-x-4">
        <a
          href="https://github.com/alvinunreal/anxiety-aid-tools"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="flex items-center text-sm px-2 py-1 border border-gray-300 dark:border-slate-600 rounded text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
        >
          <Icon name="mdi:github" class="text-base mr-1" />
          {{ $t('navigation.github') }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
const localePath = useLocalePath()

const skipToMain = () => {
  const mainContent = document.getElementById('main-content')
  if (mainContent) {
    mainContent.focus()
    mainContent.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>