<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <footer class="py-8 px-4 border-t border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 transition-colors duration-300">
    <div class="sektion">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="text-center md:text-left">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-2">{{ $t('footer.title') }}</h3>
          <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t('footer.description') }}</p>
        </div>
        
        <div class="text-center">
          <h4 class="text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">{{ $t('footer.contribute.title') }}</h4>
          <div class="flex justify-center space-x-4">
            <a 
              href="https://github.com/alvinunreal/anxiety-aid-tools" 
              rel="noopener noreferrer nofollow"
              target="_blank"
              class="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              <Icon name="mdi:github" class="text-base mr-1" />
              {{ $t('footer.contribute.github') }}
            </a>
            <a 
              href="https://github.com/alvinunreal/anxiety-aid-tools/discussions" 
              rel="noopener noreferrer nofollow"
              target="_blank"
              class="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              <Icon name="mdi:chat" class="text-base mr-1" />
              {{ $t('footer.contribute.discussions') }}
            </a>
          </div>
        </div>
        
        <div class="text-center md:text-right">
          <a 
            href="https://www.reddit.com/user/alvinunreal/" 
            rel="noopener noreferrer nofollow"
            target="_blank"
            class="text-sm font-medium text-gray-700 dark:text-slate-200 hover:text-gray-900 dark:hover:text-slate-100 transition-colors duration-200"
          >
            Alvin Unreal
          </a>
        </div>
      </div>
      
      
      <div class="py-4 border-t border-gray-200 dark:border-slate-600">
        <div class="flex justify-center">
          <div class="flex flex-wrap justify-center gap-1 text-xs">
            <NuxtLink 
              v-for="loc in locales" 
              :key="loc.code"
              :to="switchLocalePath(loc.code)"
              class="px-2 py-1 rounded text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 font-mono transition-colors duration-200 whitespace-nowrap"
              :class="{ 'text-gray-800 dark:text-slate-100 bg-gray-200 dark:bg-slate-600 font-medium': locale === loc.code }"
            >
              {{ loc.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <div class="py-4 border-t border-gray-200 dark:border-slate-600">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p class="text-xs text-gray-500 dark:text-slate-400 text-center md:text-left max-w-2xl">
            {{ $t('footer.disclaimer') }}
          </p>
          <p class="text-xs text-gray-500 dark:text-slate-400">
            Open Source • GPL License
          </p>
        </div>
      </div>

      <div class="pt-6 border-t border-gray-200 dark:border-slate-600">
        <div class="text-center mb-4">
          <p class="text-sm text-gray-600 dark:text-slate-300 mb-3">{{ $t('footer.projects.title') }}</p>
          <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a 
              href="https://awesomeclaude.ai/" 
              rel="noopener noreferrer nofollow"
              target="_blank"
              class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              {{ $t('footer.projects.awesomeClaude.name') }}
            </a>
            <a 
              href="https://awesomeclaude.ai/code-cheatsheet" 
              rel="noopener noreferrer nofollow"
              target="_blank"
              class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              {{ $t('footer.projects.codeCheatsheet.name') }}
            </a>
            <a 
              href="https://awesomeclaude.ai/awesome-claude-code" 
              rel="noopener noreferrer nofollow"
              target="_blank"
              class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              {{ $t('footer.projects.awesomeClaudeCode.name') }}
            </a>
            <a 
              href="https://tmuxai.dev/" 
              rel="noopener noreferrer nofollow"
              target="_blank"
              class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              {{ $t('footer.projects.tmuxai.name') }}
            </a>
            <a 
              href="https://tmuxai.dev/tmuxai-vs-warp" 
              rel="noopener noreferrer nofollow"
              target="_blank"
              class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              {{ $t('footer.projects.tmuxVsWarp.name') }}
            </a>
            <a 
              href="https://tmuxai.dev/tmux-getting-started" 
              rel="noopener noreferrer nofollow"
              target="_blank"
              class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              {{ $t('footer.projects.tmuxGuide.name') }}
            </a>
            <a 
              href="https://tmuxai.dev/tmux-cheat-sheet/" 
              rel="noopener noreferrer nofollow"
              target="_blank"
              class="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
            >
              {{ $t('footer.projects.tmuxCheatsheet.name') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>