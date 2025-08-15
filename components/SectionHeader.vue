<template>
  <div class="flex flex-col items-center text-center gap-2 mb-2 sm:mb-4 sm:flex-row sm:items-center sm:text-left">
    <div class="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center flex-shrink-0 transition-colors duration-200" :class="iconBgClass">
      <Icon :name="icon" class="text-2xl sm:text-lg" :class="iconClass" />
    </div>
    <h2 class="text-lg font-semibold text-gray-800 dark:text-slate-100 transition-colors duration-200">
      <slot />
    </h2>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'purple',
    validator: (value) => ['purple', 'blue', 'green', 'indigo', 'gray'].includes(value)
  }
})

const iconBgClass = computed(() => {
  const colorMap = {
    purple: 'bg-purple-100 dark:bg-purple-900/30',
    blue: 'bg-blue-100 dark:bg-blue-900/30',
    green: 'bg-green-100 dark:bg-green-900/30',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30',
    gray: 'bg-gray-100 dark:bg-gray-800'
  }
  return colorMap[props.color] || colorMap.purple
})

const iconClass = computed(() => {
  const colorMap = {
    purple: 'text-purple-600 dark:text-purple-400',
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    gray: 'text-gray-600 dark:text-gray-300'
  }
  return colorMap[props.color] || colorMap.purple
})
</script>