<template>
  <section class="sektion" ref="exerciseSection">
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseStarted && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:person-arms-spread-fill" class="mx-auto text-6xl text-indigo-600" />
        </div>
        <h1 class="ptitle">{{ $t("techniques.progressiveMuscleRelaxation.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600">
          {{ $t("techniques.progressiveMuscleRelaxation.description") }}
        </p>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-2 bg-blue-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-blue-700"
        >
          <Icon name="ph:play-fill" class="text-xl" />
          <span>Begin Exercise</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseStarted && !exerciseCompleted">
      <!-- Session Header -->
      <div class="mb-6 border border-gray-200 bg-white p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon name="ph:user-focus" class="text-2xl text-indigo-600" />
            <div>
              <div class="font-semibold text-gray-800">Progressive Muscle Relaxation</div>
              <div class="text-sm text-gray-500">
                Muscle group {{ currentGroupIndex + 1 }}/{{ muscleGroups.length }}
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-medium text-gray-700">{{ currentMuscleGroup.short_name }}</div>
            <div class="text-xs text-gray-500">
              {{
                currentState === "tense"
                  ? "5s tension"
                  : currentState === "relax"
                    ? "15s release"
                    : "prepare"
              }}
            </div>
          </div>
        </div>
      </div>

      <!-- Main Exercise Area -->
      <div class="border border-gray-200 bg-white/60 p-8">
        <div class="flex flex-col items-center">
          <!-- Large Visual State -->
          <div
            class="mx-auto mb-6 flex h-32 w-32 items-center justify-center transition-all duration-300"
            :class="[
              currentState === 'prepare'
                ? 'bg-gray-100 text-gray-600'
                : currentState === 'tense'
                  ? 'bg-red-100 text-red-600'
                  : currentState === 'relax'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-blue-100 text-blue-600',
            ]"
          >
            <Icon
              :name="
                currentState === 'prepare'
                  ? currentMuscleGroup.icon
                  : currentState === 'tense'
                    ? 'ph:lightning'
                    : 'ph:hand-peace'
              "
              class="text-6xl"
            />
          </div>

          <!-- Clear Action Text -->
          <div class="mb-6 text-center">
            <p v-if="currentState === 'prepare'" class="mb-3 text-2xl font-light text-gray-700">
              {{ currentMuscleGroup.name }}
            </p>
            <p v-else-if="currentState === 'tense'" class="mb-3 text-2xl font-light text-gray-700">
              Tense
            </p>
            <p v-else-if="currentState === 'relax'" class="mb-3 text-2xl font-light text-gray-700">
              Relax
            </p>

            <p v-if="currentState === 'prepare'" class="text-lg text-gray-600">
              {{ currentMuscleGroup.instruction_title }}
            </p>
          </div>

          <!-- Timer (Only During Active Phases) -->
          <div v-if="currentState !== 'prepare'" class="mb-6">
            <div class="relative mx-auto h-20 w-20">
              <svg class="h-20 w-20 -rotate-90 transform" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" stroke="#e5e7eb" stroke-width="3" fill="none" />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  :stroke="currentState === 'tense' ? '#dc2626' : '#16a34a'"
                  stroke-width="3"
                  fill="none"
                  stroke-dasharray="87.96"
                  :stroke-dashoffset="87.96 - 87.96 * (timerProgress / 100)"
                  class="transition-all duration-100"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl font-light text-gray-700">{{
                  Math.ceil(timeRemaining / 1000)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Step-by-step Action Cue -->
          <div class="mb-6 w-full max-w-sm">
            <div v-if="currentState === 'tense'" class="bg-red-50 p-4">
              <p class="mb-3 font-semibold text-red-800">Tension Steps:</p>
              <ol class="space-y-2 text-red-700">
                <li
                  v-for="(step, index) in currentMuscleGroup.tension_cue"
                  :key="index"
                  class="flex items-start gap-2"
                >
                  <span
                    class="flex h-5 w-5 flex-shrink-0 items-center justify-center bg-red-200 text-xs font-bold text-red-800"
                    >{{ index + 1 }}</span
                  >
                  <span>{{ step }}</span>
                </li>
              </ol>
            </div>

            <div v-if="currentState === 'relax'" class="bg-green-50 p-4">
              <p class="mb-3 font-semibold text-green-800">Relaxation Steps:</p>
              <ol class="space-y-2 text-green-700">
                <li
                  v-for="(step, index) in currentMuscleGroup.relaxation_cue"
                  :key="index"
                  class="flex items-start gap-2"
                >
                  <span
                    class="flex h-5 w-5 flex-shrink-0 items-center justify-center bg-green-200 text-xs font-bold text-green-800"
                    >{{ index + 1 }}</span
                  >
                  <span>{{ step }}</span>
                </li>
              </ol>
            </div>
          </div>

          <!-- Progress Section -->
          <div class="mb-6 w-full max-w-sm">
            <!-- Session Progress -->
            <div class="mb-4">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Session Progress</span>
                <span class="text-sm text-gray-500"
                  >{{ currentGroupIndex + 1 }}/{{ muscleGroups.length }}</span
                >
              </div>
              <!-- Stepped progress indicator -->
              <div class="flex gap-1">
                <div
                  v-for="(group, index) in muscleGroups"
                  :key="index"
                  class="h-1.5 flex-1 transition-all duration-100"
                  :style="{
                    backgroundColor: index <= currentGroupIndex ? '#3b82f6' : '#e5e7eb',
                  }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex gap-3">
            <button
              v-if="currentState === 'prepare'"
              @click="startCurrentGroup"
              class="flex items-center gap-2 bg-green-600 px-6 py-3 font-medium text-white transition-colors duration-100 hover:bg-green-700"
            >
              <Icon name="ph:play-fill" class="text-lg" />
              <span>Start</span>
            </button>

            <button
              v-if="currentState !== 'prepare'"
              @click="skipCurrentPhase"
              class="flex items-center gap-2 bg-yellow-600 px-6 py-3 font-medium text-white transition-colors duration-100 hover:bg-yellow-700"
            >
              <Icon name="ph:skip-forward-fill" class="text-lg" />
              <span>Skip</span>
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
      <h2 class="mb-2 text-xl font-semibold text-gray-800">Deep Relaxation Achieved</h2>
      <p class="mb-4 text-gray-600">
        You've systematically released tension throughout your entire body. Notice how different
        your muscles feel compared to when you started.
      </p>
      <div class="flex items-center justify-center gap-4 text-sm text-gray-500">
        <div class="flex items-center gap-1">
          <Icon name="ph:lightning-slash" class="text-blue-400" />
          <span>Tension released</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="ph:heart" class="text-red-400" />
          <span>Body relaxed</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const exerciseStarted = ref(false);
const exerciseCompleted = ref(false);
const currentGroupIndex = ref(0);
const currentState = ref("prepare"); // 'prepare', 'tense', 'relax'
const timeRemaining = ref(0);
const timerProgress = ref(0);
let phaseTimer = null;
let progressTimer = null;

const muscleGroups = [
  {
    name: "Right Hand & Forearm",
    short_name: "R Hand",
    icon: "material-symbols:front-hand",
    instruction_title: "Make a tight fist",
    simple_action: "Clench your right hand into a fist",
    instruction:
      "Hold your right hand out in front of you, then make a tight fist by curling your fingers into your palm. Squeeze tight to feel tension in your hand and forearm.",
    tension_cue: [
      "Make a tight fist",
      "Squeeze hard",
      "Feel the tension in your fingers and forearm",
    ],
    relaxation_cue: [
      "Open your hand",
      "Let it go completely limp",
      "Feel fingers naturally curved and relaxed",
    ],
  },
  {
    name: "Left Hand & Forearm",
    short_name: "L Hand",
    icon: "material-symbols:front-hand",
    instruction_title: "Make a tight fist",
    simple_action: "Clench your left hand into a fist",
    instruction:
      "Hold your left hand out in front of you, then make a tight fist by curling your fingers into your palm. Squeeze tight to feel tension in your hand and forearm.",
    tension_cue: [
      "Make a tight fist",
      "Squeeze hard",
      "Feel the tension in your fingers and forearm",
    ],
    relaxation_cue: [
      "Open your hand",
      "Let it go completely limp",
      "Notice the warm, heavy feeling",
    ],
  },
  {
    name: "Right Upper Arm",
    short_name: "R Bicep",
    icon: "material-symbols:fitness-center",
    instruction_title: "Flex your bicep muscle",
    simple_action: "Bend your elbow and flex like showing off strength",
    instruction:
      "Bend your right elbow at 90 degrees, then flex your bicep muscle hard. Press your forearm against your upper arm to create maximum tension.",
    tension_cue: [
      "Bend elbow",
      "Flex bicep hard",
      "Press forearm against upper arm",
      "Feel the muscle bulge",
    ],
    relaxation_cue: [
      "Lower your arm to your side",
      "Let the muscle go soft",
      "Feel the relief and heaviness",
    ],
  },
  {
    name: "Left Upper Arm",
    short_name: "L Bicep",
    icon: "material-symbols:fitness-center",
    instruction_title: "Flex your bicep muscle",
    simple_action: "Bend your elbow and flex like showing off strength",
    instruction:
      "Bend your left elbow at 90 degrees, then flex your bicep muscle hard. Press your forearm against your upper arm to create maximum tension.",
    tension_cue: [
      "Bend elbow",
      "Flex bicep hard",
      "Press forearm against upper arm",
      "Feel the strength",
    ],
    relaxation_cue: ["Lower your arm to your side", "Let tension drain away", "Feel the heaviness"],
  },
  {
    name: "Forehead & Scalp",
    short_name: "Forehead",
    icon: "material-symbols:face",
    instruction_title: "Raise your eyebrows high",
    simple_action: "Lift eyebrows up as high as possible",
    instruction:
      "Look straight ahead, then raise your eyebrows as high as they'll go, creating wrinkles across your forehead. Hold this surprised expression.",
    tension_cue: ["Raise eyebrows high", "Wrinkle forehead", "Feel the tension across your scalp"],
    relaxation_cue: [
      "Let eyebrows drop naturally",
      "Smooth out forehead",
      "Feel skin completely relax",
    ],
  },
  {
    name: "Eyes & Nose",
    short_name: "Face",
    icon: "material-symbols:visibility-off",
    instruction_title: "Squint and scrunch nose",
    simple_action: "Squeeze eyes shut and wrinkle nose up",
    instruction:
      "Close your eyes tightly and scrunch your nose upward like you smell something bad. Squeeze the middle of your face together.",
    tension_cue: ["Squeeze eyes tight", "Scrunch nose up", "Make your whole face scrunch together"],
    relaxation_cue: [
      "Let face go soft",
      "Eyes gently closed",
      "Nose and cheeks smooth and relaxed",
    ],
  },
  {
    name: "Mouth & Jaw",
    short_name: "Jaw",
    icon: "material-symbols:dental-general",
    instruction_title: "Clench your teeth and lips",
    simple_action: "Bite down hard and press lips together",
    instruction:
      "Bite down by clenching your teeth together firmly, then press your lips tightly together. Feel the tension in your jaw muscles.",
    tension_cue: [
      "Bite down hard",
      "Clench teeth",
      "Press lips together",
      "Feel jaw muscles working",
    ],
    relaxation_cue: ["Let jaw drop slightly open", "Lips barely touching", "Tongue resting softly"],
  },
  {
    name: "Neck & Throat",
    short_name: "Neck",
    icon: "material-symbols:accessibility-new",
    instruction_title: "Push chin down and head back",
    simple_action: "Create tension by pushing chin down while head goes back",
    instruction:
      "Pull your chin down toward your chest while simultaneously pushing the back of your head backward, creating a double tension.",
    tension_cue: ["Chin down to chest", "Push head back", "Create tension from both directions"],
    relaxation_cue: ["Let head find natural position", "Neck long and loose", "Throat open"],
  },
  {
    name: "Shoulders",
    short_name: "Shoulders",
    icon: "material-symbols:keyboard-arrow-up",
    instruction_title: "Shrug shoulders to ears",
    simple_action: "Lift shoulders up as high as possible",
    instruction:
      "Lift both shoulders straight up toward your ears as high as they'll go. Try to make them touch your earlobes.",
    tension_cue: [
      "Pull shoulders up high",
      "Try to touch your ears",
      "Feel the squeeze in upper back",
    ],
    relaxation_cue: ["Let shoulders drop naturally", "Feel them sink lower", "Heavy and loose"],
  },
  {
    name: "Upper Back & Chest",
    short_name: "Upper Back",
    icon: "material-symbols:open-in-full",
    instruction_title: "Squeeze shoulder blades together",
    simple_action: "Push shoulder blades together and arch back slightly",
    instruction:
      "Push your shoulder blades together behind you and arch your back slightly. Take a deep breath to expand your chest.",
    tension_cue: ["Squeeze shoulder blades together", "Arch back", "Expand chest with deep breath"],
    relaxation_cue: ["Let back settle naturally", "Shoulder blades apart", "Chest soft and open"],
  },
  {
    name: "Abdomen",
    short_name: "Stomach",
    icon: "material-symbols:sports-gymnastics",
    instruction_title: "Tighten stomach muscles",
    simple_action: "Make your abs hard like preparing for a punch",
    instruction:
      "Tighten your abdominal muscles as if someone is about to gently punch your stomach. Pull your belly button toward your spine.",
    tension_cue: ["Tighten abs hard", "Pull belly button in", "Make stomach like a rock"],
    relaxation_cue: [
      "Let stomach go soft",
      "Breathe into belly",
      "Feel it rise and fall naturally",
    ],
  },
  {
    name: "Lower Back",
    short_name: "L Back",
    icon: "material-symbols:straighten",
    instruction_title: "Arch your lower back",
    simple_action: "Push stomach forward and arch back",
    instruction:
      "Gently arch your lower back by pushing your stomach forward and pulling your lower back inward, creating a curve.",
    tension_cue: ["Arch lower back gently", "Push stomach out", "Feel the curve in spine"],
    relaxation_cue: [
      "Let back settle to natural curve",
      "Supported and comfortable",
      "Tension melting",
    ],
  },
  {
    name: "Hips & Buttocks",
    short_name: "Glutes",
    icon: "material-symbols:chair-alt",
    instruction_title: "Squeeze buttocks together",
    simple_action: "Clench your buttock muscles tightly",
    instruction:
      "Tighten your buttock muscles and squeeze them together as tightly as possible. Feel tension throughout your hip area.",
    tension_cue: ["Squeeze buttocks together hard", "Clench muscles tight", "Feel tension in hips"],
    relaxation_cue: ["Let buttocks go soft", "Feel them spread naturally", "Heavy and relaxed"],
  },
  {
    name: "Right Thigh",
    short_name: "R Thigh",
    icon: "material-symbols:accessibility",
    instruction_title: "Straighten leg and flex thigh",
    simple_action: "Straighten leg and tighten thigh muscle",
    instruction:
      "Straighten your right leg out in front of you and tighten the large muscle on the front of your thigh (quadriceps).",
    tension_cue: ["Straighten right leg", "Flex thigh muscle hard", "Feel it firm and strong"],
    relaxation_cue: [
      "Let leg rest naturally",
      "Thigh muscle soft and loose",
      "Heavy and comfortable",
    ],
  },
  {
    name: "Left Thigh",
    short_name: "L Thigh",
    icon: "material-symbols:accessibility",
    instruction_title: "Straighten leg and flex thigh",
    simple_action: "Straighten leg and tighten thigh muscle",
    instruction:
      "Straighten your left leg out in front of you and tighten the large muscle on the front of your thigh (quadriceps).",
    tension_cue: ["Straighten left leg", "Flex thigh muscle hard", "Feel the strength"],
    relaxation_cue: ["Let leg rest naturally", "Thigh completely relaxed", "Notice the contrast"],
  },
  {
    name: "Right Calf & Shin",
    short_name: "R Calf",
    icon: "material-symbols:directions-walk",
    instruction_title: "Point foot down, then flex up",
    simple_action: "Point foot down hard, then pull toes toward shin",
    instruction:
      "First point your right foot downward to tense your calf, then flex it upward toward your shin to work the front muscles.",
    tension_cue: ["Point foot down hard", "Then flex up toward shin", "Feel both sides working"],
    relaxation_cue: ["Let foot rest naturally", "Calf and shin loose", "Completely soft"],
  },
  {
    name: "Left Calf & Shin",
    short_name: "L Calf",
    icon: "material-symbols:directions-walk",
    instruction_title: "Point foot down, then flex up",
    simple_action: "Point foot down hard, then pull toes toward shin",
    instruction:
      "First point your left foot downward to tense your calf, then flex it upward toward your shin to work the front muscles.",
    tension_cue: ["Point foot down hard", "Then flex up toward shin", "Feel muscles engage"],
    relaxation_cue: ["Let foot rest naturally", "All lower leg muscles relaxed and heavy"],
  },
  {
    name: "Right Foot",
    short_name: "R Foot",
    icon: "material-symbols:footprint",
    instruction_title: "Curl toes tightly",
    simple_action: "Scrunch toes downward into foot",
    instruction:
      "Curl your right toes downward tightly while tensing the arch of your foot. Scrunch like you're trying to pick up a towel with your toes.",
    tension_cue: ["Curl toes down tight", "Scrunch them up", "Feel tension in foot arch"],
    relaxation_cue: ["Let toes uncurl naturally", "Foot completely soft", "Warm and relaxed"],
  },
  {
    name: "Left Foot",
    short_name: "L Foot",
    icon: "material-symbols:footprint",
    instruction_title: "Curl toes tightly",
    simple_action: "Scrunch toes downward into foot",
    instruction:
      "Curl your left toes downward tightly while tensing the arch of your foot. Scrunch like you're trying to pick up a towel with your toes.",
    tension_cue: ["Curl toes down tight", "Scrunch them up", "Feel arch working"],
    relaxation_cue: ["Let toes spread naturally", "Foot loose and relaxed", "Tension gone"],
  },
];

const currentMuscleGroup = computed(() => muscleGroups[currentGroupIndex.value]);

const exerciseSection = ref(null);

const startExercise = () => {
  exerciseStarted.value = true;
  exerciseCompleted.value = false;
  currentGroupIndex.value = 0;
  currentState.value = "prepare";
  timeRemaining.value = 0;
  timerProgress.value = 0;
  
  // Scroll to exercise header
  nextTick(() => {
    exerciseSection.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
};

const startCurrentGroup = () => {
  currentState.value = "tense";
  startPhase(5000); // 5 seconds tension
};

const startPhase = (duration) => {
  timeRemaining.value = duration;
  timerProgress.value = 0;

  // Clear existing timers
  if (phaseTimer) clearTimeout(phaseTimer);
  if (progressTimer) clearInterval(progressTimer);

  // Progress updater
  const startTime = Date.now();
  progressTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, duration - elapsed);
    const progress = Math.min(100, (elapsed / duration) * 100);

    timeRemaining.value = remaining;
    timerProgress.value = progress;

    if (remaining <= 0) {
      clearInterval(progressTimer);
    }
  }, 50);

  // Phase completion
  phaseTimer = setTimeout(() => {
    if (currentState.value === "tense") {
      // Move to relaxation phase
      currentState.value = "relax";
      startPhase(15000); // 15 seconds relaxation
    } else if (currentState.value === "relax") {
      // Move to next muscle group or complete
      if (currentGroupIndex.value < muscleGroups.length - 1) {
        currentGroupIndex.value++;
        currentState.value = "prepare";
        timeRemaining.value = 0;
        timerProgress.value = 0;
      } else {
        completeExercise();
      }
    }
  }, duration);
};

const skipCurrentPhase = () => {
  if (phaseTimer) clearTimeout(phaseTimer);
  if (progressTimer) clearInterval(progressTimer);

  if (currentState.value === "tense") {
    currentState.value = "relax";
    startPhase(15000);
  } else if (currentState.value === "relax") {
    if (currentGroupIndex.value < muscleGroups.length - 1) {
      currentGroupIndex.value++;
      currentState.value = "prepare";
      timeRemaining.value = 0;
      timerProgress.value = 0;
    } else {
      completeExercise();
    }
  }
};

const stopExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = false;
  currentGroupIndex.value = 0;
  currentState.value = "prepare";
  timeRemaining.value = 0;
  timerProgress.value = 0;

  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
};

const completeExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = true;

  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
};

// Cleanup on unmount
onUnmounted(() => {
  if (phaseTimer) clearTimeout(phaseTimer);
  if (progressTimer) clearInterval(progressTimer);
});
</script>
