<template>
  <div class="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <Breadcrumb duration="2-5 min" />

    <main id="main-content" tabindex="-1">

    <section class="sektion">
      <div class="text-center">
        <div class="mb-8">
          <div class="mb-6">
            <Icon name="ph:circles-four-fill" class="mx-auto text-6xl text-teal-600" />
          </div>
          <h1 class="ptitle">{{ $t("techniques.stressReliefBubbles.name") }}</h1>
          <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300">
            {{ $t("techniques.stressReliefBubbles.description") }}
          </p>

          <div class="mb-8 flex flex-col items-center justify-center">
            <div class="mb-6 border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 md:p-8 transition-colors duration-200">
              <div class="bubble-container">
                <div class="bubble-grid">
                  <div
                    v-for="bubble in bubbles"
                    :key="bubble.id"
                    class="bubble"
                    :class="{ popped: bubble.isPopped }"
                    @click="popBubble(bubble.id)"
                    @touchstart.prevent="popBubble(bubble.id)"
                  ></div>
                </div>
              </div>
            </div>

            <button
              @click="resetBubbles"
              class="mx-auto flex items-center gap-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 px-8 py-4 text-lg font-medium text-white shadow-md transition-colors duration-200 active:shadow-sm"
            >
              <Icon name="ph:arrow-clockwise" class="text-xl" />
              <span>{{ $t("stressReliefBubbles.resetButton") }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-12 space-y-8">
      <div class="rounded-md border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 shadow-sm transition-colors duration-200">
        <SectionHeader icon="ph:hand-pointing" color="gray">
          {{ $t("stressReliefBubbles.howItWorks.title") }}
        </SectionHeader>
        <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300">{{ $t("stressReliefBubbles.howItWorks.description") }}</p>
      </div>

      <div class="rounded-md border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 shadow-sm transition-colors duration-200">
        <SectionHeader icon="ph:flask" color="purple">
          {{ $t("stressReliefBubbles.science.title") }}
        </SectionHeader>

        <div class="mb-4">
          <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300">{{ $t("stressReliefBubbles.science.description") }}</p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-md border border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-4 transition-colors duration-200">
            <div class="mb-2 flex items-center">
              <Icon name="ph:waves" class="mr-2 text-purple-600 dark:text-purple-400" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("stressReliefBubbles.science.research.sensory.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300">{{ $t("stressReliefBubbles.science.research.sensory.description") }}</p>
          </div>

          <div class="rounded-md border border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-4 transition-colors duration-200">
            <div class="mb-2 flex items-center">
              <Icon name="ph:eye" class="mr-2 text-purple-600 dark:text-purple-400" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("stressReliefBubbles.science.research.attention.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300">{{ $t("stressReliefBubbles.science.research.attention.description") }}</p>
          </div>

          <div class="rounded-md border border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-4 transition-colors duration-200">
            <div class="mb-2 flex items-center">
              <Icon name="ph:hand" class="mr-2 text-purple-600 dark:text-purple-400" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("stressReliefBubbles.science.research.motor.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300">{{ $t("stressReliefBubbles.science.research.motor.description") }}</p>
          </div>
        </div>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <div class="rounded-md border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 shadow-sm transition-colors duration-200">
          <SectionHeader icon="ph:calendar-check" color="blue">
            {{ $t("stressReliefBubbles.whenToPractice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
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

        <div class="rounded-md border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 shadow-sm transition-colors duration-200">
          <SectionHeader icon="ph:trend-up" color="green">
            {{ $t("stressReliefBubbles.whatYoullNotice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
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

      <div class="rounded-md border border-indigo-200 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 p-6 shadow-sm transition-colors duration-200">
        <div class="mb-4 text-center">
          <Icon name="ph:lightbulb" class="mx-auto mb-2 text-2xl text-indigo-600 dark:text-indigo-400" />
          <h2 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("stressReliefBubbles.tips.title") }}</h2>
        </div>
        <div class="grid gap-4 text-sm md:grid-cols-3">
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("stressReliefBubbles.tips.mindful.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">{{ $t("stressReliefBubbles.tips.mindful.description") }}</p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("stressReliefBubbles.tips.breaks.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">{{ $t("stressReliefBubbles.tips.breaks.description") }}</p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("stressReliefBubbles.tips.environment.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">{{ $t("stressReliefBubbles.tips.environment.description") }}</p>
          </div>
        </div>
      </div>

      <RelatedTechniques current-technique-id="stress-relief-bubbles" />
    </section>

    <audio ref="popAudio" preload="auto">
      <source
        src="/audios/stress-relief-bubbles/pop.mp3"
        type="audio/mpeg"
      />
    </audio>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // <-- 1. IMPORT onMounted

const totalBubbles = 64;
const isResetting = ref(false);

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

// 2. ADD onMounted HOOK TO WARM UP AUDIO
onMounted(() => {
  const warmUpAudio = () => {
    // Play a tiny, silent sound to wake the audio hardware on iOS
    const silentAudio = new Audio(
      "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"
    );
    silentAudio.play().catch(() => {});

    // Explicitly load your main audio file so it's ready to play instantly
    if (popAudio.value) {
      popAudio.value.load();
    }
  };

  // Run the warm-up function only ONCE on the first user touch
  window.addEventListener('touchstart', warmUpAudio, { once: true });
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
    popAudio.value.play().catch((e) => {
      // Catching potential errors is good practice, especially with audio
      console.warn("Audio play failed. User interaction might be required.", e);
    });
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
  transition:
    transform 0.1s ease-out,
    background 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 2px 2px 0px #306989;
  -webkit-tap-highlight-color: transparent; /* Disable the gray tap highlight on iOS */
}

.bubble:active:not(.popped) {
  transform: scale(1.15); /* Slightly reduced scale for a snappier feel */
}

.bubble.popped {
  background: linear-gradient(145deg, rgba(105, 150, 197, 0.3), rgba(101, 220, 255, 0.3));
  box-shadow:
    inset 2px 2px 4px rgba(0, 0, 0, 0.2),
    inset -2px -2px 4px rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(85, 185, 243, 0.3);
  pointer-events: none;
  cursor: default;
}

.dark .bubble.popped {
  background: linear-gradient(145deg, rgba(59, 130, 246, 0.2), rgba(14, 165, 233, 0.2));
  box-shadow:
    inset 2px 2px 4px rgba(0, 0, 0, 0.4),
    inset -2px -2px 4px rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(59, 130, 246, 0.3);
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