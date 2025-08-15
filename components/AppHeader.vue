<template>
  <header class="relative py-2 border-b border-gray-300 bg-white dark:bg-slate-900 dark:border-gray-700">
    <div class="sektion !my-0 flex items-center justify-between">
      <NuxtLink :to="localePath('/')" class="flex items-center justify-center hover:opacity-80 transition-opacity duration-100">
        <div class="w-10 h-10 flex items-center justify-center mr-3">
          <img src="/aat.svg" alt="AAT Logo" class="w-10 h-10" />
        </div>
        <div class="flex flex-col items-start justify-start">
          <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ $t('header.title') }}</p>
          <div class="text-xs text-gray-500 dark:text-gray-400 -mt-1">{{ $t('header.subtitle') }}</div>
        </div>
      </NuxtLink>
      
      <div class="flex items-center space-x-4">
        <nav class="hidden md:flex items-center space-x-4">
          <NuxtLink :to="localePath('/') + '#techniques'" class="text-sm text-gray-600 hover:text-gray-800 hover:underline dark:text-gray-300 dark:hover:text-gray-100">{{ $t('navigation.techniques') }}</NuxtLink>
          <NuxtLink :to="localePath('/') + '#about'" class="text-sm text-gray-600 hover:text-gray-800 hover:underline dark:text-gray-300 dark:hover:text-gray-100">{{ $t('navigation.about') }}</NuxtLink>
          <NuxtLink :to="localePath('/') + '#resources'" class="text-sm text-gray-600 hover:text-gray-800 hover:underline dark:text-gray-300 dark:hover:text-gray-100">{{ $t('navigation.resources') }}</NuxtLink>
        </nav>
        
        <button @click="toggleTheme" class="flex items-center text-sm px-2 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors duration-200 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
          <Icon v-if="colorMode.preference === 'light'" name="ph:sun" class="text-base" />
          <Icon v-else-if="colorMode.preference === 'dark'" name="ph:moon" class="text-base" />
          <Icon v-else name="ph:desktop" class="text-base" />
        </button>

        <a 
          href="https://github.com/alvinunreal/anxiety-aid-tools" 
          target="_blank"
          class="flex items-center text-sm px-2 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors duration-200 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Icon name="mdi:github" class="text-base mr-1" />
          {{ $t('navigation.github') }}
        </a>
        
        <button class="md:hidden flex items-center justify-center" @click="mobileMenuOpen = !mobileMenuOpen">
          <Icon name="ph:list" class="text-2xl text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
    
    <div v-if="mobileMenuOpen" class="absolute top-full left-0 right-0 md:hidden border-t border-gray-300 bg-white z-50 dark:bg-slate-900 dark:border-gray-700">
      <nav class="sektion !my-0 py-4 flex flex-col space-y-1">
        <NuxtLink :to="localePath('/') + '#techniques'" class="text-sm text-gray-600 hover:text-gray-800 hover:underline py-3 px-2 -mx-2 rounded dark:text-gray-300 dark:hover:text-gray-100">{{ $t('navigation.techniques') }}</NuxtLink>
        <NuxtLink :to="localePath('/') + '#about'" class="text-sm text-gray-600 hover:text-gray-800 hover:underline py-3 px-2 -mx-2 rounded dark:text-gray-300 dark:hover:text-gray-100">{{ $t('navigation.about') }}</NuxtLink>
        <NuxtLink :to="localePath('/') + '#resources'" class="text-sm text-gray-600 hover:text-gray-800 hover:underline py-3 px-2 -mx-2 rounded dark:text-gray-300 dark:hover:text-gray-100">{{ $t('navigation.resources') }}</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
const localePath = useLocalePath()
const mobileMenuOpen = ref(false)
const colorMode = useColorMode()

const themes = ['light', 'dark', 'system']

function toggleTheme() {
  const currentThemeIndex = themes.indexOf(colorMode.preference)
  const nextThemeIndex = (currentThemeIndex + 1) % themes.length
  colorMode.preference = themes[nextThemeIndex]
}
</script>