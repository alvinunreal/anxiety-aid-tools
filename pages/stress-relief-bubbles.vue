<template>
  <div class="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-8">
    <Breadcrumb duration="2-5 min" />

    <!-- Exercise Component -->
    <section class="sektion">
      <!-- Pre-Exercise State -->
      <div class="text-center">
        <div class="mb-8">
          <div class="mb-6">
            <Icon name="ph:circles-four-fill" class="mx-auto text-6xl text-teal-600" />
          </div>
          <h1 class="ptitle">{{ $t("techniques.stressReliefBubbles.name") }}</h1>
          <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600">
            {{ $t("techniques.stressReliefBubbles.description") }}
          </p>

          <!-- Bubble Container -->
          <div class="mb-8 flex flex-col items-center justify-center">
            <!-- Bubble Grid -->
            <div class="mb-6 border border-gray-200 bg-white/60 p-8">
              <div class="bubble-container">
                <div class="bubble-grid">
                  <div
                    v-for="bubble in bubbles"
                    :key="bubble.id"
                    class="bubble"
                    :class="{ popped: bubble.isPopped }"
                    @mousedown="popBubble(bubble.id)"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Reset Button -->
            <button
              @click="resetBubbles"
              class="mx-auto flex items-center gap-2 bg-teal-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-teal-700"
            >
              <Icon name="ph:arrow-clockwise" class="text-xl" />
              <span>Reset Bubbles</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="mt-12 space-y-8">
      <!-- How It Works -->
      <div class="border border-gray-200 bg-white/60 p-6">
        <SectionHeader icon="ph:hand-pointing" color="gray">
          {{ $t("stressReliefBubbles.howItWorks.title") }}
        </SectionHeader>
        <p class="text-sm leading-relaxed text-gray-700">{{ $t("stressReliefBubbles.howItWorks.description") }}</p>
      </div>

      <!-- Scientific Background -->
      <div class="border border-gray-200 bg-white/60 p-6">
        <SectionHeader icon="ph:flask" color="purple">
          {{ $t("stressReliefBubbles.science.title") }}
        </SectionHeader>
        
        <div class="mb-4">
          <p class="text-sm leading-relaxed text-gray-700">{{ $t("stressReliefBubbles.science.description") }}</p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:waves" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("stressReliefBubbles.science.research.sensory.title") }}</span>
            </div>
            <p class="text-xs text-gray-600">{{ $t("stressReliefBubbles.science.research.sensory.description") }}</p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:eye" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("stressReliefBubbles.science.research.attention.title") }}</span>
            </div>
            <p class="text-xs text-gray-600">{{ $t("stressReliefBubbles.science.research.attention.description") }}</p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:hand" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("stressReliefBubbles.science.research.motor.title") }}</span>
            </div>
            <p class="text-xs text-gray-600">{{ $t("stressReliefBubbles.science.research.motor.description") }}</p>
          </div>
        </div>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <!-- When to Use -->
        <div class="border border-gray-200 bg-white/60 p-6">
          <SectionHeader icon="ph:calendar-check" color="blue">
            {{ $t("stressReliefBubbles.whenToPractice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="flex items-start">
              <Icon name="ph:lightning-slash" class="mr-2 mt-0.5 flex-shrink-0 text-teal-500" />
              <span>{{ $t("stressReliefBubbles.whenToPractice.items.0") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:sun" class="mr-2 mt-0.5 flex-shrink-0 text-cyan-500" />
              <span>{{ $t("stressReliefBubbles.whenToPractice.items.1") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:phone" class="mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
              <span>{{ $t("stressReliefBubbles.whenToPractice.items.2") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:clock-afternoon" class="mr-2 mt-0.5 flex-shrink-0 text-orange-400" />
              <span>{{ $t("stressReliefBubbles.whenToPractice.items.3") }}</span>
            </li>
          </ul>
        </div>

        <!-- What You'll Experience -->
        <div class="border border-gray-200 bg-white/60 p-6">
          <SectionHeader icon="ph:trend-up" color="green">
            {{ $t("stressReliefBubbles.whatYoullNotice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="flex items-start">
              <Icon name="ph:hand-peace" class="mr-2 mt-0.5 flex-shrink-0 text-teal-400" />
              <span>{{ $t("stressReliefBubbles.whatYoullNotice.items.0") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:battery-charging" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>{{ $t("stressReliefBubbles.whatYoullNotice.items.1") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:target" class="mr-2 mt-0.5 flex-shrink-0 text-purple-400" />
              <span>{{ $t("stressReliefBubbles.whatYoullNotice.items.2") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:clock" class="mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
              <span>{{ $t("stressReliefBubbles.whatYoullNotice.items.3") }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tips Section -->
      <div class="border border-indigo-200 bg-indigo-50 p-6">
        <div class="mb-4 text-center">
          <Icon name="ph:lightbulb" class="mx-auto mb-2 text-2xl text-indigo-600" />
          <h2 class="font-semibold text-gray-800">{{ $t("stressReliefBubbles.tips.title") }}</h2>
        </div>
        <div class="grid gap-4 text-sm md:grid-cols-3">
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("stressReliefBubbles.tips.mindful.title") }}</div>
            <p class="text-gray-600">{{ $t("stressReliefBubbles.tips.mindful.description") }}</p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("stressReliefBubbles.tips.breaks.title") }}</div>
            <p class="text-gray-600">{{ $t("stressReliefBubbles.tips.breaks.description") }}</p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("stressReliefBubbles.tips.environment.title") }}</div>
            <p class="text-gray-600">{{ $t("stressReliefBubbles.tips.environment.description") }}</p>
          </div>
        </div>
      </div>

      <!-- Related Techniques -->
      <RelatedTechniques current-technique-id="stress-relief-bubbles" />
    </section>

    <!-- Audio Elements -->
    <audio ref="popAudio" preload="auto">
      <source
        src="/d/pop.mp3"
        type="audio/mpeg"
      />
    </audio>
  </div>
</template>

<script setup>
const totalBubbles = 64;
const isResetting = ref(false);

// Initialize bubbles
const bubbles = ref([]);
for (let i = 1; i <= totalBubbles; i++) {
  bubbles.value.push({
    id: i,
    isPopped: false,
  });
}

const popAudio = ref(null);

const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.stressReliefBubbles.title"),
  description: () => t("meta.stressReliefBubbles.description"),
  ogTitle: () => t("meta.stressReliefBubbles.title"),
  ogDescription: () => t("meta.stressReliefBubbles.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});

const getBubble = (id) => {
  return bubbles.value.find((b) => b.id === id) || { isPopped: false };
};

const popBubble = (bubbleId) => {
  const bubble = bubbles.value.find((b) => b.id === bubbleId);
  if (bubble && !bubble.isPopped) {
    bubble.isPopped = true;
    playPopSound();
  }
};

const resetBubbles = () => {
  isResetting.value = true;
  bubbles.value.forEach((bubble) => {
    bubble.isPopped = false;
  });

  setTimeout(() => {
    isResetting.value = false;
  }, 400);
};

const playPopSound = () => {
  if (popAudio.value) {
    popAudio.value.currentTime = 0;
    popAudio.value.play().catch(() => {});
  }
};
</script>

<style scoped>
.bubble-container {
  width: min(80vw, 500px);
  height: min(80vw, 500px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.bubble-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 4px;
  width: 100%;
  height: 100%;
  padding: 8px;
}

.bubble {
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  background: linear-gradient(145deg, #6ae7ff, #408bb7);
  border: 2px solid #55b9f3;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.1s ease-out;
  box-shadow: 2px 2px 0px #306989;
}

.bubble:active:not(.popped) {
  transform: scale(2.5);
}

.bubble.popped {
  background: linear-gradient(145deg, rgba(105, 150, 197, 0.49), rgba(101, 220, 255, 0.49));
  box-shadow:
    inset 4px 4px 0px #4da8dd,
    inset -4px -4px 0px rgba(147, 202, 255, 0.49);
  pointer-events: none;
  cursor: default;
}

.animate-flip {
  animation: flip 0.4s ease-in-out;
}

@keyframes flip {
  0% {
    transform: scale(1) rotateY(0);
  }
  50% {
    transform: scale(1.2) rotateY(-90deg);
  }
  100% {
    transform: scale(1) rotateY(-180deg);
  }
}

@media (max-width: 640px) {
  .bubble-container {
    width: min(90vw, 400px);
    height: min(90vw, 400px);
  }

  .bubble-grid {
    gap: 2px;
    padding: 4px;
  }
}
</style>
