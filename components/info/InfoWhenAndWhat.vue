<template>
  <section>
    <div class="grid gap-8 md:grid-cols-2">
      <!-- When to Practice -->
      <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
        <SectionHeader :icon="whenSection.icon" :color="whenSection.color">
          {{ $t(`${i18nKey}.whenToPractice.title`) }}
        </SectionHeader>
        <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
          <li 
            v-for="(item, index) in whenSection.items" 
            :key="index"
            class="flex items-start"
          >
            <Icon :name="item.icon" class="mr-2 mt-0.5 flex-shrink-0" :class="item.iconClass" />
            <span>{{ $t(`${i18nKey}.whenToPractice.items.${index}`) }}</span>
          </li>
        </ul>
      </div>

      <!-- What You'll Notice -->
      <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
        <SectionHeader :icon="whatSection.icon" :color="whatSection.color">
          {{ $t(`${i18nKey}.whatYoullNotice.title`) }}
        </SectionHeader>
        <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
          <li 
            v-for="(item, index) in whatSection.items" 
            :key="index"
            class="flex items-start"
          >
            <Icon :name="item.icon" class="mr-2 mt-0.5 flex-shrink-0" :class="item.iconClass" />
            <span>{{ $t(`${i18nKey}.whatYoullNotice.items.${index}`) }}</span>
          </li>
        </ul>
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
  whenSection: {
    type: Object,
    required: true
  },
  whatSection: {
    type: Object,
    required: true
  }
});
</script>
