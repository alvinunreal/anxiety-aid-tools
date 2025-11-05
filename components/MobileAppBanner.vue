<template>
  <div
    v-if="!isDismissed && !isOnMobilePage"
    class="relative border-b border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 transition-colors duration-300"
  >
    <div class="sektion !my-0 py-1">
      <div class="flex items-center justify-center gap-1.5 relative">
        <NuxtLink
          :to="localePath('/mobile')"
          class="flex items-center justify-center gap-1.5 hover:opacity-80 transition-opacity duration-200"
        >
          <Icon name="ph:device-mobile-fill" class="flex-shrink-0 text-sm text-amber-700 dark:text-amber-400" />
          <span class="text-xs text-amber-900 dark:text-amber-200">
            {{ $t('mobileAppBanner.text') }}
          </span>
        </NuxtLink>

        <button
          @click="dismissBanner"
          class="absolute right-0 p-0.5 text-amber-600 dark:text-amber-500 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 rounded transition-colors duration-200"
          :aria-label="$t('mobileAppBanner.dismiss')"
        >
          <Icon name="ph:x" class="text-xs" />
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
