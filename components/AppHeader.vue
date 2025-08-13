<template>
  <header class="relative py-2 border-b border-gray-300 bg-white">
    <div class="sektion !my-0 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center justify-center hover:opacity-80 transition-opacity duration-100">
        <div class="w-10 h-10 flex items-center justify-center mr-3">
          <img src="/aat.svg" alt="AAT Logo" class="w-10 h-10" />
        </div>
        <div class="flex flex-col items-start justify-start">
          <p class="text-lg font-semibold text-gray-800">{{ $t('header.title') }}</p>
          <div class="text-xs text-gray-500 -mt-1">{{ $t('header.subtitle') }}</div>
        </div>
      </NuxtLink>
      
      <div class="flex items-center space-x-4">
        <nav class="hidden md:flex items-center space-x-4">
          <a href="/#techniques" class="text-sm text-gray-600 hover:text-gray-800 hover:underline">{{ $t('navigation.techniques') }}</a>
          <a href="/#about" class="text-sm text-gray-600 hover:text-gray-800 hover:underline">{{ $t('navigation.about') }}</a>
          <a href="/#resources" class="text-sm text-gray-600 hover:text-gray-800 hover:underline">{{ $t('navigation.resources') }}</a>
        </nav>
        
        <a 
          href="https://github.com/alvinunreal/anxiety-aid-tools" 
          target="_blank"
          class="flex items-center text-sm px-2 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          <Icon name="mdi:github" class="text-base mr-1" />
          {{ $t('navigation.github') }}
        </a>
        
        <button class="md:hidden flex items-center justify-center" @click="mobileMenuOpen = !mobileMenuOpen">
          <Icon name="ph:list" class="text-2xl text-gray-700" />
        </button>
      </div>
    </div>
    
    <div v-if="mobileMenuOpen" class="absolute top-full left-0 right-0 md:hidden border-t border-gray-300 bg-white z-50">
      <nav class="sektion !my-0 py-4 flex flex-col space-y-1">
        <a href="/#techniques" class="text-sm text-gray-600 hover:text-gray-800 hover:underline py-3 px-2 -mx-2 rounded">{{ $t('navigation.techniques') }}</a>
        <a href="/#about" class="text-sm text-gray-600 hover:text-gray-800 hover:underline py-3 px-2 -mx-2 rounded">{{ $t('navigation.about') }}</a>
        <a href="/#resources" class="text-sm text-gray-600 hover:text-gray-800 hover:underline py-3 px-2 -mx-2 rounded">{{ $t('navigation.resources') }}</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)
</script>