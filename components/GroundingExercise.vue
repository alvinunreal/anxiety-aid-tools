<template>
  <section class="sektion" ref="exerciseSection">
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseStarted && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:airplane-landing-duotone" class="mx-auto mb-4 text-6xl text-green-600" />
          <h1 class="mb-4 text-2xl font-semibold text-gray-800">
            {{ $t("techniques.grounding.name") }}
          </h1>
          <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600">
            {{ $t("techniques.grounding.description") }}
          </p>
        </div>

        <!-- Benefits Preview -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border border-green-100 bg-white p-4">
            <Icon name="ph:anchor-simple-fill" class="mx-auto mb-2 text-2xl text-green-600" />
            <p class="mb-1 font-semibold text-gray-800">Immediate Stability</p>
            <p class="text-sm text-gray-600">Connect with your environment and feel grounded</p>
          </div>
          <div class="border border-blue-100 bg-white p-4">
            <Icon name="ph:brain-fill" class="mx-auto mb-2 text-2xl text-blue-600" />
            <p class="mb-1 font-semibold text-gray-800">Mental Clarity</p>
            <p class="text-sm text-gray-600">Interrupt racing thoughts and regain focus</p>
          </div>
          <div class="border border-green-100 bg-white p-4">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-2xl text-green-600" />
            <p class="mb-1 font-semibold text-gray-800">Calm Presence</p>
            <p class="text-sm text-gray-600">Feel more present and in control</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-2 bg-green-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-green-700"
        >
          <Icon name="ph:play-fill" class="text-xl" />
          <span>Begin Exercise</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseStarted && !exerciseCompleted">
      <!-- Progress Header -->
      <div class="mb-6 border border-gray-200 bg-white p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon name="ph:airplane-landing-duotone" class="text-2xl text-green-600" />
            <div>
              <div class="font-semibold text-gray-800">
                Grounding Session - Step {{ currentStep }} of 5
              </div>
              <div class="text-sm text-gray-500">{{ currentStepConfig.subtitle }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-medium text-gray-700">
              {{ totalChecked }}/{{ totalItems }} items found
            </div>
            <div class="text-xs text-gray-500">
              Progress: {{ Math.round((currentStep / 5) * 100) }}% complete
            </div>
          </div>
        </div>
      </div>

      <!-- Main Exercise Card -->
      <div
        class="border border-gray-200 bg-white p-8"
        :style="{
          '--step-color': colorMap[currentStepConfig.color] || '#6b7280',
          '--step-color-light': lightColorMap[currentStepConfig.color] || '#f9fafb',
          '--step-color-border': borderColorMap[currentStepConfig.color] || '#d1d5db',
          '--step-color-hover': hoverColorMap[currentStepConfig.color] || '#f3f4f6',
          '--step-color-dark': darkColorMap[currentStepConfig.color] || '#4b5563',
        }"
      >
        <div class="mb-8 text-center">
          <Icon
            :name="currentStepConfig.icon"
            class="mx-auto mb-4 text-5xl"
            :style="`color: var(--step-color)`"
          />
          <p class="mb-2 text-3xl font-bold text-gray-800">{{ currentStepConfig.title }}</p>
          <p class="text-lg text-gray-600">{{ currentStepConfig.subtitle }}</p>
        </div>

        <div class="mx-auto mb-8 flex min-h-[360px] max-w-2xl flex-col gap-4">
          <div
            v-for="(item, index) in senses[currentStepConfig.key].items"
            :key="index"
            class="group cursor-pointer"
            @click="toggleItem(currentStepConfig.key, index)"
          >
            <div
              class="flex items-start gap-4 border p-5 transition-all duration-100"
              :class="[item.checked ? 'step-item-checked' : 'step-item-unchecked']"
            >
              <div class="mt-0.5 flex-shrink-0">
                <div
                  class="flex h-6 w-6 items-center justify-center border-2 transition-all duration-100"
                  :class="[item.checked ? 'step-checkbox-checked' : 'step-checkbox-unchecked']"
                >
                  <Icon v-if="item.checked" name="ph:check" class="text-sm text-white" />
                </div>
              </div>
              <div class="flex-1">
                <div class="mb-2">
                  <span
                    class="text-base transition-all duration-100"
                    :class="item.checked ? 'font-medium text-gray-800' : 'text-gray-700'"
                  >
                    {{ item.text }}
                  </span>
                </div>

                <!-- Specific guidance when not checked -->
                <div
                  class="flex items-start gap-2 text-sm italic text-gray-500"
                >
                  <Icon :name="item.icon" class="mt-0.5 flex-shrink-0 text-sm" />
                  <span>{{ item.guidance }}</span>
                </div>

              </div>
            </div>
          </div>

          <!-- Step progress encouragement -->
          <div class="mt-4 h-6 text-center text-sm text-gray-600">
            <div
              v-if="senses[currentStepConfig.key].checked > 0"
              class="flex items-center justify-center gap-2"
            >
              <Icon name="ph:timer" class="text-base" />
              <span>
                {{ senses[currentStepConfig.key].checked }}/{{
                  senses[currentStepConfig.key].items.length
                }}
                found
                {{
                  senses[currentStepConfig.key].checked ===
                  senses[currentStepConfig.key].items.length
                    ? "- Great awareness!"
                    : "- Keep exploring..."
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- Step Navigation -->
        <div class="mx-auto max-w-2xl border-t border-gray-100 pt-6">
          <div class="flex items-center justify-between">
            <!-- Left: Back Button (fixed width to prevent layout shift) -->
            <div class="flex flex-1 justify-start">
              <button
                @click="previousStep"
                :disabled="currentStep === 1"
                :class="[
                  'flex items-center gap-2 border px-4 py-2 text-sm font-medium transition-all duration-100',
                  currentStep > 1
                    ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    : 'cursor-default border-transparent bg-transparent text-transparent',
                ]"
              >
                <Icon name="ph:arrow-left" class="text-base" />
                <span>Back</span>
              </button>
            </div>

            <!-- Center: Step Dots -->
            <div class="flex items-center gap-2">
              <div
                v-for="step in 5"
                :key="step"
                class="h-2 w-2 transition-colors duration-100"
                :class="step <= currentStep ? 'bg-gray-800' : 'bg-gray-300'"
              ></div>
            </div>

            <!-- Right: Next/Complete Button -->
            <div class="flex flex-1 items-center justify-end">
              <button
                @click="currentStep === 5 ? completeExercise() : nextStep()"
                :disabled="currentStep === 5 ? senses.taste.checked < 1 : !canProceedToNext"
                :class="[
                  'flex min-w-[90px] items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-100',
                  (currentStep === 5 ? senses.taste.checked === 1 : canProceedToNext)
                    ? 'step-button-enabled text-white'
                    : 'cursor-not-allowed bg-gray-100 text-gray-400',
                ]"
              >
                <span>{{ currentStep === 5 ? "Complete" : "Next" }}</span>
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
        <h3 class="mb-4 text-3xl font-semibold text-gray-800">You Are Grounded</h3>
        <p class="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-gray-600">
          By engaging your five senses, you've successfully anchored yourself in the present moment.
        </p>

        <!-- Benefits Achieved -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border border-green-100 bg-white p-4">
            <Icon name="ph:anchor-simple-fill" class="mx-auto mb-2 text-2xl text-green-600" />
            <p class="mb-1 font-semibold text-gray-800">Stability</p>
            <p class="text-sm text-gray-600">You're connected and grounded</p>
          </div>
          <div class="border border-blue-100 bg-white p-4">
            <Icon name="ph:brain-fill" class="mx-auto mb-2 text-2xl text-blue-600" />
            <p class="mb-1 font-semibold text-gray-800">Clarity</p>
            <p class="text-sm text-gray-600">Racing thoughts have slowed</p>
          </div>
          <div class="border border-green-100 bg-white p-4">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-2xl text-green-600" />
            <p class="mb-1 font-semibold text-gray-800">Presence</p>
            <p class="text-sm text-gray-600">You're here in this moment</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-2 bg-green-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-green-700"
        >
          <Icon name="ph:arrow-counter-clockwise" class="text-xl" />
          <span>Practice Again</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
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

const exerciseStarted = ref(false);
const exerciseCompleted = ref(false);
const currentStep = ref(1);
const stepConfig = [
  {
    key: "see",
    icon: "ph:eye-fill",
    color: "green",
    title: "Look around you",
    subtitle: "Find 5 things you can see",
    nextText: "Continue to Touch",
    items: [
      {
        text: "Something with a interesting color or pattern",
        guidance: "Look for textures, reflections, or color combinations that catch your eye",
        icon: "ph:palette",
      },
      {
        text: "An object with smooth texture",
        guidance:
          "Notice how light hits the surface - is it glossy, matte, or somewhere in between?",
        icon: "ph:sun",
      },
      {
        text: "Something that's moving or has shadows",
        guidance: "Watch how movement creates changing patterns of light and shadow",
        icon: "ph:arrows-clockwise",
      },
      {
        text: "A detail you hadn't noticed before",
        guidance: "Look closer at familiar objects - what small details have you missed?",
        icon: "ph:magnifying-glass",
      },
      {
        text: "Something that brings you comfort",
        guidance:
          "Focus on why this object feels comforting - its colors, shape, or memories it holds",
        icon: "ph:heart",
      },
    ],
  },
  {
    key: "touch",
    icon: "ph:airplane-landing-duotone",
    color: "blue",
    title: "Feel around you",
    subtitle: "Find 4 things you can touch or feel",
    nextText: "Continue to Hear",
    items: [
      {
        text: "The temperature of the air on your skin",
        guidance:
          "Notice if it's warm, cool, or neutral - how does it feel on different parts of your body?",
        icon: "ph:thermometer",
      },
      {
        text: "The texture of your clothes",
        guidance: "Feel the fabric between your fingers - is it soft, rough, smooth, or textured?",
        icon: "ph:t-shirt",
      },
      {
        text: "The surface you're sitting or standing on",
        guidance: "Press into it slightly - is it firm, soft, warm, or cool against your body?",
        icon: "ph:chair",
      },
      {
        text: "Something smooth or rough near you",
        guidance: "Run your fingers along the surface - notice the contrast in textures",
        icon: "ph:fingerprint",
      },
    ],
  },
  {
    key: "hear",
    icon: "ph:ear-fill",
    color: "purple",
    title: "Listen carefully",
    subtitle: "Find 3 things you can hear",
    nextText: "Continue to Smell",
    items: [
      {
        text: "Your own breathing or heartbeat",
        guidance: "Close your eyes and focus inward - can you hear your breath or pulse?",
        icon: "ph:heartbeat",
      },
      {
        text: "Sounds from outside (traffic, nature, people)",
        guidance: "Listen beyond the room - what distant sounds can you identify?",
        icon: "ph:house",
      },
      {
        text: "Subtle sounds you usually ignore",
        guidance: "Notice quiet sounds like humming electronics, air movement, or settling noises",
        icon: "ph:waves",
      },
    ],
  },
  {
    key: "smell",
    icon: "ph:flower-fill",
    color: "orange",
    title: "Take a breath",
    subtitle: "Find 2 things you can smell",
    nextText: "Continue to Taste",
    items: [
      {
        text: "The air in this room",
        guidance: "Take a slow, deep breath - is it fresh, stale, scented, or neutral?",
        icon: "ph:wind",
      },
      {
        text: "Something pleasant or familiar",
        guidance: "Look for subtle scents - coffee, soap, fabric softener, or natural smells",
        icon: "ph:coffee",
      },
    ],
  },
  {
    key: "taste",
    icon: "ph:coffee-fill",
    color: "red",
    title: "Notice the taste",
    subtitle: "Find 1 thing you can taste",
    nextText: "Complete Exercise",
    items: [
      {
        text: "The current taste in your mouth",
        guidance:
          "Run your tongue around your mouth - sweet, salty, minty, or just the taste of saliva?",
        icon: "ph:drop",
      },
    ],
  },
];

const senses = ref(
  stepConfig.reduce((acc, step) => {
    acc[step.key] = {
      items: step.items.map((item) => ({
        text: item.text,
        guidance: item.guidance,
        icon: item.icon,
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

<style scoped>
.step-item-checked {
  border-color: var(--step-color-border);
  background-color: var(--step-color-light);
}

.step-item-unchecked {
  border-color: #e5e7eb;
  background-color: white;
}

.step-item-unchecked:hover {
  border-color: var(--step-color-border);
  background-color: var(--step-color-hover);
}

.step-checkbox-checked {
  border-color: var(--step-color);
  background-color: var(--step-color);
}

.step-checkbox-unchecked {
  border-color: #d1d5db;
}

.group:hover .step-checkbox-unchecked {
  border-color: var(--step-color);
}

.step-button-enabled {
  background-color: var(--step-color);
}

.step-button-enabled:hover {
  background-color: var(--step-color-dark);
}
</style>
