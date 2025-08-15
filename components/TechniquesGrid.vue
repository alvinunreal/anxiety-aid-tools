<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <NuxtLink
      v-for="technique in techniques"
      :key="technique.id"
      :to="getLocalizedTechniqueRoute(technique)"
      :class="[
        'bg-white dark:bg-slate-800 border-2 p-6 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700 active:bg-gray-100 dark:active:bg-slate-600 cursor-pointer group block touch-manipulation hover:shadow-lg dark:hover:shadow-slate-900/30',
        isRecommended(technique) 
          ? 'border-blue-300 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-200 dark:border-slate-600'
      ]"
    >
      <div class="flex flex-col items-center text-center">
        <div class="mb-4 transition-transform duration-200 group-hover:scale-110">
          <Icon :name="technique.icon" class="text-5xl" :class="technique.iconColor" />
        </div>
        <div class="flex items-center mb-2">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-slate-100">{{ $t(`techniques.${technique.id}.name`) }}</h2>
          <Icon
            v-if="isRecommended(technique)"
            name="ph:star-fill"
            class="ml-2 text-blue-600 dark:text-blue-400 text-sm"
          />
        </div>
        <p class="text-gray-600 dark:text-slate-300 text-sm mb-3 leading-relaxed">{{ $t(`techniques.${technique.id}.short_description`) }}</p>
        <div class="flex items-center text-sm text-gray-500 dark:text-slate-400">
          <Icon name="ph:clock-fill" class="mr-1 text-gray-400 dark:text-slate-500" />
          <span>{{ $t(`techniques.${technique.id}.duration`) }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  techniques: {
    type: Array,
    required: true
  },
  recommendedTechniques: {
    type: Array,
    default: () => []
  }
})

defineEmits(['selectTechnique'])

const localePath = useLocalePath()
const { getTechniqueRoute } = useTechniques()

const getLocalizedTechniqueRoute = (technique) => {
  return localePath(getTechniqueRoute(technique))
}

const isRecommended = (technique) => {
  return props.recommendedTechniques.some(rec => rec.id === technique.id)
}
</script>