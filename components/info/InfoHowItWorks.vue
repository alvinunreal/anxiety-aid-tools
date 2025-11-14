<template>
  <section>
    <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
      <div>
        <SectionHeader icon="ph:brain" color="gray">
          {{ $t(`${i18nKey}.title`) }}
        </SectionHeader>
        <div class="px-1">
          <!-- Dynamic paragraphs -->
          <p 
            v-for="(key, index) in paragraphs" 
            :key="index"
            class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300"
          >
            {{ $t(`${i18nKey}.${key}`) }}
          </p>
          
          <!-- Sub-cards grid -->
          <div class="mt-4 grid gap-4" :class="gridClass">
            <div
              v-for="item in items"
              :key="item.key"
              class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-700/40 p-3 transition-colors duration-200"
            >
              <div class="mb-1 flex items-center">
                <Icon :name="item.icon" class="mr-2 text-gray-600 dark:text-slate-300" />
                <span class="text-xs font-medium text-gray-800 dark:text-slate-100">
                  {{ $t(`${i18nKey}.${item.key}.title`) }}
                </span>
              </div>
              <p class="text-xs text-gray-600 dark:text-slate-400">
                {{ $t(`${i18nKey}.${item.key}.description`) }}
              </p>
            </div>
          </div>
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
  paragraphs: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    required: true
  },
  columns: {
    type: Number,
    default: 3,
    validator: (value) => [2, 3].includes(value)
  }
});

const gridClass = computed(() => 
  props.columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
);
</script>
