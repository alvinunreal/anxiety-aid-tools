<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <Breadcrumb duration="5-20 min" />

    <main id="main-content" tabindex="-1">

    <!-- Exercise Component -->
    <section class="sektion">
      <!-- Pre-Exercise State -->
      <div class="text-center">
        <div class="mb-8">
          <div class="mb-6">
            <Icon name="ph:waveform-fill" class="mx-auto text-6xl text-purple-600" />
          </div>
          <h1 class="ptitle">{{ $t("soundTherapy.title") }}</h1>
          <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 transition-colors duration-200">
            {{ $t("soundTherapy.description") }}
          </p>

          <!-- Main Control Panel -->
          <div class="mb-6 border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 md:p-8 transition-colors duration-200">
            <!-- Frequency Selection -->
            <div class="mb-8">
              <h4 class="mb-6 text-xl font-medium text-gray-900 dark:text-slate-100">{{ $t("soundTherapy.interface.frequency") }}</h4>
              <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <button
                  v-for="freq in frequencies"
                  :key="freq.value"
                  @click="selectFrequency(freq)"
                  :class="[
                    'border p-4 text-left transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500',
                    selectedFrequency?.value === freq.value
                      ? 'border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/30'
                      : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700',
                  ]"
                  :aria-pressed="selectedFrequency?.value === freq.value"
                  :aria-label="`${$t(`soundTherapy.frequencies.${freq.index}.name`)} - ${$t(`soundTherapy.frequencies.${freq.index}.description`)}`"
                  role="radio"
                  :aria-checked="selectedFrequency?.value === freq.value"
                >
                  <div class="text-sm font-semibold text-gray-900 dark:text-slate-100">{{ $t(`soundTherapy.frequencies.${freq.index}.name`) }}</div>
                  <div class="mt-1 text-xs leading-tight text-gray-500 dark:text-slate-400">{{ $t(`soundTherapy.frequencies.${freq.index}.description`) }}</div>
                </button>
              </div>
            </div>

            <!-- Settings Row -->
            <div class="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <!-- Binaural Beats -->
              <div>
                <h5 class="mb-4 text-lg font-medium text-gray-900 dark:text-slate-100">{{ $t("soundTherapy.interface.binauralBeats") }}</h5>
                <div class="space-y-2">
                  <button
                    v-for="beat in binauralBeats"
                    :key="beat.value"
                    @click="selectBinauralBeat(beat.value)"
                    :class="[
                      'w-full border p-3 text-left text-sm transition-all duration-200 hover:border-green-300 dark:hover:border-green-500',
                      selectedBeat === beat.value
                        ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30'
                        : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700',
                    ]"
                  >
                    <div class="font-medium text-gray-900 dark:text-slate-100">{{ $t(`soundTherapy.binauralBeats.${beat.index}.name`) }}</div>
                    <div class="mt-1 text-xs text-gray-500 dark:text-slate-400">{{ $t(`soundTherapy.binauralBeats.${beat.index}.description`) }}</div>
                  </button>
                </div>
              </div>

              <!-- Modulation -->
              <div>
                <h5 class="mb-4 text-lg font-medium text-gray-900 dark:text-slate-100">{{ $t("soundTherapy.interface.modulation") }}</h5>
                <div class="space-y-2">
                  <button
                    v-for="preset in lfoPresets"
                    :key="preset.name"
                    @click="selectLfoPreset(preset)"
                    :class="[
                      'w-full border p-3 text-left text-sm transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500',
                      selectedLfoPreset?.index === preset.index
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700',
                    ]">
                  >
                    <div class="font-medium text-gray-900 dark:text-slate-100">{{ $t(`soundTherapy.modulation.${preset.index}.name`) }}</div>
                    <div class="mt-1 text-xs text-gray-500 dark:text-slate-400">{{ $t(`soundTherapy.modulation.${preset.index}.description`) }}</div>
                  </button>
                </div>
              </div>

              <!-- Volume -->
              <div>
                <h5 class="mb-4 text-lg font-medium text-gray-900 dark:text-slate-100">{{ $t("soundTherapy.interface.volume") }}</h5>
                <div class="border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 p-4 transition-colors duration-200">
                  <div class="flex items-center gap-4">
                    <Icon name="ph:speaker-high" class="flex-shrink-0 text-gray-500 dark:text-slate-400" />
                    <div class="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        v-model="volume"
                        class="slider h-2 w-full cursor-pointer appearance-none bg-gray-300"
                        :aria-label="$t('soundTherapy.interface.volume')"
                        role="slider"
                        :aria-valuenow="volume"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                      <div class="mt-2 flex justify-between text-xs text-gray-500 dark:text-slate-400">
                        <span>0%</span>
                        <span class="font-medium">{{ volume }}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Play Button -->
            <div class="text-center">
              <button
                @click="toggleSession"
                :disabled="!selectedFrequency"
                class="mx-auto flex items-center gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-400 dark:disabled:bg-slate-600"
                :aria-label="isPlaying ? $t('soundTherapy.interface.stopSession') : $t('soundTherapy.interface.startSession')"
              >
                <Icon :name="isPlaying ? 'ph:pause-fill' : 'ph:play-fill'" class="text-xl" />
                <span>{{ isPlaying ? $t("soundTherapy.interface.stopSession") : $t("soundTherapy.interface.startSession") }}</span>
              </button>
            </div>
          </div>

          <!-- Playing State -->
          <div v-if="isPlaying" class="mb-6 border border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-8 text-center transition-colors duration-200">
            <div class="mb-6">
              <h4 class="mb-2 text-2xl font-light text-gray-900 dark:text-slate-100">
                {{ $t(`soundTherapy.frequencies.${selectedFrequency.index}.name`) }} - {{ $t(`soundTherapy.frequencies.${selectedFrequency.index}.description`) }}
              </h4>
              <p class="mb-4 text-purple-700 dark:text-purple-300">
                {{ $t("soundTherapy.playingState.description") }}
              </p>
              <p class="text-base opacity-90 dark:text-slate-300">
                {{ $t("soundTherapy.playingState.instructions") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <InfoHowItWorks
      i18n-key="soundTherapy.howItWorks"
      icon="ph:waveform"
      color="gray"
      :paragraphs="['description1', 'description2', 'description3']"
      :items="[
        { key: 'brainwaveEntrainment', icon: 'ph:brain' },
        { key: 'autonomicBalance', icon: 'ph:heartbeat' },
        { key: 'physiologicalResonance', icon: 'ph:pulse' }
      ]"
      :columns="3"
    />

    <!-- Science Section -->
    <InfoScienceBehind
      i18n-key="soundTherapy.science"
      :research-items="[
        { key: 'proceduralAnxiety', icon: 'ph:hospital' },
        { key: 'thetaBeatsAddiction', icon: 'ph:shield-check' },
        { key: 'emergencyStaff', icon: 'ph:first-aid' }
      ]"
    />

    <!-- When & What Section -->
    <InfoWhenAndWhat
      i18n-key="soundTherapy"
      :when-section="{
        icon: 'ph:calendar-check',
        color: 'blue',
        items: [
          { icon: 'ph:warning-circle', iconClass: 'text-orange-500' },
          { icon: 'ph:hospital', iconClass: 'text-blue-500' },
          { icon: 'ph:lightning', iconClass: 'text-yellow-500' },
          { icon: 'ph:moon-stars', iconClass: 'text-indigo-400' }
        ]
      }"
      :what-section="{
        icon: 'ph:trend-up',
        color: 'green',
        items: [
          { icon: 'ph:timer', iconClass: 'text-blue-400' },
          { icon: 'ph:heart', iconClass: 'text-red-400' },
          { icon: 'ph:brain', iconClass: 'text-purple-400' },
          { icon: 'ph:shield-check', iconClass: 'text-green-400' }
        ]
      }"
    />

    <!-- Tips Section -->
    <InfoTips
      i18n-key="soundTherapy.tips"
      :tips="['headphones', 'environment', 'consistency']"
    />

    <RelatedTechniques current-technique-id="sound-therapy" />
    </main>
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from "vue";

const frequencies = [
  { value: 396, index: 0 },
  { value: 417, index: 1 },
  { value: 528, index: 2 },
  { value: 639, index: 3 },
  { value: 741, index: 4 },
  { value: 852, index: 5 },
  { value: 963, index: 6 },
  { value: 174, index: 7 },
];

const binauralBeats = [
  { value: 0, index: 0 },
  { value: 2, index: 1 },
  { value: 4, index: 2 },
  { value: 8, index: 3 },
  { value: 15, index: 4 },
];

// LFO presets with different rates and depths
const lfoPresets = [
  {
    frequencyDepth: 0,
    amplitudeDepth: 0,
    freqRate: 0,
    ampRate: 0,
    index: 0,
  },
  {
    frequencyDepth: 3.0,
    amplitudeDepth: 0.05,
    freqRate: 0.02,
    ampRate: 0.03,
    index: 1,
  },
  {
    frequencyDepth: 8.0,
    amplitudeDepth: 0.15,
    freqRate: 0.04,
    ampRate: 0.05,
    index: 2,
  },
  {
    frequencyDepth: 15.0,
    amplitudeDepth: 0.25,
    freqRate: 0.08,
    ampRate: 0.1,
    index: 3,
  },
  {
    frequencyDepth: 25.0,
    amplitudeDepth: 0.4,
    freqRate: 0.15,
    ampRate: 0.12,
    index: 4,
  },
];

const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.soundTherapy.title"),
  description: () => t("meta.soundTherapy.description"),
  ogTitle: () => t("meta.soundTherapy.title"),
  ogDescription: () => t("meta.soundTherapy.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});

// Reactive state
const selectedFrequency = ref(null);
const selectedBeat = ref(0);
const selectedLfoPreset = ref(lfoPresets[0]);
const volume = ref(50);
const isPlaying = ref(false);

// Audio context and nodes
const audioContext = ref(null);
const oscillator = ref(null);
const oscillator2 = ref(null);
const gainNode = ref(null);

// LFO oscillators
const lfoFrequency = ref(null);
const lfoAmplitude = ref(null);
const lfoGainFreq = ref(null);
const lfoGainAmp = ref(null);

function selectFrequency(freq) {
  selectedFrequency.value = freq;
  if (isPlaying.value) {
    updateAudioFrequencyWithFade();
  }
}

function selectBinauralBeat(value) {
  selectedBeat.value = value;
  if (isPlaying.value) {
    updateBinauralBeatWithFade();
  }
}

function selectLfoPreset(preset) {
  selectedLfoPreset.value = preset;
  if (isPlaying.value) {
    updateLFOsWithFade();
  }
}

function initAudioContext() {
  if (!audioContext.value) {
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.value.state === "suspended") {
    audioContext.value.resume();
  }
}

function createLFOs() {
  if (!audioContext.value || !selectedLfoPreset.value) return;

  const preset = selectedLfoPreset.value;

  if (preset.frequencyDepth > 0) {
    lfoFrequency.value = audioContext.value.createOscillator();
    lfoGainFreq.value = audioContext.value.createGain();

    lfoFrequency.value.type = "sine";
    lfoFrequency.value.frequency.value = preset.freqRate;
    lfoGainFreq.value.gain.value = preset.frequencyDepth;

    lfoFrequency.value.connect(lfoGainFreq.value);
    lfoGainFreq.value.connect(oscillator.value.frequency);
    lfoFrequency.value.start();
  }

  if (preset.amplitudeDepth > 0) {
    lfoAmplitude.value = audioContext.value.createOscillator();
    lfoGainAmp.value = audioContext.value.createGain();

    lfoAmplitude.value.type = "sine";
    lfoAmplitude.value.frequency.value = preset.ampRate;
    lfoGainAmp.value.gain.value = preset.amplitudeDepth;

    lfoAmplitude.value.connect(lfoGainAmp.value);
    lfoGainAmp.value.connect(gainNode.value.gain);
    lfoAmplitude.value.start();
  }
}

function stopLFOs() {
  if (lfoFrequency.value) {
    try {
      lfoFrequency.value.stop();
    } catch (e) {
      // Handle error silently
    }
    lfoFrequency.value = null;
    lfoGainFreq.value = null;
  }

  if (lfoAmplitude.value) {
    try {
      lfoAmplitude.value.stop();
    } catch (e) {
      // Handle error silently
    }
    lfoAmplitude.value = null;
    lfoGainAmp.value = null;
  }
}

function updateLFOs() {
  stopLFOs();
  if (isPlaying.value && oscillator.value) {
    createLFOs();
  }
}

function startAudio() {
  if (!selectedFrequency.value) return;

  initAudioContext();

  // Create main oscillator
  oscillator.value = audioContext.value.createOscillator();
  gainNode.value = audioContext.value.createGain();

  oscillator.value.type = "sine";
  oscillator.value.frequency.value = selectedFrequency.value.value;

  // Set initial volume with fade-in
  gainNode.value.gain.value = 0;
  gainNode.value.gain.linearRampToValueAtTime(
    (volume.value / 100) * 0.3,
    audioContext.value.currentTime + 0.5
  );

  oscillator.value.connect(gainNode.value);
  gainNode.value.connect(audioContext.value.destination);

  oscillator.value.start();

  // Create binaural beat oscillator if needed
  if (selectedBeat.value > 0) {
    oscillator2.value = audioContext.value.createOscillator();
    oscillator2.value.type = "sine";
    oscillator2.value.frequency.value = selectedFrequency.value.value + selectedBeat.value;

    const gainNode2 = audioContext.value.createGain();
    gainNode2.gain.value = 0;
    gainNode2.gain.linearRampToValueAtTime(0.5, audioContext.value.currentTime + 0.5);

    oscillator2.value.connect(gainNode2);
    gainNode2.connect(gainNode.value);
    oscillator2.value.start();
  }

  // Create LFOs
  createLFOs();
}

function stopAudio() {
  if (gainNode.value && audioContext.value) {
    // Fade out before stopping
    gainNode.value.gain.linearRampToValueAtTime(0, audioContext.value.currentTime + 0.1);

    // Stop oscillators after fade-out completes
    setTimeout(() => {
      if (oscillator.value) {
        try {
          oscillator.value.stop();
        } catch (e) {
          // Oscillator might already be stopped
        }
        oscillator.value = null;
      }
      if (oscillator2.value) {
        try {
          oscillator2.value.stop();
        } catch (e) {
          // Oscillator might already be stopped
        }
        oscillator2.value = null;
      }
      stopLFOs();
    }, 150); // Slightly longer than fade-out time
  } else {
    // Fallback if no gain node
    if (oscillator.value) {
      try {
        oscillator.value.stop();
      } catch (e) {
        // Handle error silently
      }
      oscillator.value = null;
    }
    if (oscillator2.value) {
      try {
        oscillator2.value.stop();
      } catch (e) {
        // Handle error silently
      }
      oscillator2.value = null;
    }
    stopLFOs();
  }
}

function updateVolume() {
  if (gainNode.value && audioContext.value) {
    gainNode.value.gain.setTargetAtTime(
      (volume.value / 100) * 0.3,
      audioContext.value.currentTime,
      0.1
    );
  }
}


function updateAudioFrequencyWithFade() {
  if (!gainNode.value || !audioContext.value || !selectedFrequency.value) return;
  
  const currentVolume = (volume.value / 100) * 0.3;
  const currentTime = audioContext.value.currentTime;
  const crossfadeDuration = 2.0;
  
  // Create new oscillators for crossfade
  const newOscillator = audioContext.value.createOscillator();
  const newGainNode = audioContext.value.createGain();
  
  newOscillator.type = "sine";
  newOscillator.frequency.value = selectedFrequency.value.value;
  
  // Start new gain at 0 and fade in
  newGainNode.gain.value = 0;
  newGainNode.gain.linearRampToValueAtTime(currentVolume, currentTime + crossfadeDuration);
  
  // Fade out current oscillator
  gainNode.value.gain.linearRampToValueAtTime(0, currentTime + crossfadeDuration);
  
  // Connect new oscillator
  newOscillator.connect(newGainNode);
  newGainNode.connect(audioContext.value.destination);
  newOscillator.start();
  
  // Handle binaural beat oscillator if needed
  let newOscillator2 = null;
  let newGainNode2 = null;
  
  if (selectedBeat.value > 0) {
    newOscillator2 = audioContext.value.createOscillator();
    newGainNode2 = audioContext.value.createGain();
    
    newOscillator2.type = "sine";
    newOscillator2.frequency.value = selectedFrequency.value.value + selectedBeat.value;
    newGainNode2.gain.value = 0;
    newGainNode2.gain.linearRampToValueAtTime(0.5, currentTime + crossfadeDuration);
    
    newOscillator2.connect(newGainNode2);
    newGainNode2.connect(newGainNode);
    newOscillator2.start();
  }
  
  // Clean up old oscillators after crossfade
  setTimeout(() => {
    // Stop old oscillators
    if (oscillator.value) {
      try {
        oscillator.value.stop();
      } catch (e) {}
    }
    if (oscillator2.value) {
      try {
        oscillator2.value.stop();
      } catch (e) {}
    }
    
    // Switch to new oscillators
    oscillator.value = newOscillator;
    gainNode.value = newGainNode;
    oscillator2.value = newOscillator2;
    
    // Recreate LFOs for new oscillators
    stopLFOs();
    createLFOs();
  }, crossfadeDuration * 1000 + 50);
}

function updateBinauralBeatWithFade() {
  // For binaural beats, we can reuse the frequency crossfade since it handles both
  updateAudioFrequencyWithFade();
}

function updateLFOsWithFade() {
  // For LFO changes, we can reuse the frequency crossfade since it recreates LFOs
  updateAudioFrequencyWithFade();
}

function toggleSession() {
  if (isPlaying.value) {
    stopSession();
  } else {
    startSession();
  }
}

function startSession() {
  if (!selectedFrequency.value) return;

  isPlaying.value = true;
  startAudio();
}

function stopSession() {
  isPlaying.value = false;
  stopAudio();
}

watch(volume, updateVolume);

onUnmounted(() => {
  stopSession();
  if (audioContext.value) {
    audioContext.value.close();
  }
});
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #9333ea;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-webkit-slider-track {
  height: 8px;
  border-radius: 4px;
  background: #e5e7eb;
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #9333ea;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-moz-range-track {
  height: 8px;
  border-radius: 4px;
  background: #e5e7eb;
  border: none;
}
</style>
