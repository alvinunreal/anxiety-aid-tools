<template>
  <div class="mb-6 flex items-center justify-center">
    <label class="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        :checked="enabled"
        @change="$emit('toggle', $event.target.checked)"
        class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
      />
      <span class="text-sm text-gray-600 dark:text-slate-300 flex items-center gap-2">
        <Icon name="ph:speaker-high-fill" class="text-cyan-600 dark:text-cyan-400" />
        {{ $t('breathing.audio.enableCues') }}
      </span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  enabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])
</script>