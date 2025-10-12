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

      <div class="pt-4 border-t border-gray-200 dark:border-slate-600">
        <div class="text-center">
          <p class="text-xs text-gray-500 dark:text-slate-400 mb-4 font-medium">Boring Dystopia Development</p>

          <!-- Clean grid layout for projects -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">

            <!-- TmuxAI -->
            <div class="text-center space-y-2">
              <a
                href="https://tmuxai.dev/"
                target="_blank"
                class="group inline-flex flex-col items-center space-y-2"
              >
                <div class="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 dark:bg-slate-700 group-hover:bg-gray-200 dark:group-hover:bg-slate-600 transition-colors duration-200">
                  <Icon name="mdi:console" class="text-sm text-gray-600 dark:text-slate-300" />
                </div>
                <div>
                  <h3 class="text-xs font-medium text-gray-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">TmuxAI</h3>
                  <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">AI-Powered Terminal Assistant</p>
                </div>
              </a>
              <div class="flex flex-wrap justify-center gap-1.5 pt-1">
                <a
                  href="https://tmuxai.dev/warp-terminal-alternatives"
                  target="_blank"
                  class="inline-flex items-center px-2 py-1 text-xs rounded-md bg-gray-50 dark:bg-slate-700/30 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-600/30 transition-all duration-150 hover:text-gray-800 dark:hover:text-slate-200"
                >
                  <Icon name="mdi:sword-fight" class="mr-1 text-xs" />
                  Warp Alternatives
                </a>
                <a
                  href="https://tmuxai.dev/tmux-getting-started"
                  target="_blank"
                  class="inline-flex items-center px-2 py-1 text-xs rounded-md bg-gray-50 dark:bg-slate-700/30 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-600/30 transition-all duration-150 hover:text-gray-800 dark:hover:text-slate-200"
                >
                  <Icon name="mdi:rocket-launch" class="mr-1 text-xs" />
                  Tmux Getting Started
                </a>
                <a
                  href="https://tmuxai.dev/tmux-cheat-sheet/"
                  target="_blank"
                  class="inline-flex items-center px-2 py-1 text-xs rounded-md bg-gray-50 dark:bg-slate-700/30 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-600/30 transition-all duration-150 hover:text-gray-800 dark:hover:text-slate-200"
                >
                  <Icon name="mdi:file-document-outline" class="mr-1 text-xs" />
                  Tmux Cheat Sheet
                </a>
              </div>
            </div>

            <!-- GitDB -->
            <div class="text-center space-y-2">
              <a
                href="https://gitdb.net/"
                target="_blank"
                class="group inline-flex flex-col items-center space-y-2"
              >
                <div class="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 dark:bg-slate-700 group-hover:bg-gray-200 dark:group-hover:bg-slate-600 transition-colors duration-200">
                  <Icon name="mdi:database" class="text-sm text-gray-600 dark:text-slate-300" />
                </div>
                <div>
                  <h3 class="text-xs font-medium text-gray-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">GitDB</h3>
                  <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Open Source Project Discovery & Analytics</p>
                </div>
              </a>
            </div>

            <!-- FreeSubStats -->
            <div class="text-center space-y-2">
              <a
                href="https://freesubstats.com/"
                target="_blank"
                class="group inline-flex flex-col items-center space-y-2"
              >
                <div class="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 dark:bg-slate-700 group-hover:bg-gray-200 dark:group-hover:bg-slate-600 transition-colors duration-200">
                  <Icon name="mdi:chart-line" class="text-sm text-gray-600 dark:text-slate-300" />
                </div>
                <div>
                  <h3 class="text-xs font-medium text-gray-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">FreeSubStats</h3>
                  <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Subreddit Statistics & Growth Rates</p>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>

    </div>
  </footer>
</template>
