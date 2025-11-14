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

    <InfoHowItWorks
      i18n-key="stressReliefBubbles.howItWorks"
      icon="ph:hand-tap"
      color="gray"
      :paragraphs="['description1', 'description2', 'description3']"
      :items="[
        { key: 'focusRedirection', icon: 'ph:arrows-clockwise' },
        { key: 'sensoryFeedback', icon: 'ph:speaker-high' },
        { key: 'nervousSystemCalm', icon: 'ph:heartbeat' }
      ]"
      :columns="3"
    />

    <InfoScienceBehind
      i18n-key="stressReliefBubbles.science"
      :research-items="[
        { key: 'pediatricAnxiety', icon: 'ph:trend-down' },
        { key: 'medicalProcedures', icon: 'ph:hospital' },
        { key: 'attentionSupport', icon: 'ph:brain' }
      ]"
    />

    <InfoWhenAndWhat
      i18n-key="stressReliefBubbles"
      :when-section="{
        icon: 'ph:calendar-check',
        color: 'blue',
        items: [
          { icon: 'ph:lightning', iconClass: 'text-yellow-500' },
          { icon: 'ph:clock', iconClass: 'text-blue-500' },
          { icon: 'ph:spiral', iconClass: 'text-purple-500' },
          { icon: 'ph:arrow-clockwise', iconClass: 'text-green-500' }
        ]
      }"
      :what-section="{
        icon: 'ph:trend-up',
        color: 'green',
        items: [
          { icon: 'ph:timer', iconClass: 'text-blue-400' },
          { icon: 'ph:arrows-out', iconClass: 'text-purple-400' },
          { icon: 'ph:hand-fist', iconClass: 'text-orange-400' },
          { icon: 'ph:check-circle', iconClass: 'text-green-400' }
        ]
      }"
    />

    <InfoTips
      i18n-key="stressReliefBubbles.tips"
      :tips="['posture', 'environment', 'consistency']"
    />

    <RelatedTechniques current-technique-id="stress-relief-bubbles" />

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
import { ref } from "vue";

const totalBubbles = 64;
const isResetting = ref(false);
const audioPrimed = ref(false);

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

// Prime audio on first interaction (critical for iOS)
const primeAudio = () => {
  if (audioPrimed.value || !popAudio.value) return;

  const originalVolume = popAudio.value.volume;

  try {
    // Play at volume 0 to unlock audio playback on iOS
    popAudio.value.volume = 0;
    popAudio.value.currentTime = 0;

    popAudio.value.play()
      .then(() => {
        popAudio.value.pause();
        popAudio.value.currentTime = 0;
        popAudio.value.volume = originalVolume;
        audioPrimed.value = true;
      })
      .catch((err) => {
        console.warn('Audio priming failed:', err);
        popAudio.value.volume = originalVolume;
      });
  } catch (err) {
    console.warn('Audio priming error:', err);
    popAudio.value.volume = originalVolume;
  }
};

const getBubble = (id) => {
  return bubbles.value.find((b) => b.id === id) || { isPopped: false };
};

const popBubble = (bubbleId) => {
  // Prime audio on first interaction
  if (!audioPrimed.value) {
    primeAudio();
  }

  const bubble = bubbles.value.find((b) => b.id === bubbleId);
  if (bubble && !bubble.isPopped) {
    bubble.isPopped = true;
    playPopSound();
  }
};

const resetBubbles = () => {
  // Prime audio on first interaction
  if (!audioPrimed.value) {
    primeAudio();
  }

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