<template>
  <section>
    <div class="border border-indigo-200 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 p-6 transition-colors duration-200">
      <div class="mb-4 text-center">
        <Icon name="ph:lightbulb" class="mx-auto mb-2 text-2xl text-indigo-600 dark:text-indigo-400" />
        <h2 class="font-semibold text-gray-800 dark:text-slate-100">
          {{ $t(`${i18nKey}.title`) }}
        </h2>
      </div>
      <div class="grid gap-4 text-sm md:grid-cols-3">
        <div 
          v-for="tip in tips" 
          :key="tip"
          class="text-center"
        >
          <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">
            {{ $t(`${i18nKey}.${tip}.title`) }}
          </div>
          <p class="text-gray-600 dark:text-slate-300">
            {{ $t(`${i18nKey}.${tip}.description`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  i18nKey: {
    type: String,
    required: true
  },
  tips: {
    type: Array,
    required: true
  }
});
</script>
