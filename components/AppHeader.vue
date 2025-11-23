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
      
      <!-- Desktop navigation -->
      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink
          :to="localePath('/mobile')"
          class="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 hover:underline decoration-2 underline-offset-4 transition-all duration-200"
        >
          <Icon name="mdi:cellphone" class="text-lg" />
          <span>{{ $t('navigation.mobile') }}</span>
        </NuxtLink>
        <a
          href="https://www.reddit.com/r/AnxietyAidTools/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 hover:underline decoration-2 underline-offset-4 transition-all duration-200"
          title="r/AnxietyAidTools"
        >
          <Icon name="mdi:reddit" class="text-lg" />
          <span>r/AnxietyAidTools</span>
        </a>
        <a
          href="https://github.com/alvinunreal/anxiety-aid-tools"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 hover:underline decoration-2 underline-offset-4 transition-all duration-200"
        >
          <Icon name="mdi:github" class="text-lg" />
          <span>{{ $t('navigation.github') }}</span>
        </a>
        
        <!-- Language Dropdown -->
        <div class="relative" ref="langDropdownRef">
          <button
            @click="isLangDropdownOpen = !isLangDropdownOpen"
            class="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 hover:underline decoration-2 underline-offset-4 transition-all duration-200"
            :aria-label="$t('navigation.selectLanguage') || 'Select Language'"
            aria-haspopup="true"
            :aria-expanded="isLangDropdownOpen"
          >
            <Icon name="mdi:translate" class="text-lg" />
            <span>{{ currentLocale?.name }}</span>
            <Icon name="mdi:chevron-down" class="text-base transition-transform duration-200" :class="{ 'rotate-180': isLangDropdownOpen }" />
          </button>
          
          <Transition name="dropdown">
            <div
              v-if="isLangDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded shadow-lg py-1 z-50"
            >
              <button
                v-for="locale in availableLocales"
                :key="locale.code"
                @click="switchLanguage(locale.code)"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
                :class="{ 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium': locale.code === $i18n.locale }"
              >
                {{ locale.name }}
              </button>
            </div>
          </Transition>
        </div>
      </nav>

      <!-- Mobile menu button -->
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden p-2 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors duration-200"
        :aria-label="isMenuOpen ? $t('navigation.closeMenu') : $t('navigation.openMenu')"
      >
        <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" class="text-2xl" />
      </button>
    </div>
  </header>

  <!-- Mobile sidebar -->
  <Transition name="sidebar">
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 z-50 md:hidden"
      @click.self="isMenuOpen = false"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50" @click="isMenuOpen = false"></div>
      
      <!-- Sidebar -->
      <div class="absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-800 shadow-xl flex flex-col">
        <!-- Close button -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
          <span class="font-semibold text-gray-800 dark:text-slate-100">{{ $t('navigation.menu') }}</span>
          <button
            @click="isMenuOpen = false"
            class="p-2 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors duration-200"
            :aria-label="$t('navigation.closeMenu')"
          >
            <Icon name="mdi:close" class="text-xl" />
          </button>
        </div>

        <!-- Menu items -->
        <nav class="flex-1 overflow-y-auto p-4">
          <NuxtLink
            :to="localePath('/mobile')"
            @click="isMenuOpen = false"
            class="flex items-center px-4 py-3 mb-2 rounded text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            <Icon name="mdi:cellphone" class="text-xl mr-3" />
            <span>{{ $t('navigation.mobile') }}</span>
          </NuxtLink>
          
          <a
            href="https://www.reddit.com/r/AnxietyAidTools/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="flex items-center px-4 py-3 mb-2 rounded text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            <Icon name="mdi:reddit" class="text-xl mr-3" />
            <span>r/AnxietyAidTools</span>
          </a>

          <a
            href="https://github.com/alvinunreal/anxiety-aid-tools"
            target="_blank"
            rel="noopener noreferrer nofollow"
            class="flex items-center px-4 py-3 mb-2 rounded text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            <Icon name="mdi:github" class="text-xl mr-3" />
            <span>{{ $t('navigation.github') }}</span>
          </a>

          <!-- Language Section -->
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div class="flex items-center px-4 py-2 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              <Icon name="mdi:translate" class="text-base mr-2" />
              <span>{{ $t('navigation.language') || 'Language' }}</span>
            </div>
            <button
              v-for="locale in availableLocales"
              :key="locale.code"
              @click="switchLanguage(locale.code)"
              class="flex items-center w-full px-4 py-3 rounded text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200"
              :class="{ 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium': locale.code === $i18n.locale }"
            >
              <Icon v-if="locale.code === $i18n.locale" name="mdi:check" class="text-xl mr-3" />
              <span class="ml-8" v-else></span>
              <span>{{ locale.name }}</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { locale, locales } = useI18n()
const router = useRouter()

const isMenuOpen = ref(false)
const isLangDropdownOpen = ref(false)
const langDropdownRef = ref(null)

const availableLocales = computed(() => locales.value)
const currentLocale = computed(() => locales.value.find(l => l.code === locale.value))

const skipToMain = () => {
  const mainContent = document.getElementById('main-content')
  if (mainContent) {
    mainContent.focus()
    mainContent.scrollIntoView({ behavior: 'smooth' })
  }
}

const switchLanguage = async (code) => {
  isLangDropdownOpen.value = false
  isMenuOpen.value = false
  await router.push(switchLocalePath(code))
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (langDropdownRef.value && !langDropdownRef.value.contains(event.target)) {
    isLangDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Close menu on route change
watch(() => localePath('/'), () => {
  isMenuOpen.value = false
})
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}

.sidebar-enter-active .absolute.right-0,
.sidebar-leave-active .absolute.right-0 {
  transition: transform 0.3s ease;
}

.sidebar-enter-from .absolute.right-0,
.sidebar-leave-to .absolute.right-0 {
  transform: translateX(100%);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>