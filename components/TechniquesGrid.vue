<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <NuxtLink
      v-for="technique in techniques"
      :key="technique.id"
      :to="getTechniqueRoute(technique)"
      :class="[
        'bg-white border-2 p-6 transition-colors duration-100 hover:bg-gray-50 cursor-pointer group block',
        isRecommended(technique) ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
      ]"
    >
      <div class="flex flex-col items-center text-center">
        <div class="mb-4">
          <Icon :name="technique.icon" class="text-5xl" :class="technique.iconColor" />
        </div>
        <div class="flex items-center mb-2">
          <h2 class="text-xl font-semibold text-gray-800">{{ $t(`techniques.${technique.id}.name`) }}</h2>
          <Icon
            v-if="isRecommended(technique)"
            name="ph:star-fill"
            class="ml-2 text-blue-600 text-sm"
          />
        </div>
        <p class="text-gray-600 text-sm mb-3">{{ $t(`techniques.${technique.id}.short_description`) }}</p>
        <div class="flex items-center text-sm text-gray-500">
          <Icon name="ph:clock-fill" class="mr-1 text-gray-400" />
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

const { getTechniqueRoute } = useTechniques()

const isRecommended = (technique) => {
  return props.recommendedTechniques.some(rec => rec.id === technique.id)
}
</script>