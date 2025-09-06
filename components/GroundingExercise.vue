<template>
  <section class="sektion scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseStarted && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:anchor-simple-fill" class="mx-auto mb-4 text-6xl text-green-600" />
          <h1 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-slate-100">
            {{ $t("techniques.grounding.name") }}
          </h1>
          <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300">
            {{ $t("techniques.grounding.description") }}
          </p>
        </div>

        <!-- Benefits Preview -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border border-green-100 dark:border-green-900 bg-white dark:bg-slate-800 p-4 transition-colors duration-200">
            <Icon name="ph:anchor-simple-fill" class="mx-auto mb-2 text-2xl text-green-600 dark:text-green-400" />
            <p class="mb-1 font-semibold text-gray-800 dark:text-slate-100">{{ $t("grounding.exercise.benefits.immediateStability.title") }}</p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("grounding.exercise.benefits.immediateStability.description") }}</p>
          </div>
          <div class="border border-blue-100 dark:border-blue-900 bg-white dark:bg-slate-800 p-4 transition-colors duration-200">
            <Icon name="ph:brain-fill" class="mx-auto mb-2 text-2xl text-blue-600 dark:text-blue-400" />
            <p class="mb-1 font-semibold text-gray-800 dark:text-slate-100">{{ $t("grounding.exercise.benefits.mentalClarity.title") }}</p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("grounding.exercise.benefits.mentalClarity.description") }}</p>
          </div>
          <div class="border border-green-100 dark:border-green-900 bg-white dark:bg-slate-800 p-4 transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-2xl text-green-600 dark:text-green-400" />
            <p class="mb-1 font-semibold text-gray-800 dark:text-slate-100">{{ $t("grounding.exercise.benefits.calmPresence.title") }}</p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("grounding.exercise.benefits.calmPresence.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-2 bg-green-600 dark:bg-green-500 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-green-700 dark:hover:bg-green-600 touch-manipulation"
        >
          <Icon name="ph:play-fill" class="text-xl" />
          <span>{{ $t("grounding.exercise.beginExercise") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseStarted && !exerciseCompleted">
      <!-- Progress Header -->
      <SessionHeader
        icon="ph:anchor-simple-fill"
        :title="$t('grounding.exercise.title')"
        :subtitle="currentStepConfig.subtitle"
        :display-value="currentStep"
        :display-label="$t('grounding.exercise.ofSteps')"
        :progress="(currentStep / 5) * 100"
        :status-text="currentStepConfig.instruction"
        status-type="active"
        :secondary-info="`${totalChecked}/${totalItems} ${$t('grounding.exercise.itemsFound')}`"
        theme-color="#059669"
      />

      <!-- Main Exercise Card -->
      <div
        class="border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 md:p-8 transition-colors duration-200"
      >
        <div class="mb-8 text-center">
          <Icon
            :name="currentStepConfig.icon"
            class="mx-auto mb-4 text-5xl"
            :style="`color: var(--step-color)`"
          />
          <p class="mb-2 text-3xl font-bold text-gray-800 dark:text-slate-100">{{ $t(`grounding.exercise.steps.${currentStepConfig.key}.title`) }}</p>
          <p class="text-lg text-gray-600 dark:text-slate-300">{{ $t(`grounding.exercise.steps.${currentStepConfig.key}.subtitle`) }}</p>
        </div>

        <div class="mx-auto mb-8 flex min-h-[360px] max-w-2xl flex-col gap-4" v-auto-animate>
          <div
            v-for="(item, index) in senses[currentStepConfig.key].items"
            :key="index"
            class="group cursor-pointer"
            @click="toggleItem(currentStepConfig.key, index)"
          >
            <div
              class="border transition-all duration-100 cursor-pointer touch-manipulation"
              :class="[
                item.checked 
                  ? 'border-green-200 bg-green-50 dark:border-green-600 dark:bg-green-900/20' 
                  : 'border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-800 hover:border-gray-300 hover:bg-gray-50 dark:hover:border-slate-500 dark:hover:bg-slate-700'
              ]"
            >
              <!-- Mobile Layout (< md) -->
              <div class="md:hidden p-4 relative">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 dark:text-slate-100 leading-snug mb-2">
                      {{ $t(`grounding.exercise.steps.${currentStepConfig.key}.items.${index}.text`) }}
                    </h4>
                    <p class="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                      {{ $t(`grounding.exercise.steps.${currentStepConfig.key}.items.${index}.guidance`) }}
                    </p>
                  </div>
                  <div class="flex-shrink-0 ml-3">
                    <div
                      class="flex h-5 w-5 items-center justify-center border-2 transition-all duration-100"
                      :class="[item.checked ? 'border-green-600 bg-green-600' : 'border-gray-300 dark:border-slate-500']"
                    >
                      <Icon v-if="item.checked" name="ph:check" class="text-sm text-white" />
                    </div>
                  </div>
                </div>
                <Icon :name="senses[currentStepConfig.key].items[index].icon" class="absolute bottom-4 right-4 text-xl text-gray-400 dark:text-slate-500" />
              </div>

              <!-- Desktop Layout (md+) -->
              <div class="hidden md:flex items-start gap-4 p-5">
                <div class="mt-0.5 flex-shrink-0">
                  <div
                    class="flex h-6 w-6 items-center justify-center border-2 transition-all duration-100"
                    :class="[item.checked ? 'border-green-600 bg-green-600' : 'border-gray-300 dark:border-slate-500 group-hover:border-green-600']"
                  >
                    <Icon v-if="item.checked" name="ph:check" class="text-sm text-white" />
                  </div>
                </div>
                <div class="flex-1">
                  <div class="mb-2">
                    <span
                      class="text-base transition-all duration-100"
                      :class="item.checked ? 'font-medium text-gray-800 dark:text-slate-100' : 'text-gray-700 dark:text-slate-300'"
                    >
                      {{ $t(`grounding.exercise.steps.${currentStepConfig.key}.items.${index}.text`) }}
                    </span>
                  </div>
                  <div class="flex items-start gap-2 text-sm italic text-gray-500 dark:text-slate-400">
                    <Icon :name="senses[currentStepConfig.key].items[index].icon" class="mt-0.5 flex-shrink-0 text-sm" />
                    <span>{{ $t(`grounding.exercise.steps.${currentStepConfig.key}.items.${index}.guidance`) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step progress encouragement -->
          <div class="mt-4 h-6 text-center text-sm text-gray-600 dark:text-slate-300">
            <div
              v-if="senses[currentStepConfig.key].checked > 0"
              class="flex items-center justify-center gap-2"
            >
              <Icon name="ph:timer-fill" class="text-base" />
              <span>
                {{ senses[currentStepConfig.key].checked }}/{{
                  senses[currentStepConfig.key].items.length
                }}
                {{ $t("grounding.exercise.found") }}
                {{
                  senses[currentStepConfig.key].checked ===
                  senses[currentStepConfig.key].items.length
                    ? `- ${$t('grounding.exercise.greatAwareness')}`
                    : `- ${$t('grounding.exercise.keepExploring')}`
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- Step Navigation -->
        <div class="mx-auto max-w-2xl border-t border-gray-100 dark:border-slate-700 pt-6">
          <div class="flex items-center justify-between">
            <!-- Left: Back Button (fixed width to prevent layout shift) -->
            <div class="flex flex-1 justify-start">
              <button
                @click="previousStep"
                :disabled="currentStep === 1"
                :class="[
                  'flex items-center gap-2 border px-4 py-3 text-sm font-medium transition-all duration-100 touch-manipulation',
                  currentStep > 1
                    ? 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                    : 'cursor-default border-transparent bg-transparent text-transparent',
                ]"
              >
                <Icon name="ph:arrow-left" class="text-base" />
                <span>{{ $t("grounding.exercise.back") }}</span>
              </button>
            </div>

            <!-- Center: Step Dots -->
            <div class="flex items-center gap-2">
              <div
                v-for="step in 5"
                :key="step"
                class="h-2 w-2 transition-colors duration-100"
                :class="step <= currentStep ? 'bg-gray-800 dark:bg-slate-200' : 'bg-gray-300 dark:bg-slate-600'"
              ></div>
            </div>

            <!-- Right: Next/Complete Button -->
            <div class="flex flex-1 items-center justify-end">
              <button
                @click="currentStep === 5 ? completeExercise() : nextStep()"
                :disabled="currentStep === 5 ? senses.taste.checked < 1 : !canProceedToNext"
                :class="[
                  'flex min-w-[90px] items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-100 touch-manipulation',
                  (currentStep === 5 ? senses.taste.checked === 1 : canProceedToNext)
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'cursor-not-allowed bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500',
                ]"
              >
                <span>{{ currentStep === 5 ? $t("grounding.exercise.complete") : $t("grounding.exercise.next") }}</span>
                <Icon :name="currentStep === 5 ? 'ph:check' : 'ph:arrow-right'" class="text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Completion State -->
    <div v-if="exerciseCompleted" class="text-center">
      <div class="mb-8">
        <Icon name="ph:check-circle-fill" class="mx-auto mb-6 text-6xl text-green-600" />
        <h3 class="mb-4 text-3xl font-semibold text-gray-800 dark:text-slate-100">{{ $t("grounding.exercise.youAreGrounded") }}</h3>
        <p class="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-slate-300">
          {{ $t("grounding.exercise.groundedDescription") }}
        </p>

        <!-- Benefits Achieved -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border border-green-100 dark:border-green-900 bg-white dark:bg-slate-800 p-4 transition-colors duration-200">
            <Icon name="ph:anchor-simple-fill" class="mx-auto mb-2 text-2xl text-green-600 dark:text-green-400" />
            <p class="mb-1 font-semibold text-gray-800 dark:text-slate-100">{{ $t("grounding.exercise.benefits.stability.title") }}</p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("grounding.exercise.benefits.stability.description") }}</p>
          </div>
          <div class="border border-blue-100 dark:border-blue-900 bg-white dark:bg-slate-800 p-4 transition-colors duration-200">
            <Icon name="ph:brain-fill" class="mx-auto mb-2 text-2xl text-blue-600 dark:text-blue-400" />
            <p class="mb-1 font-semibold text-gray-800 dark:text-slate-100">{{ $t("grounding.exercise.benefits.clarity.title") }}</p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("grounding.exercise.benefits.clarity.description") }}</p>
          </div>
          <div class="border border-green-100 dark:border-green-900 bg-white dark:bg-slate-800 p-4 transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-2xl text-green-600 dark:text-green-400" />
            <p class="mb-1 font-semibold text-gray-800 dark:text-slate-100">{{ $t("grounding.exercise.benefits.presence.title") }}</p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("grounding.exercise.benefits.presence.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-2 bg-green-600 dark:bg-green-500 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-green-700 dark:hover:bg-green-600 touch-manipulation"
        >
          <Icon name="ph:arrow-counter-clockwise" class="text-xl" />
          <span>{{ $t("grounding.exercise.practiceAgain") }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { vAutoAnimate } from '@formkit/auto-animate/vue'

const colorMap = {
  green: "#059669",
  blue: "#2563eb",
  purple: "#7c3aed",
  orange: "#ea580c",
  red: "#dc2626",
};

const lightColorMap = {
  green: "#f0fdf4",
  blue: "#eff6ff",
  purple: "#f5f3ff",
  orange: "#fff7ed",
  red: "#fef2f2",
};

const borderColorMap = {
  green: "#d1fae5",
  blue: "#dbeafe",
  purple: "#e9d5ff",
  orange: "#fed7aa",
  red: "#fecaca",
};

const hoverColorMap = {
  green: "rgba(240, 253, 244, 0.3)",
  blue: "rgba(239, 246, 255, 0.3)",
  purple: "rgba(245, 243, 255, 0.3)",
  orange: "rgba(255, 247, 237, 0.3)",
  red: "rgba(254, 242, 242, 0.3)",
};

const darkColorMap = {
  green: "#047857",
  blue: "#1d4ed8",
  purple: "#6d28d9",
  orange: "#c2410c",
  red: "#b91c1c",
};

const colorRgbMap = {
  green: "5, 150, 105",
  blue: "37, 99, 235",
  purple: "124, 58, 237",
  orange: "234, 88, 12",
  red: "220, 38, 38",
};

const exerciseStarted = ref(false);
const exerciseCompleted = ref(false);
const currentStep = ref(1);
const stepConfig = [
  {
    key: "see",
    icon: "ph:eye-fill",
    color: "green",
    itemIcons: ["ph:palette", "ph:sun", "ph:arrows-clockwise", "ph:magnifying-glass", "ph:heart"],
  },
  {
    key: "touch",
    icon: "ph:anchor-simple-fill",
    color: "blue",
    itemIcons: ["ph:thermometer", "ph:t-shirt", "ph:chair", "ph:fingerprint"],
  },
  {
    key: "hear",
    icon: "ph:ear-fill",
    color: "purple",
    itemIcons: ["ph:heartbeat", "ph:house", "ph:waves"],
  },
  {
    key: "smell",
    icon: "ph:flower-fill",
    color: "orange",
    itemIcons: ["ph:wind", "ph:coffee"],
  },
  {
    key: "taste",
    icon: "ph:coffee-fill",
    color: "red",
    itemIcons: ["ph:drop"],
  },
];

const senses = ref(
  stepConfig.reduce((acc, step) => {
    acc[step.key] = {
      items: step.itemIcons.map((icon, index) => ({
        icon,
        checked: false,
      })),
      checked: 0,
    };
    return acc;
  }, {})
);

const totalItems = computed(() => {
  return Object.values(senses.value).reduce((total, sense) => total + sense.items.length, 0);
});

const totalChecked = computed(() => {
  return Object.values(senses.value).reduce((total, sense) => total + sense.checked, 0);
});

const currentStepConfig = computed(() => stepConfig[currentStep.value - 1]);

const canProceedToNext = computed(() => {
  const currentSense = senses.value[currentStepConfig.value.key];
  return currentSense.checked > 0;
});


const toggleItem = (senseKey, index) => {
  senses.value[senseKey].items[index].checked = !senses.value[senseKey].items[index].checked;
  updateProgress();
};

const updateProgress = () => {
  // Update each sense's checked count
  Object.keys(senses.value).forEach((senseKey) => {
    senses.value[senseKey].checked = senses.value[senseKey].items.filter(
      (item) => item.checked
    ).length;
  });
};

const completeExercise = () => {
  exerciseCompleted.value = true;
  exerciseStarted.value = false;
};

const exerciseSection = ref(null);

const startExercise = () => {
  exerciseStarted.value = true;
  exerciseCompleted.value = false;
  currentStep.value = 1;
  resetChecklist();
  
  // Scroll to exercise header
  nextTick(() => {
    exerciseSection.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
};

const nextStep = () => {
  if (currentStep.value < 5) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const resetExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = false;
  currentStep.value = 1;
  resetChecklist();
};

const resetChecklist = () => {
  Object.keys(senses.value).forEach((senseKey) => {
    senses.value[senseKey].items.forEach((item) => {
      item.checked = false;
    });
    senses.value[senseKey].checked = 0;
  });
};
</script>

