<template>
  <section>
    <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
      <SectionHeader icon="ph:flask" color="purple">
        {{ $t(`${i18nKey}.title`) }}
      </SectionHeader>
      
      <div class="mb-4">
        <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300" v-html="$t(`${i18nKey}.description`)"></p>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="item in researchItems"
          :key="item.key"
          class="border border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-4 transition-colors duration-200"
        >
          <div class="mb-2 flex items-center">
            <Icon :name="item.icon" class="mr-2 text-purple-600 dark:text-purple-400" />
            <span class="text-sm font-medium text-gray-800 dark:text-slate-100">
              {{ $t(`${i18nKey}.research.${item.key}.title`) }}
            </span>
          </div>
          <p class="text-xs text-gray-600 dark:text-slate-300" v-html="$t(`${i18nKey}.research.${item.key}.description`)"></p>
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
  researchItems: {
    type: Array,
    required: true
  }
});
</script>
