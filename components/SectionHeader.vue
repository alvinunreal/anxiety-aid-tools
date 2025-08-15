<template>
  <div class="flex flex-col items-center text-center gap-2 mb-2 sm:mb-4 sm:flex-row sm:items-center sm:text-left">
    <div class="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center flex-shrink-0" :class="iconBgClass">
      <Icon :name="icon" class="text-2xl sm:text-lg" :class="iconClass" />
    </div>
    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
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

const iconBgClass = computed(() => `bg-${props.color}-100 dark:bg-${props.color}-900/10`)
const iconClass = computed(() => `text-${props.color}-600 dark:text-${props.color}-400`)
</script>