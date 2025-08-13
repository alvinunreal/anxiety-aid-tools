<template>
  <section class="sektion" ref="exerciseSection">
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseStarted && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:circles-three-fill" class="mx-auto text-6xl text-blue-600" />
        </div>
        <h1 class="ptitle">{{ $t("techniques.guidedBreathing.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600">
          {{ $t("techniques.guidedBreathing.description") }}
        </p>

        <!-- Technique Selection Grid -->
        <div class="mx-auto mb-8 grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="technique in techniques"
            :key="technique.key"
            @click="selectedTechnique = technique.key"
            class="cursor-pointer border-2 p-6 touch-manipulation transition-all duration-100 hover:border-blue-300 hover:bg-blue-50/50"
            :class="
              selectedTechnique === technique.key
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            "
          >
            <div class="mb-3">
              <Icon
                :name="technique.icon"
                class="mx-auto text-3xl"
                :class="selectedTechnique === technique.key ? 'text-blue-600' : 'text-gray-400'"
              />
            </div>
            <p class="mb-2 font-semibold text-gray-800">{{ technique.name }}</p>
            <p class="mb-3 text-sm text-gray-600">{{ technique.description }}</p>
            <div class="text-xs font-medium" :style="{ color: technique.color }">
              {{ technique.timing }}
            </div>
            <div class="mt-2 text-xs text-gray-500">
              {{ technique.bestFor }}
            </div>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-2 bg-blue-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-blue-700"
        >
          <Icon name="ph:play-fill" class="text-xl" />
          <span>Begin {{ currentTechnique.name }}</span>
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
        display-label="elapsed"
        :progress="(currentCycle / totalCycles) * 100"
        :status-text="`${currentTechnique.timing} pattern`"
        status-type="active"
        :secondary-info="`${currentCycle}/${totalCycles} cycles`"
        :theme-color="currentTechnique.color"
      />

      <!-- Main Exercise Area -->
      <div class="border border-gray-200 bg-white/60 p-8">
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
              <div class="mb-1 text-2xl font-light text-gray-700">
                {{ phaseText }}
              </div>
              <div class="text-sm text-gray-400">{{ Math.ceil(phaseDuration / 1000) }} seconds</div>
            </div>
          </div>

          <!-- Progress Section -->
          <div class="mb-6 w-full max-w-sm">
            <!-- Session Progress -->
            <div class="mb-4">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Session Progress</span>
                <span class="text-sm text-gray-500">{{ currentCycle }}/{{ totalCycles }}</span>
              </div>
              <!-- Stepped progress indicator -->
              <div class="flex gap-1">
                <div
                  v-for="cycle in totalCycles"
                  :key="cycle"
                  class="h-1.5 flex-1 transition-all duration-100"
                  :style="{
                    backgroundColor: cycle <= currentCycle ? currentTechnique.color : '#e5e7eb',
                  }"
                ></div>
              </div>
            </div>

            <!-- Breath Progress -->
            <div class="mb-6">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Current Phase</span>
                <span class="font-mono text-sm text-gray-500">{{
                  formatCountdown(remainingTime)
                }}</span>
              </div>
              <div class="h-1.5 w-full bg-gray-200">
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
          <div class="flex gap-3">
            <button
              v-if="!exerciseStarted || isPaused"
              @click="isPaused ? resumeExercise() : startExercise()"
              class="flex items-center gap-2 bg-green-600 px-6 py-3 font-medium text-white transition-colors duration-100 hover:bg-green-700"
            >
              <Icon name="ph:play-fill" class="text-lg" />
              <span>{{
                isPaused ? "Resume" : exerciseCompleted ? "Practice Again" : "Begin Exercise"
              }}</span>
            </button>
            <button
              v-if="exerciseStarted && !isPaused"
              @click="pauseExercise"
              class="flex items-center gap-2 bg-yellow-600 px-6 py-3 font-medium text-white transition-colors duration-100 hover:bg-yellow-700"
            >
              <Icon name="ph:pause-fill" class="text-lg" />
              <span>Pause</span>
            </button>
            <button
              v-if="exerciseStarted"
              @click="stopExercise"
              class="flex items-center gap-2 bg-red-600 px-6 py-3 font-medium text-white transition-colors duration-100 hover:bg-red-700"
            >
              <Icon name="ph:stop-fill" class="text-lg" />
              <span>Stop</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Completion State -->
    <div v-if="exerciseCompleted" class="mb-6 border border-green-200 bg-green-50 p-8 text-center">
      <Icon name="ph:check-circle-fill" class="mx-auto mb-4 text-4xl text-green-600" />
      <p class="mb-2 text-xl font-semibold text-gray-800">Exercise Complete</p>
      <p class="mb-4 text-gray-600">
        Excellent work! You've completed {{ completedCycles }} cycles of
        {{ currentTechnique.name }} in {{ formatTime(totalSessionTime) }}.
      </p>
      <div class="flex items-center justify-center gap-4 text-sm text-gray-500">
        <div class="flex items-center gap-1">
          <Icon name="ph:lungs-fill" class="text-blue-400" />
          <span>Breathing optimized</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="ph:brain-fill" class="text-purple-400" />
          <span>Mind centered</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const techniques = [
  {
    key: "box",
    name: "Box Breathing",
    description: "Equal timing for calm focus",
    timing: "4-4-4-4",
    color: "#3b82f6",
    icon: "ph:squares-four",
    bestFor: "Focus & concentration",
    pattern: [
      { phase: "inhale", duration: 4000, text: "breathe in" },
      { phase: "hold_in", duration: 4000, text: "hold" },
      { phase: "exhale", duration: 4000, text: "breathe out" },
      { phase: "hold_out", duration: 4000, text: "hold" },
    ],
  },
  {
    key: "calming",
    name: "4-7-8 Technique",
    description: "Extended hold for deep relaxation",
    timing: "4-7-8",
    color: "#8b5cf6",
    icon: "ph:moon-stars",
    bestFor: "Deep relaxation & sleep",
    pattern: [
      { phase: "inhale", duration: 4000, text: "breathe in" },
      { phase: "hold_in", duration: 7000, text: "hold" },
      { phase: "exhale", duration: 8000, text: "breathe out" },
    ],
  },
  {
    key: "energizing",
    name: "Energizing 4-4-6",
    description: "Balanced pattern for alertness",
    timing: "4-4-6",
    color: "#10b981",
    icon: "ph:lightning",
    bestFor: "Energy & mental clarity",
    pattern: [
      { phase: "inhale", duration: 4000, text: "breathe in" },
      { phase: "hold_in", duration: 4000, text: "hold" },
      { phase: "exhale", duration: 6000, text: "breathe out" },
    ],
  },
  {
    key: "quick",
    name: "Quick Reset",
    description: "Fast technique for immediate relief",
    timing: "3-3-3",
    color: "#f59e0b",
    icon: "ph:clock",
    bestFor: "Quick stress relief",
    pattern: [
      { phase: "inhale", duration: 3000, text: "breathe in" },
      { phase: "hold_in", duration: 3000, text: "hold" },
      { phase: "exhale", duration: 3000, text: "breathe out" },
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

const phaseText = computed(() => currentPattern.value?.text || "ready");
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

const startExercise = () => {
  exerciseStarted.value = true;
  exerciseCompleted.value = false;
  isPaused.value = false;
  currentCycle.value = 1;
  totalCycles.value = selectedSessionLength.value;
  currentPatternIndex.value = 0;
  elapsedTime.value = 0;

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

  clearAllTimers();
};

const completeExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = true;
  completedCycles.value = totalCycles.value;
  totalSessionTime.value = elapsedTime.value;

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

onUnmounted(() => {
  clearAllTimers();
});
</script>
