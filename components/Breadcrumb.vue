<template>
  <section class="flex items-center justify-between mb-6">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2">
        <li>
          <button
            v-if="backAction"
            type="button"
            @click="backAction"
            class="group flex items-center text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 transition-colors duration-200 cursor-pointer"
            :aria-label="backLabel || $t('breadcrumb.backToHome')"
          >
            <Icon name="ph:arrow-left" class="mr-2 text-lg group-hover:transform group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span class="font-medium">{{ backLabel || $t('breadcrumb.backToHome') }}</span>
          </button>
          <NuxtLink
            v-else
            :to="backTo || localePath('/')"
            class="group flex items-center text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 transition-colors duration-200"
            :aria-label="backLabel || $t('breadcrumb.backToHome')"
          >
            <Icon name="ph:arrow-left" class="mr-2 text-lg group-hover:transform group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span class="font-medium">{{ backLabel || $t('breadcrumb.backToHome') }}</span>
          </NuxtLink>
        </li>
      </ol>
    </nav>
    <div class="flex items-center space-x-2 text-sm text-gray-700 dark:text-slate-300">
      <Icon name="ph:clock" class="text-base" />
      <span>{{ duration }}</span>
    </div>
  </section>
</template>

<script setup>
const localePath = useLocalePath()

defineProps({
  duration: {
    type: String,
    default: '5-10 min'
  },
  backLabel: {
    type: String,
    default: ''
  },
  backTo: {
    type: String,
    default: ''
  },
  backAction: {
    type: Function,
    default: null
  }
})
</script>