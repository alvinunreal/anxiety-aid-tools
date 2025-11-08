<template>
  <div class="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-50 py-8 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
    <Breadcrumb duration="1-3 min" />

    <main id="main-content" tabindex="-1">
      <section class="sektion">
        <div class="mx-auto max-w-4xl space-y-10">
          <header class="space-y-2 text-center">
            <h1 class="ptitle">{{ $t("techniques.fidgetSpinner.name") }}</h1>
          </header>

          <div class="space-y-6">
            <div class="flex justify-center">
              <div
                ref="spinnerRef"
                class="spinner"
                role="button"
                :class="{ 'is-grabbing': isPointerActive }"
                :style="spinnerStyle"
                :aria-label="t('fidgetSpinner.aria.spinnerLabel')"
                tabindex="0"
                @pointerdown="onPointerDown"
                @pointermove="onPointerMove"
                @pointerup="onPointerUp"
                @pointercancel="onPointerCancel"
                @keydown.space.prevent="boostSpin(1)"
                @keydown.enter.prevent="boostSpin(1)"
              >
              <div class="spinner-core">
                <div class="spinner-grip"></div>
              </div>

              <div class="spinner-arm arm-one">
                <div class="bearing">
                  <div class="bearing-core"></div>
                </div>
              </div>

              <div class="spinner-arm arm-two">
                <div class="bearing">
                  <div class="bearing-core"></div>
                </div>
              </div>

              <div class="spinner-arm arm-three">
                <div class="bearing">
                  <div class="bearing-core"></div>
                </div>
              </div>
              </div>
            </div>

            <!-- Audio Control -->
            <div class="flex justify-center">
              <button
                type="button"
                class="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
                :aria-label="audioMuted ? t('fidgetSpinner.aria.unmuteAudio') : t('fidgetSpinner.aria.muteAudio')"
                @click="toggleAudio"
              >
                <span v-if="audioMuted">🔇 {{ t('fidgetSpinner.audioUnmute') }}</span>
                <span v-else>🔊 {{ t('fidgetSpinner.audioMute') }}</span>
              </button>
            </div>
          </div>

          <span class="sr-only" aria-live="polite">
            {{ statusText }}
          </span>
        </div>
      </section>

      <div class="mx-auto mt-12 max-w-6xl border-t border-gray-200 pt-8 transition-colors duration-200 dark:border-slate-700">
        <RelatedTechniques current-technique-id="fidget-spinner" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { SpinnerAudio } from '~/utils/spinnerAudio'

const { t } = useI18n()

useSeoMeta({
  title: () => t('meta.fidgetSpinner.title'),
  description: () => t('meta.fidgetSpinner.description'),
  ogTitle: () => t('meta.fidgetSpinner.title'),
  ogDescription: () => t('meta.fidgetSpinner.description'),
  ogType: 'website',
  ogSiteName: 'Anxiety Aid Tools',
  twitterCard: 'summary_large_image'
})

const spinnerRef = ref(null)
const rotation = ref(0)
const velocity = ref(0)
const isPointerActive = ref(false)
const audioMuted = ref(true) // Default to muted

const pointerState = {
  lastAngle: 0,
  lastTime: 0
}

// Audio system
let spinnerAudio = null

onMounted(() => {
  spinnerAudio = new SpinnerAudio()
  spinnerAudio.init()
  
  // Load mute preference from localStorage, default to muted
  const savedMutedState = localStorage.getItem('fidgetSpinnerAudioMuted')
  if (savedMutedState !== null) {
    audioMuted.value = savedMutedState === 'true'
  } else {
    audioMuted.value = true // Default to muted on first visit
  }
  spinnerAudio.setMuted(audioMuted.value)
})

const FRICTION = 0.96
let momentumFrame = null

const spinnerStyle = computed(() => ({
  transform: `rotate(${rotation.value}deg)`
}))

const isSpinning = computed(() => isPointerActive.value || Math.abs(velocity.value) > 0.05)
const statusText = computed(() => t(`fidgetSpinner.aria.status.${isSpinning.value ? 'spinning' : 'still'}`))

const onPointerDown = (event) => {
  if (!spinnerRef.value) return
  spinnerRef.value.setPointerCapture?.(event.pointerId)
  cancelMomentum()
  isPointerActive.value = true
  velocity.value = 0
  pointerState.lastAngle = getAngle(event)
  pointerState.lastTime = performance.now()
}

const onPointerMove = (event) => {
  if (!isPointerActive.value || !spinnerRef.value) return
  const angle = getAngle(event)
  const now = performance.now()
  const deltaAngle = normalizeAngle(angle - pointerState.lastAngle)
  const deltaDeg = radToDeg(deltaAngle)
  rotation.value += deltaDeg

  const deltaTime = Math.max(now - pointerState.lastTime, 1)
  velocity.value = (deltaDeg / deltaTime) * (1000 / 60)

  // Update audio during active drag
  spinnerAudio?.update(rotation.value, velocity.value)

  pointerState.lastAngle = angle
  pointerState.lastTime = now
}

const onPointerUp = (event) => {
  if (!spinnerRef.value) return
  spinnerRef.value.releasePointerCapture?.(event.pointerId)
  isPointerActive.value = false
  startMomentum()
}

const onPointerCancel = (event) => {
  if (!spinnerRef.value) return
  spinnerRef.value.releasePointerCapture?.(event.pointerId)
  isPointerActive.value = false
  startMomentum()
}

const boostSpin = (direction = 1) => {
  velocity.value = velocity.value + 3 * direction
  startMomentum()
}

const startMomentum = () => {
  cancelMomentum()

  if (Math.abs(velocity.value) <= 0.05) {
    velocity.value = 0
    return
  }

  const step = () => {
    rotation.value += velocity.value
    velocity.value *= FRICTION

    // Update audio based on rotation and velocity
    spinnerAudio?.update(rotation.value, velocity.value)

    if (Math.abs(velocity.value) > 0.05) {
      momentumFrame = requestAnimationFrame(step)
    } else {
      velocity.value = 0
      momentumFrame = null
    }
  }

  momentumFrame = requestAnimationFrame(step)
}

const cancelMomentum = () => {
  if (momentumFrame !== null) {
    cancelAnimationFrame(momentumFrame)
    momentumFrame = null
  }
}

const getAngle = (event) => {
  const rect = spinnerRef.value.getBoundingClientRect()
  const x = event.clientX - (rect.left + rect.width / 2)
  const y = event.clientY - (rect.top + rect.height / 2)
  return Math.atan2(y, x)
}

const normalizeAngle = (angle) => {
  if (angle > Math.PI) {
    return angle - Math.PI * 2
  }
  if (angle < -Math.PI) {
    return angle + Math.PI * 2
  }
  return angle
}

const radToDeg = (radians) => radians * (180 / Math.PI)

const toggleAudio = () => {
  audioMuted.value = !audioMuted.value
  spinnerAudio?.setMuted(audioMuted.value)
  
  // Save preference to localStorage
  localStorage.setItem('fidgetSpinnerAudioMuted', audioMuted.value.toString())
}

onUnmounted(() => {
  cancelMomentum()
  if (spinnerAudio?.audioContext) {
    spinnerAudio.audioContext.close()
  }
})
</script>

<style scoped>
.spinner {
  position: relative;
  width: min(20rem, 75vw);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: transparent;
  cursor: grab;
  touch-action: none;
  user-select: none;
  transition: filter 0.3s ease;
}

.spinner.is-grabbing {
  cursor: grabbing;
  filter: drop-shadow(0 0 28px rgba(74, 222, 128, 0.4));
}

.spinner-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 36%;
  aspect-ratio: 1 / 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 32%, rgba(34, 197, 94, 0.55), rgba(15, 118, 110, 0.12)),
    linear-gradient(145deg, rgba(15, 118, 110, 0.45), rgba(15, 118, 110, 0.05));
  box-shadow:
    inset -6px -6px 12px rgba(15, 118, 110, 0.25),
    inset 4px 4px 14px rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-grip {
  width: 48%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(148, 163, 184, 0.5));
  box-shadow:
    inset 3px 3px 8px rgba(15, 118, 110, 0.25),
    inset -3px -3px 10px rgba(255, 255, 255, 0.45);
}

.spinner-arm {
  position: absolute;
  width: 42%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(34, 197, 94, 0.7), rgba(21, 128, 61, 0.45));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    inset -6px -6px 10px rgba(15, 118, 110, 0.25),
    inset 4px 4px 12px rgba(255, 255, 255, 0.5);
}

.spinner-arm::after {
  content: "";
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(15, 118, 110, 0.25), rgba(15, 118, 110, 0));
  opacity: 0.6;
}

.arm-one {
  transform: translate(-50%, -50%) rotate(0) translateY(-78%);
  transform-origin: center center;
  top: 50%;
  left: 50%;
}

.arm-two {
  transform: translate(-50%, -50%) rotate(120deg) translateY(-78%);
  transform-origin: center center;
  top: 50%;
  left: 50%;
}

.arm-three {
  transform: translate(-50%, -50%) rotate(240deg) translateY(-78%);
  transform-origin: center center;
  top: 50%;
  left: 50%;
}

.bearing {
  width: 68%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(148, 163, 184, 0.9), rgba(148, 163, 184, 0.4));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    inset 4px 4px 8px rgba(255, 255, 255, 0.35),
    inset -4px -4px 10px rgba(15, 118, 110, 0.3);
}

.bearing-core {
  width: 68%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(15, 118, 110, 0.75), rgba(15, 118, 110, 0.25));
  box-shadow:
    inset 3px 3px 6px rgba(0, 0, 0, 0.12),
    inset -3px -3px 6px rgba(255, 255, 255, 0.18);
}

@media (prefers-color-scheme: dark) {
  .spinner {
    background: transparent;
  }
}
</style>
