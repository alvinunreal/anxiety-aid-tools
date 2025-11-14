<template>
  <div
    v-if="!isDismissed && !isOnMobilePage"
    class="relative border-b border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 transition-colors duration-300"
  >
    <div class="sektion !my-0 py-2">
      <div class="flex items-center justify-center gap-2 relative">
        <NuxtLink
          :to="localePath('/mobile')"
          class="flex items-center justify-center gap-2 group"
        >
          <div class="relative">
            <Icon name="ph:sparkle-fill" class="text-[16px] text-yellow-500 dark:text-yellow-400 animate-pulse" />
          </div>
          <span class="text-sm font-medium text-blue-900 dark:text-blue-100 group-hover:text-indigo-900 dark:group-hover:text-indigo-100 transition-colors duration-200">
            {{ $t('mobileAppBanner.text') }}
          </span>
        </NuxtLink>

        <button
          @click="dismissBanner"
          class="absolute right-0 p-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-full transition-all duration-200 hover:rotate-90"
          :aria-label="$t('mobileAppBanner.dismiss')"
        >
          <Icon name="ph:x" class="text-sm" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
const route = useRoute()
const isDismissed = ref(false)

// Hide banner on /mobile page
const isOnMobilePage = computed(() => {
  return route.path === '/mobile' || route.path.includes('/mobile')
})

onMounted(() => {
  // Check if banner was previously dismissed
  const dismissed = localStorage.getItem('mobileAppBannerDismissed')
  if (dismissed === 'true') {
    isDismissed.value = true
  }
})

const dismissBanner = () => {
  isDismissed.value = true
  localStorage.setItem('mobileAppBannerDismissed', 'true')
}
</script>
