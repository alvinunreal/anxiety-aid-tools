<template>
  <section ref="exerciseSection">
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseStarted && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:brain-fill" class="mx-auto text-6xl text-indigo-600" />
        </div>
        <h1 class="ptitle">{{ $t("techniques.thoughtLabeling.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600">
          {{ $t("techniques.thoughtLabeling.description") }}
        </p>

        <!-- Benefits Preview -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border border-indigo-100 bg-white p-4">
            <Icon name="ph:eye-fill" class="mx-auto mb-2 text-2xl text-indigo-600" />
            <p class="mb-1 font-semibold text-gray-800">Awareness</p>
            <p class="text-sm text-gray-600">Notice thoughts without being consumed by them</p>
          </div>
          <div class="border border-purple-100 bg-white p-4">
            <Icon name="ph:scales-fill" class="mx-auto mb-2 text-2xl text-purple-600" />
            <p class="mb-1 font-semibold text-gray-800">Balance</p>
            <p class="text-sm text-gray-600">Create healthy distance from anxious thinking</p>
          </div>
          <div class="border border-blue-100 bg-white p-4">
            <Icon name="ph:lightbulb-fill" class="mx-auto mb-2 text-2xl text-blue-600" />
            <p class="mb-1 font-semibold text-gray-800">Clarity</p>
            <p class="text-sm text-gray-600">Understand patterns in your thinking</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-2 bg-indigo-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-indigo-700"
        >
          <Icon name="ph:play-fill" class="text-xl" />
          <span>Begin Exercise</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseStarted && !exerciseCompleted">
      <!-- Progress Header -->
      <SessionHeader
        icon="ph:brain-fill"
        title="Thought Labeling"
        subtitle="Observe and categorize your thoughts"
        :display-value="labeledThoughts.length"
        display-label="thoughts labeled"
        :progress="Math.min(100, (elapsedTime / 600) * 100)"
        :status-text="currentThought ? 'Labeling active thought' : 'Ready for next thought'"
        :status-type="currentThought ? 'active' : 'waiting'"
        :secondary-info="formatTime(elapsedTime) + ' elapsed'"
        theme-color="#4f46e5"
      />

      <!-- Main Exercise Area -->
      <div class="border border-gray-200 bg-white p-6 md:p-8">
        <!-- Labeled Thoughts Summary -->
        <div v-if="labeledThoughts.length > 0 && !currentThought" class="mb-8">
          <div class="mx-auto max-w-4xl">
            <p class="mb-4 text-2xl font-semibold text-gray-800">Your Labeled Thoughts</p>
            <div class="space-y-4">
              <div
                v-for="(thought, index) in labeledThoughts"
                :key="index"
                class="border border-gray-200 bg-gray-50 p-4"
              >
                <div class="mb-3">
                  <p class="text-gray-800">{{ thought.text }}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="labelId in thought.labels"
                    :key="labelId"
                    class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium"
                    :class="`bg-${getLabelById(labelId).color}-100 text-${getLabelById(labelId).color}-800`"
                  >
                    <Icon :name="getLabelById(labelId).icon" class="text-xs" />
                    {{ getLabelById(labelId).name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Current Thought Input -->
        <div class="mb-8">
          <div class="mb-4 text-center">
            <p class="mb-2 text-2xl font-semibold text-gray-800">
              {{ currentThought ? "Label This Thought" : "What's on Your Mind?" }}
            </p>
            <p class="text-gray-600">
              {{
                currentThought
                  ? "Choose the labels that best describe this thought:"
                  : "Write down an anxious thought you're having right now:"
              }}
            </p>
          </div>

          <!-- Thought Input -->
          <div v-if="!currentThought" class="mx-auto max-w-4xl">
            <div class="mb-4">
              <textarea
                v-model="thoughtInput"
                placeholder="Example: 'I'm worried I'll mess up my presentation tomorrow...'"
                class="w-full border border-gray-300 p-4 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                rows="4"
                maxlength="500"
              ></textarea>
              <div class="mt-1 text-right text-xs text-gray-400">{{ thoughtInput.length }}/500</div>
            </div>
            <button
              @click="setCurrentThought"
              :disabled="!thoughtInput.trim()"
              class="flex w-full items-center justify-center gap-2 bg-indigo-600 px-6 py-3 font-medium text-white transition-colors duration-100 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <span>Label This Thought</span>
              <Icon name="ph:arrow-right" class="text-lg" />
            </button>
          </div>

          <!-- Current Thought Display -->
          <div v-else class="mx-auto max-w-4xl">
            <div class="mb-6 border border-indigo-200 bg-indigo-50 p-6">
              <div class="mb-2 flex items-center gap-2">
                <Icon name="ph:chat-circle-fill" class="text-indigo-600" />
                <span class="text-sm font-medium text-indigo-800">Your Thought:</span>
              </div>
              <p class="leading-relaxed text-gray-800">{{ currentThought }}</p>
            </div>
          </div>
        </div>

        <!-- Label Categories -->
        <div v-if="currentThought" class="mb-8">
          <div class="mx-auto max-w-4xl">
            <!-- Label Grid -->
            <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="label in thoughtLabels"
                :key="label.id"
                @click="toggleLabel(label.id)"
                class="group cursor-pointer border-2 p-4 transition-all duration-100"
                :class="[
                  selectedLabels.includes(label.id)
                    ? `border-${label.color}-500 bg-${label.color}-50`
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
                ]"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="flex h-8 w-8 items-center justify-center transition-colors duration-100"
                    :class="[
                      selectedLabels.includes(label.id)
                        ? `bg-${label.color}-500 text-white`
                        : `bg-gray-100 text-${label.color}-600 group-hover:bg-${label.color}-100`,
                    ]"
                  >
                    <Icon :name="label.icon" class="text-sm" />
                  </div>
                  <div class="flex-1">
                    <p
                      class="mb-1 font-semibold transition-colors duration-100"
                      :class="[
                        selectedLabels.includes(label.id)
                          ? `text-${label.color}-800`
                          : 'text-gray-800',
                      ]"
                    >
                      {{ label.name }}
                    </p>
                    <p
                      class="text-sm transition-colors duration-100"
                      :class="[
                        selectedLabels.includes(label.id)
                          ? `text-${label.color}-700`
                          : 'text-gray-600',
                      ]"
                    >
                      {{ label.description }}
                    </p>
                  </div>
                  <div v-if="selectedLabels.includes(label.id)" class="flex-shrink-0">
                    <Icon name="ph:check-circle-fill" :class="`text-${label.color}-500`" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-8 flex justify-between gap-4">
              <button
                @click="clearCurrentThought"
                class="flex items-center gap-2 bg-gray-600 px-6 py-3 font-medium text-white transition-colors duration-100 hover:bg-gray-700"
              >
                <Icon name="ph:x" class="text-lg" />
                <span>Cancel</span>
              </button>
              <button
                @click="saveThought"
                :disabled="selectedLabels.length === 0"
                class="flex items-center gap-2 bg-green-600 px-6 py-3 font-medium text-white transition-colors duration-100 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <Icon name="ph:check" class="text-lg" />
                <span>Continue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Completion State -->
    <div v-if="exerciseCompleted" class="text-center">
      <div class="mb-8 border border-green-200 bg-green-50 p-8">
        <Icon name="ph:check-circle-fill" class="mx-auto mb-6 text-6xl text-green-600" />
        <h2 class="mb-4 text-3xl font-semibold text-gray-800">Excellent Self-Awareness</h2>
        <p class="mb-6 text-gray-600">
          You've successfully labeled {{ completedThoughts }} thought{{
            completedThoughts !== 1 ? "s" : ""
          }}
          in {{ formatTime(totalSessionTime) }}. This practice helps create healthy distance from
          anxious thinking.
        </p>

        <!-- Session Insights -->
        <div v-if="sessionInsights.length > 0" class="mb-6">
          <p class="mb-4 text-lg font-semibold text-gray-800">Session Insights</p>
          <div class="mx-auto max-w-4xl space-y-3">
            <div
              v-for="insight in sessionInsights"
              :key="insight.type"
              class="border border-blue-200 bg-blue-50 p-4 text-left"
            >
              <div class="flex items-start gap-3">
                <Icon :name="insight.icon" class="mt-1 text-blue-600" />
                <div>
                  <p class="font-semibold text-blue-800">{{ insight.title }}</p>
                  <p class="text-sm text-blue-700">{{ insight.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Benefits Achieved -->
        <div class="mb-6 flex items-center justify-center gap-6 text-sm text-gray-600">
          <div class="flex items-center gap-1">
            <Icon name="ph:eye-fill" class="text-indigo-500" />
            <span>Awareness increased</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="ph:brain-fill" class="text-purple-500" />
            <span>Thoughts organized</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="ph:heart-fill" class="text-red-500" />
            <span>Emotional distance created</span>
          </div>
        </div>

        <button
          @click="resetExercise"
          class="mx-auto flex items-center gap-2 bg-indigo-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-indigo-700"
        >
          <Icon name="ph:arrow-clockwise" class="text-xl" />
          <span>Practice Again</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const exerciseStarted = ref(false);
const exerciseCompleted = ref(false);
const thoughtInput = ref("");
const currentThought = ref("");
const selectedLabels = ref([]);
const labeledThoughts = ref([]);
const elapsedTime = ref(0);
const completedThoughts = ref(0);
const totalSessionTime = ref(0);

let elapsedTimer = null;

// Thought labeling categories
const thoughtLabels = [
  {
    id: "worry",
    name: "Worry",
    description: "Concerns about future events or outcomes",
    icon: "ph:cloud-fill",
    color: "amber",
  },
  {
    id: "catastrophic",
    name: "Catastrophic",
    description: "Imagining worst-case scenarios",
    icon: "ph:warning-fill",
    color: "red",
  },
  {
    id: "self-doubt",
    name: "Self-Doubt",
    description: "Questioning your abilities or worth",
    icon: "ph:question-fill",
    color: "orange",
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Setting unrealistically high standards",
    icon: "ph:star-fill",
    color: "yellow",
  },
  {
    id: "comparison",
    name: "Comparison",
    description: "Measuring yourself against others",
    icon: "ph:scales-fill",
    color: "purple",
  },
  {
    id: "rumination",
    name: "Rumination",
    description: "Repeatedly thinking about past events",
    icon: "ph:arrow-clockwise-fill",
    color: "blue",
  },
  {
    id: "control",
    name: "Control",
    description: "Wanting to control uncontrollable situations",
    icon: "ph:steering-wheel-fill",
    color: "indigo",
  },
  {
    id: "rejection",
    name: "Rejection",
    description: "Fear of being rejected or abandoned",
    icon: "ph:heart-break-fill",
    color: "pink",
  },
  {
    id: "performance",
    name: "Performance",
    description: "Anxiety about how you'll perform",
    icon: "ph:trophy-fill",
    color: "green",
  },
  {
    id: "health",
    name: "Health",
    description: "Concerns about physical or mental health",
    icon: "ph:heart-fill",
    color: "red",
  },
  {
    id: "social",
    name: "Social",
    description: "Worries about social situations or relationships",
    icon: "ph:users-fill",
    color: "teal",
  },
  {
    id: "financial",
    name: "Financial",
    description: "Money-related stress and concerns",
    icon: "ph:currency-dollar-fill",
    color: "emerald",
  },
];

const sessionInsights = computed(() => {
  if (labeledThoughts.value.length === 0) return [];

  const insights = [];
  const labelCounts = {};

  // Count label frequency
  labeledThoughts.value.forEach((thought) => {
    thought.labels.forEach((labelId) => {
      labelCounts[labelId] = (labelCounts[labelId] || 0) + 1;
    });
  });

  // Find most common label
  const mostCommonLabel = Object.entries(labelCounts).sort(([, a], [, b]) => b - a)[0];

  if (mostCommonLabel) {
    const label = getLabelById(mostCommonLabel[0]);
    insights.push({
      type: "pattern",
      icon: "ph:chart-bar-fill",
      title: "Common Pattern Identified",
      description: `Most of your thoughts were labeled as "${label.name}" - recognizing this pattern is the first step to managing it.`,
    });
  }

  // Insight based on number of thoughts
  if (labeledThoughts.value.length >= 3) {
    insights.push({
      type: "awareness",
      icon: "ph:lightbulb-fill",
      title: "Strong Self-Awareness",
      description:
        "You've shown excellent ability to observe and categorize your thoughts objectively.",
    });
  }

  return insights;
});

const formatTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const getLabelById = (id) => {
  return thoughtLabels.find((label) => label.id === id);
};

const exerciseSection = ref(null);

const startExercise = () => {
  exerciseStarted.value = true;
  exerciseCompleted.value = false;
  elapsedTime.value = 0;
  labeledThoughts.value = [];

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
};

const setCurrentThought = () => {
  if (thoughtInput.value.trim()) {
    currentThought.value = thoughtInput.value.trim();
    thoughtInput.value = "";
    selectedLabels.value = [];
  }
};

const clearCurrentThought = () => {
  currentThought.value = "";
  selectedLabels.value = [];
};

const toggleLabel = (labelId) => {
  const index = selectedLabels.value.indexOf(labelId);
  if (index > -1) {
    selectedLabels.value.splice(index, 1);
  } else {
    selectedLabels.value.push(labelId);
  }
};

const saveThought = () => {
  if (currentThought.value && selectedLabels.value.length > 0) {
    labeledThoughts.value.push({
      text: currentThought.value,
      labels: [...selectedLabels.value],
      timestamp: Date.now(),
    });

    clearCurrentThought();
  }
};

const stopExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = false;
  currentThought.value = "";
  selectedLabels.value = [];
  labeledThoughts.value = [];
  elapsedTime.value = 0;

  if (elapsedTimer) {
    clearInterval(elapsedTimer);
    elapsedTimer = null;
  }
};

const resetExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = false;
  thoughtInput.value = "";
  currentThought.value = "";
  selectedLabels.value = [];
  labeledThoughts.value = [];
  elapsedTime.value = 0;
  completedThoughts.value = 0;
  totalSessionTime.value = 0;
};

// Cleanup on unmount
onUnmounted(() => {
  if (elapsedTimer) {
    clearInterval(elapsedTimer);
  }
});
</script>
