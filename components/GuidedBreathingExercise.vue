<template>
  <section class="sektion scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseStarted && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:timer-fill" class="mx-auto text-6xl text-blue-600 dark:text-blue-400" />
        </div>
        <h1 class="ptitle">{{ $t("techniques.guidedBreathing.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300">
          {{ $t("techniques.guidedBreathing.description") }}
        </p>

        <!-- Technique Selection Grid -->
        <div class="mx-auto mb-8 grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="technique in techniques"
            :key="technique.key"
            @click="selectedTechnique = technique.key"
            class="cursor-pointer border-2 p-6 touch-manipulation transition-all duration-100 hover:border-blue-300 hover:bg-blue-50/50 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
            :class="
              selectedTechnique === technique.key
                ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30'
                : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800'
            "
          >
            <div class="mb-3">
              <Icon
                :name="technique.icon"
                class="mx-auto text-3xl"
                :class="selectedTechnique === technique.key ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-slate-500'"
              />
            </div>
            <p class="mb-2 font-semibold text-gray-800 dark:text-slate-100">{{ technique.name }}</p>
            <p class="mb-3 text-sm text-gray-600 dark:text-slate-300">{{ technique.description }}</p>
            <div class="text-xs font-medium" :style="{ color: technique.color }">
              {{ technique.timing }}
            </div>
            <div class="mt-2 text-xs text-gray-500 dark:text-slate-400">
              {{ technique.bestFor }}
            </div>
          </div>
        </div>

        <AudioControl
          :enabled="audioEnabled"
          @toggle="toggleAudio"
        />

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-2 bg-blue-600 dark:bg-blue-500 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          <Icon name="ph:play-fill" class="text-xl" />
          <span>{{ $t('guidedBreathing.interface.begin') }} {{ currentTechnique.name }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseStarted && !exerciseCompleted">
      <!-- Session Header -->
      <SessionHeader
        :icon="currentTechnique.icon"
        :title="currentTechnique.name"
        :subtitle="currentTechnique.description"
        :display-value="formatTime(elapsedTime)"
:display-label="$t('guidedBreathing.interface.elapsed')"
        :progress="(currentCycle / totalCycles) * 100"
:status-text="`${currentTechnique.timing} ${$t('guidedBreathing.interface.pattern')}`"
        status-type="active"
:secondary-info="`${currentCycle}/${totalCycles} ${$t('guidedBreathing.interface.cycles')}`"
        :theme-color="currentTechnique.color"
      />

      <!-- Main Exercise Area -->
      <div class="border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 md:p-8 transition-colors duration-200">
        <div class="flex flex-col items-center">
          <!-- Breathing Animation -->
          <BreathingAnimation
            :is-active="exerciseStarted && !isPaused"
            :breathing-phase="breathingPhase"
            :phase-duration="phaseDuration"
            :color="currentTechnique.color"
          />

          <!-- Breathing Guidance -->
          <div class="mb-6 text-center">
            <div class="transition-all duration-500">
              <div class="mb-1 text-2xl font-light text-gray-700 dark:text-slate-200">
                {{ phaseText }}
              </div>
              <div class="text-sm text-gray-400 dark:text-slate-500">{{ Math.ceil(phaseDuration / 1000) }} {{ $t('guidedBreathing.interface.seconds') }}</div>
            </div>
          </div>

          <!-- Progress Section -->
          <div class="mb-6 w-full max-w-sm">
            <!-- Session Progress -->
            <div class="mb-4">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700 dark:text-slate-200">{{ $t('guidedBreathing.interface.sessionProgress') }}</span>
                <span class="text-sm text-gray-500 dark:text-slate-400">{{ currentCycle }}/{{ totalCycles }}</span>
              </div>
              <!-- Stepped progress indicator -->
              <div class="flex gap-1">
                <div
                  v-for="cycle in totalCycles"
                  :key="cycle"
                  class="h-1.5 flex-1 transition-all duration-100"
                  :class="cycle <= currentCycle ? '' : 'dark:!bg-slate-600'"
                  :style="{
                    backgroundColor: cycle <= currentCycle ? currentTechnique.color : '#e5e7eb',
                  }"
                ></div>
              </div>
            </div>

            <!-- Breath Progress -->
            <div class="mb-6">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700 dark:text-slate-200">{{ $t('guidedBreathing.interface.currentPhase') }}</span>
                <span class="font-mono text-sm text-gray-500 dark:text-slate-400">{{
                  formatCountdown(remainingTime)
                }}</span>
              </div>
              <div class="h-1.5 w-full bg-gray-200 dark:bg-slate-600">
                <div
                  class="h-full transition-all duration-100"
                  :style="{
                    width: phaseProgress + '%',
                    backgroundColor: currentTechnique.color,
                  }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <AudioControl
            :enabled="audioEnabled"
            @toggle="toggleAudio"
          />
          <div class="flex gap-3">
            <button
              v-if="!exerciseStarted || isPaused"
              @click="isPaused ? resumeExercise() : startExercise()"
              class="flex items-center gap-2 bg-green-600 dark:bg-green-500 px-6 py-3 font-medium text-white transition-colors duration-100 hover:bg-green-700 dark:hover:bg-green-600"
            >
              <Icon name="ph:play-fill" class="text-lg" />
              <span>{{
                isPaused ? $t('guidedBreathing.interface.resume') : exerciseCompleted ? $t('breathing.buttons.practiceAgain') : $t('guidedBreathing.interface.beginExercise')
              }}</span>
            </button>
            <button
              v-if="exerciseStarted && !isPaused"
              @click="pauseExercise"
              class="flex items-center gap-2 bg-yellow-600 dark:bg-yellow-500 px-6 py-3 font-medium text-white transition-colors duration-100 hover:bg-yellow-700 dark:hover:bg-yellow-600"
            >
              <Icon name="ph:pause-fill" class="text-lg" />
              <span>{{ $t('guidedBreathing.interface.pause') }}</span>
            </button>
            <button
              v-if="exerciseStarted"
              @click="stopExercise"
              class="flex items-center gap-2 bg-red-600 dark:bg-red-500 px-6 py-3 font-medium text-white transition-colors duration-100 hover:bg-red-700 dark:hover:bg-red-600"
            >
              <Icon name="ph:stop-fill" class="text-lg" />
              <span>{{ $t('guidedBreathing.interface.stop') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Completion State -->
    <div v-if="exerciseCompleted" class="mb-6 border border-green-200 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-8 text-center transition-colors duration-200">
      <Icon name="ph:check-circle-fill" class="mx-auto mb-4 text-4xl text-green-600 dark:text-green-400" />
      <p class="mb-2 text-xl font-semibold text-gray-800 dark:text-slate-100">{{ $t('guidedBreathing.interface.exerciseComplete') }}</p>
      <p class="mb-4 text-gray-600 dark:text-slate-300">
        {{ $t('guidedBreathing.interface.excellentWork', { completedCycles, techniqueName: currentTechnique.name, totalTime: formatTime(totalSessionTime) }) }}
      </p>
      <div class="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-slate-400">
        <div class="flex items-center gap-1">
          <Icon name="ph:lungs-fill" class="text-blue-400" />
          <span>{{ $t('guidedBreathing.interface.breathingOptimized') }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="ph:brain-fill" class="text-purple-400" />
          <span>{{ $t('guidedBreathing.interface.mindCentered') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { breathingAudio } from '~/utils/breathingAudio'
const { t } = useI18n();

const techniques = [
  {
    key: "box",
    name: t("guidedBreathing.techniques.boxBreathing.name"),
    description: t("guidedBreathing.techniques.boxBreathing.description"),
    timing: t("guidedBreathing.techniques.boxBreathing.timing"),
    color: "#3b82f6",
    icon: "ph:squares-four",
    bestFor: t("guidedBreathing.techniques.boxBreathing.bestFor"),
    pattern: [
      { phase: "inhale", duration: 4000, text: t("guidedBreathing.interface.breatheIn") },
      { phase: "hold_in", duration: 4000, text: t("guidedBreathing.interface.hold") },
      { phase: "exhale", duration: 4000, text: t("guidedBreathing.interface.breatheOut") },
      { phase: "hold_out", duration: 4000, text: t("guidedBreathing.interface.hold") },
    ],
  },
  {
    key: "calming",
    name: t("guidedBreathing.techniques.calming.name"),
    description: t("guidedBreathing.techniques.calming.description"),
    timing: t("guidedBreathing.techniques.calming.timing"),
    color: "#8b5cf6",
    icon: "ph:moon-stars",
    bestFor: t("guidedBreathing.techniques.calming.bestFor"),
    pattern: [
      { phase: "inhale", duration: 4000, text: t("guidedBreathing.interface.breatheIn") },
      { phase: "hold_in", duration: 7000, text: t("guidedBreathing.interface.hold") },
      { phase: "exhale", duration: 8000, text: t("guidedBreathing.interface.breatheOut") },
    ],
  },
  {
    key: "energizing",
    name: t("guidedBreathing.techniques.energizing.name"),
    description: t("guidedBreathing.techniques.energizing.description"),
    timing: t("guidedBreathing.techniques.energizing.timing"),
    color: "#10b981",
    icon: "ph:lightning",
    bestFor: t("guidedBreathing.techniques.energizing.bestFor"),
    pattern: [
      { phase: "inhale", duration: 4000, text: t("guidedBreathing.interface.breatheIn") },
      { phase: "hold_in", duration: 4000, text: t("guidedBreathing.interface.hold") },
      { phase: "exhale", duration: 6000, text: t("guidedBreathing.interface.breatheOut") },
    ],
  },
  {
    key: "quick",
    name: t("guidedBreathing.techniques.quickReset.name"),
    description: t("guidedBreathing.techniques.quickReset.description"),
    timing: t("guidedBreathing.techniques.quickReset.timing"),
    color: "#f59e0b",
    icon: "ph:clock",
    bestFor: t("guidedBreathing.techniques.quickReset.bestFor"),
    pattern: [
      { phase: "inhale", duration: 3000, text: t("guidedBreathing.interface.breatheIn") },
      { phase: "hold_in", duration: 3000, text: t("guidedBreathing.interface.hold") },
      { phase: "exhale", duration: 3000, text: t("guidedBreathing.interface.breatheOut") },
    ],
  },
];

const sessionLengths = [
  { cycles: 5, name: "Quick", duration: "2-3 min" },
  { cycles: 8, name: "Standard", duration: "3-5 min" },
  { cycles: 12, name: "Extended", duration: "5-8 min" },
];

const exerciseStarted = ref(false);
const exerciseCompleted = ref(false);
const isPaused = ref(false);
const audioEnabled = ref(false);
const selectedTechnique = ref("box");
const selectedSessionLength = ref(8); // Default to standard (8 cycles)

const currentCycle = ref(0);
const completedCycles = ref(0);
const totalCycles = ref(8);

const breathingPhase = ref("exhale");
const currentPatternIndex = ref(0);
const phaseProgress = ref(0);
const remainingTime = ref(0);

const elapsedTime = ref(0);
const totalSessionTime = ref(0);

let phaseTimer = null;
let progressTimer = null;
let elapsedTimer = null;

const currentTechnique = computed(() => techniques.find((t) => t.key === selectedTechnique.value));

const currentPattern = computed(() => currentTechnique.value.pattern[currentPatternIndex.value]);

const phaseText = computed(() => currentPattern.value?.text || t('guidedBreathing.interface.ready'));
const phaseDuration = computed(() => currentPattern.value?.duration || 1000);

const formatTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const formatCountdown = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const milliseconds = Math.floor((ms % 1000) / 100); // Convert to single digit milliseconds
  return `${seconds}.${milliseconds}s`;
};

const exerciseSection = ref(null);

// Watch for technique changes and update audio
watch(selectedTechnique, (newTechnique) => {
  if (audioEnabled.value) {
    // Stop current audio and switch to new technique
    breathingAudio.stopAll();
    breathingAudio.setTechnique(newTechnique);
  }
});

const toggleAudio = async (enabled) => {
  audioEnabled.value = enabled;
  await breathingAudio.setEnabled(enabled, selectedTechnique.value);
};

const startExercise = async () => {
  exerciseStarted.value = true;
  exerciseCompleted.value = false;
  isPaused.value = false;
  currentCycle.value = 1;
  totalCycles.value = selectedSessionLength.value;
  currentPatternIndex.value = 0;
  elapsedTime.value = 0;

  // Ensure audio is loaded and primed if enabled
  if (audioEnabled.value) {
    await breathingAudio.setEnabled(true, selectedTechnique.value);
  }

  // Scroll to exercise header
  nextTick(() => {
    exerciseSection.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  // Start elapsed time tracking
  elapsedTimer = setInterval(() => {
    if (!isPaused.value && exerciseStarted.value) {
      elapsedTime.value += 100;
    }
  }, 100);

  startBreathingPattern();
};

const startBreathingPattern = () => {
  if (currentCycle.value > totalCycles.value) {
    completeExercise();
    return;
  }

  const pattern = currentTechnique.value.pattern[currentPatternIndex.value];
  breathingPhase.value = pattern.phase;
  remainingTime.value = pattern.duration;

  // Play audio cue for inhale/exhale phases
  if (audioEnabled.value) {
    if (pattern.phase === 'inhale') {
      breathingAudio.playInhaleCue();
    } else if (pattern.phase === 'exhale') {
      breathingAudio.playExhaleCue();
    }
    // No audio for hold_in and hold_out phases
  }

  // Set initial progress based on phase type
  if (pattern.phase === "inhale") {
    phaseProgress.value = 0; // Start empty
  } else if (pattern.phase === "hold_in") {
    phaseProgress.value = 100; // Start full (after inhale)
  } else if (pattern.phase === "hold_out") {
    phaseProgress.value = 0; // Start empty (after exhale)
  } else if (pattern.phase === "exhale") {
    phaseProgress.value = 100; // Start full
  }

  // Clear existing timers
  if (phaseTimer) clearTimeout(phaseTimer);
  if (progressTimer) clearInterval(progressTimer);

  // Start progress tracking
  const startTime = Date.now();
  progressTimer = setInterval(() => {
    if (isPaused.value || !exerciseStarted.value) return;

    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / pattern.duration) * 100, 100);

    // Set progress based on phase type
    if (pattern.phase === "inhale") {
      phaseProgress.value = progress; // Fill up
    } else if (pattern.phase === "hold_in") {
      phaseProgress.value = 100; // Stay full (after inhale)
    } else if (pattern.phase === "hold_out") {
      phaseProgress.value = 0; // Stay empty (after exhale)
    } else if (pattern.phase === "exhale") {
      phaseProgress.value = 100 - progress; // Drain down
    }

    remainingTime.value = Math.max(pattern.duration - elapsed, 0);

    if (progress >= 100) {
      clearInterval(progressTimer);
    }
  }, 50);

  // Move to next phase
  phaseTimer = setTimeout(() => {
    if (isPaused.value || !exerciseStarted.value) return;

    currentPatternIndex.value++;

    if (currentPatternIndex.value >= currentTechnique.value.pattern.length) {
      currentPatternIndex.value = 0;
      currentCycle.value++;
    }

    startBreathingPattern();
  }, pattern.duration);
};

const pauseExercise = () => {
  isPaused.value = true;
  // Stop audio when pausing
  breathingAudio.stop();
};

const resumeExercise = () => {
  isPaused.value = false;
  // Continue from where we left off
  startBreathingPattern();
};

const stopExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = false;
  isPaused.value = false;
  currentCycle.value = 0;
  currentPatternIndex.value = 0;
  phaseProgress.value = 0;
  remainingTime.value = 0;
  elapsedTime.value = 0;
  breathingPhase.value = "exhale";

  // Stop any playing audio immediately
  breathingAudio.stop();

  clearAllTimers();
};

const completeExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = true;
  completedCycles.value = totalCycles.value;
  totalSessionTime.value = elapsedTime.value;

  // Stop audio on completion
  breathingAudio.stop();

  clearAllTimers();
};

const clearAllTimers = () => {
  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
  if (elapsedTimer) {
    clearInterval(elapsedTimer);
    elapsedTimer = null;
  }
};

// Cleanup on unmount
onUnmounted(() => {
  clearAllTimers();
  breathingAudio.stopAll();
  // Don't fully cleanup as other exercises might use the same audio instance
});

// Stop audio when exercise is no longer active
watch(exerciseStarted, (isStarted) => {
  if (!isStarted) {
    breathingAudio.stop();
  }
});
</script>
