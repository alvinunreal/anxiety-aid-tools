<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:wind-fill" class="mx-auto text-6xl text-cyan-600 dark:text-cyan-400" />
        </div>
        <h1 class="ptitle">{{ $t("techniques.breathing.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300">
          {{ $t("techniques.breathing.description") }}
        </p>

        <!-- Benefits Preview -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border border-cyan-100 dark:border-cyan-600 bg-white dark:bg-slate-800 p-4 transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-2xl text-cyan-600 dark:text-cyan-400" />
            <p class="mb-1 font-semibold text-gray-800 dark:text-slate-100">
              {{ $t("breathing.benefits.calm.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("breathing.benefits.calm.description") }}</p>
          </div>
          <div class="border border-blue-100 dark:border-blue-600 bg-white dark:bg-slate-800 p-4 transition-colors duration-200">
            <Icon name="ph:brain-fill" class="mx-auto mb-2 text-2xl text-blue-600 dark:text-blue-400" />
            <p class="mb-1 font-semibold text-gray-800 dark:text-slate-100">
              {{ $t("breathing.benefits.focus.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("breathing.benefits.focus.description") }}</p>
          </div>
          <div class="border border-green-100 dark:border-green-600 bg-white dark:bg-slate-800 p-4 transition-colors duration-200">
            <Icon name="ph:leaf-fill" class="mx-auto mb-2 text-2xl text-green-600 dark:text-green-400" />
            <p class="mb-1 font-semibold text-gray-800 dark:text-slate-100">
              {{ $t("breathing.benefits.relax.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("breathing.benefits.relax.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
          :aria-label="$t('breathing.buttons.beginAriaLabel')"
        >
          <Icon name="ph:play-fill" class="text-xl" />
          <span>{{ $t("breathing.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseActive">
      <!-- Progress Header -->
      <SessionHeader
        icon="ph:wind-fill"
        :title="$t('breathing.session.title')"
        :subtitle="$t('breathing.session.subtitle')"
        :display-value="formatTime(elapsedTime)"
        :display-label="$t('breathing.session.elapsed')"
        :progress="(currentBreath / totalBreaths) * 100"
        :status-text="breathingPhase === 'inhale' ? $t('breathing.session.inhaling') : $t('breathing.session.exhaling')"
        status-type="active"
        :secondary-info="`${currentBreath}/${totalBreaths} ${$t('breathing.session.breaths')}`"
        theme-color="#0891b2"
      />

      <!-- Breathing Visualization -->
      <div class="border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 md:p-8 transition-colors duration-200">
        <div class="flex flex-col items-center">
          <!-- Breathing Animation -->
          <BreathingAnimation
            :is-active="exerciseActive"
            :breathing-phase="breathingPhase"
            :phase-duration="breathingPhase === 'inhale' ? 4000 : 6000"
            color="#0891b2"
          />

          <!-- Breathing Guidance -->
          <div class="mb-6 text-center">
            <div class="transition-all duration-500">
              <div class="mb-1 text-2xl font-light text-gray-700 dark:text-slate-200">
                {{
                  breathingPhase === "inhale"
                    ? $t("breathing.session.breatheIn")
                    : $t("breathing.session.breatheOut")
                }}
              </div>
              <div class="text-sm text-gray-400 dark:text-slate-500">
                {{
                  breathingPhase === "inhale"
                    ? $t("breathing.session.fourSeconds")
                    : $t("breathing.session.sixSeconds")
                }}
              </div>
            </div>
          </div>

          <!-- Progress Section -->
          <div class="mb-6 w-full max-w-sm">
            <!-- Session Progress -->
            <div class="mb-4">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700 dark:text-slate-200">{{
                  $t("breathing.session.sessionProgress")
                }}</span>
                <span class="text-sm text-gray-500 dark:text-slate-400">{{ currentBreath }}/{{ totalBreaths }}</span>
              </div>
              <!-- Stepped progress indicator -->
              <div class="flex gap-1" role="progressbar" :aria-valuenow="currentBreath" :aria-valuemax="totalBreaths" aria-valuemin="0" :aria-label="$t('breathing.session.sessionProgressAriaLabel', { current: currentBreath, total: totalBreaths })">
                <div
                  v-for="step in totalBreaths"
                  :key="step"
                  class="h-1.5 flex-1 transition-all duration-200"
                  :class="step <= currentBreath ? 'bg-green-500 dark:bg-green-400' : 'bg-gray-200 dark:bg-slate-600'"
                ></div>
              </div>
            </div>

            <!-- Breath Progress -->
            <div class="mb-6">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700 dark:text-slate-200">{{
                  $t("breathing.session.currentBreath")
                }}</span>
                <span class="font-mono text-sm text-gray-500 dark:text-slate-400">{{
                  formatCountdown(remainingTime)
                }}</span>
              </div>
              <div class="h-1.5 w-full bg-gray-200 dark:bg-slate-600" role="progressbar" :aria-valuenow="breathProgress" aria-valuemax="100" aria-valuemin="0" :aria-label="$t('breathing.session.breathProgressAriaLabel', { progress: Math.round(breathProgress) })">
                <div
                  class="h-full bg-cyan-600 dark:bg-cyan-400 transition-all duration-100"
                  :style="{ width: breathProgress + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex gap-3">
            <button
              @click="stopExercise"
              class="flex items-center gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 px-6 py-3 font-medium text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
              :aria-label="$t('breathing.buttons.stopAriaLabel')"
            >
              <Icon name="ph:stop-fill" class="text-lg" />
              <span>{{ $t("breathing.buttons.stop") }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Completion State -->
    <div v-if="exerciseCompleted" class="text-center">
      <div class="mb-8 border border-green-200 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-8 transition-colors duration-200">
        <Icon name="ph:check-circle-fill" class="mx-auto mb-6 text-6xl text-green-600 dark:text-green-400" />
        <h3 class="mb-4 text-3xl font-semibold text-gray-800 dark:text-slate-100">
          {{ $t("breathing.completion.title") }}
        </h3>
        <p class="mb-6 text-gray-600 dark:text-slate-300">
          {{
            $t("breathing.completion.description", {
              count: totalBreaths,
              time: formatTime(totalSessionTime),
            })
          }}
        </p>

        <!-- Benefits Achieved -->
        <div class="mb-6 flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-slate-300">
          <div class="flex items-center gap-1">
            <Icon name="ph:heart-fill" class="text-red-500 dark:text-red-400" />
            <span>{{ $t("breathing.completion.benefits.heartRate") }}</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="ph:brain-fill" class="text-cyan-500 dark:text-cyan-400" />
            <span>{{ $t("breathing.completion.benefits.mind") }}</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="ph:wind-fill" class="text-blue-500 dark:text-blue-400" />
            <span>{{ $t("breathing.completion.benefits.breathing") }}</span>
          </div>
        </div>

        <button
          @click="resetExercise"
          class="mx-auto flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
          :aria-label="$t('breathing.buttons.practiceAgainAriaLabel')"
        >
          <Icon name="ph:arrow-clockwise" class="text-xl" />
          <span>{{ $t("breathing.buttons.practiceAgain") }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { vAutoAnimate } from '@formkit/auto-animate/vue'

const haptics = useHaptics()
const exerciseActive = ref(false);
const exerciseCompleted = ref(false);
const currentBreath = ref(0);
const totalBreaths = 12;
const breathingPhase = ref("inhale");
const breathingText = ref("Ready to Begin");
const breathProgress = ref(0);
const remainingTime = ref(0);
const elapsedTime = ref(0);
const totalSessionTime = ref(0);
let breathTimer = null;
let elapsedTimer = null;

const formatTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const exerciseSection = ref(null);

const startExercise = () => {
  // Haptic feedback for exercise start
  haptics.success();

  exerciseActive.value = true;
  exerciseCompleted.value = false;
  currentBreath.value = 0;
  elapsedTime.value = 0;
  breathingText.value = "Breathe In";

  // Scroll to exercise header
  nextTick(() => {
    exerciseSection.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  // Start elapsed time tracking
  elapsedTimer = setInterval(() => {
    elapsedTime.value += 1000;
  }, 1000);

  startBreathingCycle();
};

const formatCountdown = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const milliseconds = Math.floor((ms % 1000) / 100);
  return `${seconds}.${milliseconds}s`;
};

const updateBreathProgress = (duration, phase) => {
  if (breathTimer) {
    clearInterval(breathTimer);
  }

  const startTime = Date.now();
  remainingTime.value = duration;

  if (phase === "inhale") {
    breathProgress.value = 0;
  } else {
    breathProgress.value = 100;
  }

  breathTimer = setInterval(() => {
    if (!exerciseActive.value) {
      clearInterval(breathTimer);
      return;
    }

    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / duration) * 100, 100);

    if (phase === "inhale") {
      breathProgress.value = progress;
    } else {
      breathProgress.value = 100 - progress;
    }

    remainingTime.value = Math.max(duration - elapsed, 0);

    if (progress >= 100) {
      clearInterval(breathTimer);
    }
  }, 50);
};

const startBreathingCycle = () => {
  if (!exerciseActive.value || currentBreath.value > totalBreaths) {
    if (exerciseActive.value) completeExercise();
    return;
  }

  // Exhale phase (start with this)
  breathingPhase.value = "inhale";
  breathingText.value = "Breathe In";
  updateBreathProgress(4000, "inhale");

  setTimeout(() => {
    if (!exerciseActive.value) return;

    // Inhale phase
    breathingPhase.value = "exhale";
    breathingText.value = "Breathe Out";
    updateBreathProgress(6000, "exhale");

    setTimeout(() => {
      if (exerciseActive.value) {
        currentBreath.value++;
        startBreathingCycle();
      }
    }, 6000);
  }, 4000);
};

const stopExercise = () => {
  exerciseActive.value = false;
  exerciseCompleted.value = false;
  currentBreath.value = 0;
  breathProgress.value = 0;
  breathingText.value = "Ready to Begin";
  elapsedTime.value = 0;

  if (breathTimer) {
    clearInterval(breathTimer);
    breathTimer = null;
  }

  if (elapsedTimer) {
    clearInterval(elapsedTimer);
    elapsedTimer = null;
  }
};

const completeExercise = () => {
  // Haptic feedback for exercise completion
  haptics.success();

  exerciseActive.value = false;
  exerciseCompleted.value = true;
  breathingText.value = "Complete";
  totalSessionTime.value = elapsedTime.value;

  if (breathTimer) {
    clearInterval(breathTimer);
    breathTimer = null;
  }

  if (elapsedTimer) {
    clearInterval(elapsedTimer);
    elapsedTimer = null;
  }
};

const resetExercise = () => {
  exerciseActive.value = false;
  exerciseCompleted.value = false;
  currentBreath.value = 0;
  breathProgress.value = 0;
  breathingText.value = "Ready to Begin";
  elapsedTime.value = 0;
  totalSessionTime.value = 0;
};

// Cleanup on unmount
onUnmounted(() => {
  if (breathTimer) {
    clearInterval(breathTimer);
  }
  if (elapsedTimer) {
    clearInterval(elapsedTimer);
  }
});
</script>
