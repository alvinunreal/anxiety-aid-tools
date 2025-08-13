<template>
  <div class="mb-6 overflow-hidden border border-gray-200 bg-white">
    <!-- Main Header Bar -->
    <div class="flex items-center justify-between bg-gradient-to-r p-4" :style="gradientStyle">
      <!-- Exercise Identity -->
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <Icon :name="icon" class="text-xl text-white" />
        </div>
        <div>
          <h3 class="font-semibold text-white">{{ title }}</h3>
          <p class="text-sm text-white/80">{{ subtitle }}</p>
        </div>
      </div>

      <!-- Live Timer/Counter -->
      <div class="text-right">
        <div class="text-lg font-mono font-semibold text-white">{{ displayValue }}</div>
        <div class="text-xs text-white/80">{{ displayLabel }}</div>
      </div>
    </div>

    <!-- Progress Strip -->
    <div class="relative h-2 bg-gray-100">
      <div 
        class="absolute left-0 top-0 h-full transition-all duration-300 ease-out"
        :class="progressBarClass"
        :style="{ width: progressPercentage + '%' }"
      ></div>
    </div>

    <!-- Status Bar -->
    <div class="flex items-center justify-between bg-gray-50 px-4 py-2">
      <div class="flex items-center gap-2">
        <div 
          class="h-2 w-2 rounded-full animate-pulse" 
          :class="statusIndicatorClass"
        ></div>
        <span class="text-sm font-medium text-gray-700">{{ statusText }}</span>
      </div>
      
      <div class="text-xs text-gray-500">
        {{ secondaryInfo }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  // Dynamic display value (timer, count, etc.)
  displayValue: {
    type: String,
    required: true
  },
  displayLabel: {
    type: String,
    required: true
  },
  // Progress (0-100)
  progress: {
    type: Number,
    default: 0
  },
  // Status with indicator
  statusText: {
    type: String,
    required: true
  },
  statusType: {
    type: String,
    default: 'active',
    validator: (value) => ['active', 'paused', 'complete', 'waiting'].includes(value)
  },
  // Additional info
  secondaryInfo: {
    type: String,
    default: ''
  },
  // Theme color
  themeColor: {
    type: String,
    default: '#3b82f6'
  }
})

const gradientStyle = computed(() => ({
  background: `linear-gradient(135deg, ${props.themeColor} 0%, ${adjustColor(props.themeColor, -20)} 100%)`
}))

const progressPercentage = computed(() => {
  return Math.max(0, Math.min(100, props.progress))
})

const progressBarClass = computed(() => {
  const hue = getHueFromColor(props.themeColor)
  return `bg-gradient-to-r from-${getColorName(hue)}-400 to-${getColorName(hue)}-500`
})

const statusIndicatorClass = computed(() => {
  const indicators = {
    active: 'bg-green-500',
    paused: 'bg-yellow-500', 
    complete: 'bg-blue-500',
    waiting: 'bg-gray-400'
  }
  return indicators[props.statusType] || indicators.active
})

// Color utility functions
function adjustColor(color, amount) {
  // Simple color adjustment - in real app you'd use a proper color library
  const hex = color.replace('#', '')
  const num = parseInt(hex, 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount))
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

function getHueFromColor(color) {
  // Simplified - you'd want a proper color conversion
  const colorMap = {
    '#3b82f6': 'blue',
    '#059669': 'green', 
    '#0891b2': 'cyan',
    '#4f46e5': 'indigo',
    '#2563eb': 'blue'
  }
  return colorMap[color] || 'blue'
}

function getColorName(hue) {
  return hue
}
</script>