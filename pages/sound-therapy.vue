<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-8">
    <Breadcrumb duration="5-20 min" />

    <!-- Exercise Component -->
    <section class="sektion">
      <!-- Pre-Exercise State -->
      <div class="text-center">
        <div class="mb-8">
          <div class="mb-6">
            <Icon name="ph:waveform-fill" class="mx-auto text-6xl text-purple-600" />
          </div>
          <h1 class="ptitle">Sound Therapy & Frequency Healing</h1>
          <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600">
            {{ $t("techniques.soundTherapy.description") }}
          </p>

          <!-- Main Control Panel -->
          <div class="mb-6 border border-gray-200 bg-white p-6 md:p-8">
            <!-- Frequency Selection -->
            <div class="mb-8">
              <h4 class="mb-6 text-xl font-medium text-gray-900">Frequency</h4>
              <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <button
                  v-for="freq in frequencies"
                  :key="freq.value"
                  @click="selectFrequency(freq)"
                  :class="[
                    'border p-4 text-left transition-all duration-200 hover:border-purple-300',
                    selectedFrequency?.value === freq.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white',
                  ]"
                >
                  <div class="text-sm font-semibold text-gray-900">{{ freq.name }}</div>
                  <div class="mt-1 text-xs leading-tight text-gray-500">{{ freq.description }}</div>
                </button>
              </div>
            </div>

            <!-- Settings Row -->
            <div class="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <!-- Binaural Beats -->
              <div>
                <h5 class="mb-4 text-lg font-medium text-gray-900">Binaural Beats</h5>
                <div class="space-y-2">
                  <button
                    v-for="beat in binauralBeats"
                    :key="beat.value"
                    @click="selectBinauralBeat(beat.value)"
                    :class="[
                      'w-full border p-3 text-left text-sm transition-all duration-200 hover:border-green-300',
                      selectedBeat === beat.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white',
                    ]"
                  >
                    <div class="font-medium text-gray-900">{{ beat.name }}</div>
                    <div class="mt-1 text-xs text-gray-500">{{ beat.description }}</div>
                  </button>
                </div>
              </div>

              <!-- Modulation -->
              <div>
                <h5 class="mb-4 text-lg font-medium text-gray-900">Modulation</h5>
                <div class="space-y-2">
                  <button
                    v-for="preset in lfoPresets"
                    :key="preset.name"
                    @click="selectLfoPreset(preset)"
                    :class="[
                      'w-full border p-3 text-left text-sm transition-all duration-200 hover:border-blue-300',
                      selectedLfoPreset?.name === preset.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white',
                    ]"
                  >
                    <div class="font-medium text-gray-900">{{ preset.name }}</div>
                    <div class="mt-1 text-xs text-gray-500">{{ preset.description }}</div>
                  </button>
                </div>
              </div>

              <!-- Volume -->
              <div>
                <h5 class="mb-4 text-lg font-medium text-gray-900">Volume</h5>
                <div class="border border-gray-200 bg-gray-50 p-4">
                  <div class="flex items-center gap-4">
                    <Icon name="ph:speaker-high" class="flex-shrink-0 text-gray-500" />
                    <div class="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        v-model="volume"
                        class="slider h-2 w-full cursor-pointer appearance-none bg-gray-300"
                      />
                      <div class="mt-2 flex justify-between text-xs text-gray-500">
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
                class="mx-auto flex items-center gap-2 bg-purple-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                <Icon :name="isPlaying ? 'ph:pause-fill' : 'ph:play-fill'" class="text-xl" />
                <span>{{ isPlaying ? "Stop Session" : "Start Sound Therapy" }}</span>
              </button>
            </div>
          </div>

          <!-- Playing State -->
          <div v-if="isPlaying" class="mb-6 border border-purple-200 bg-purple-50 p-8 text-center">
            <div class="mb-6">
              <h4 class="mb-2 text-2xl font-light text-gray-900">
                {{ selectedFrequency.name }} - {{ selectedFrequency.description }}
              </h4>
              <p class="mb-4 text-purple-700">
                Allow the healing vibrations to wash over you. Focus on your breath and let the
                frequencies guide you into deep relaxation.
              </p>
              <p class="text-base opacity-90">
                Close your eyes and allow the vibrations to penetrate deeply, bringing peace to your
                mind and body.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Content -->
    <section class="mt-12 space-y-8">
      <!-- How It Works -->
      <div class="border border-gray-200 bg-white/60 p-6">
        <SectionHeader icon="ph:waveform" color="purple">
          {{ $t("soundTherapy.howItWorks.title") }}
        </SectionHeader>
        <p class="mb-4 text-sm leading-relaxed text-gray-700">{{ $t("soundTherapy.howItWorks.description") }}</p>
        
        <div class="grid gap-4 md:grid-cols-2">
          <div class="border border-gray-200 bg-white/60 p-4">
            <h3 class="mb-2 font-semibold text-gray-800">{{ $t("soundTherapy.howItWorks.frequencies.title") }}</h3>
            <p class="text-sm text-gray-600">{{ $t("soundTherapy.howItWorks.frequencies.description") }}</p>
          </div>
          <div class="border border-gray-200 bg-white/60 p-4">
            <h3 class="mb-2 font-semibold text-gray-800">{{ $t("soundTherapy.howItWorks.binaural.title") }}</h3>
            <p class="text-sm text-gray-600">{{ $t("soundTherapy.howItWorks.binaural.description") }}</p>
          </div>
        </div>
      </div>

      <!-- Scientific Background -->
      <div class="border border-gray-200 bg-white/60 p-6">
        <SectionHeader icon="ph:flask" color="purple">
          {{ $t("soundTherapy.science.title") }}
        </SectionHeader>
        
        <div class="mb-4">
          <p class="text-sm leading-relaxed text-gray-700" v-html="$t('soundTherapy.science.description')"></p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:hospital" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("soundTherapy.science.research.clinical.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('soundTherapy.science.research.clinical.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:wave-sine" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("soundTherapy.science.research.frequency.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('soundTherapy.science.research.frequency.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:music-notes" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("soundTherapy.science.research.combined.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('soundTherapy.science.research.combined.description')"></p>
          </div>
        </div>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <!-- When to Use -->
        <div class="border border-gray-200 bg-white/60 p-6">
          <SectionHeader icon="ph:calendar-check" color="blue">
            {{ $t("soundTherapy.whenToPractice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="flex items-start">
              <Icon name="ph:flower-lotus-duotone" class="mr-2 mt-0.5 flex-shrink-0 text-purple-500" />
              <span>{{ $t("soundTherapy.whenToPractice.items.0") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:syringe" class="mr-2 mt-0.5 flex-shrink-0 text-red-500" />
              <span>{{ $t("soundTherapy.whenToPractice.items.1") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:bandaids" class="mr-2 mt-0.5 flex-shrink-0 text-orange-500" />
              <span>{{ $t("soundTherapy.whenToPractice.items.2") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:eye" class="mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
              <span>{{ $t("soundTherapy.whenToPractice.items.3") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:moon-stars" class="mr-2 mt-0.5 flex-shrink-0 text-indigo-500" />
              <span>{{ $t("soundTherapy.whenToPractice.items.4") }}</span>
            </li>
          </ul>
        </div>

        <!-- What You'll Experience -->
        <div class="border border-gray-200 bg-white/60 p-6">
          <SectionHeader icon="ph:trend-up" color="green">
            {{ $t("soundTherapy.whatYoullNotice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="flex items-start">
              <Icon name="ph:waves" class="mr-2 mt-0.5 flex-shrink-0 text-purple-400" />
              <span>{{ $t("soundTherapy.whatYoullNotice.items.0") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:leaf" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>{{ $t("soundTherapy.whatYoullNotice.items.1") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:minus-circle" class="mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
              <span>{{ $t("soundTherapy.whatYoullNotice.items.2") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:target" class="mr-2 mt-0.5 flex-shrink-0 text-indigo-400" />
              <span>{{ $t("soundTherapy.whatYoullNotice.items.3") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:shield-check" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>{{ $t("soundTherapy.whatYoullNotice.items.4") }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tips Section -->
      <div class="border border-indigo-200 bg-indigo-50 p-6">
        <div class="mb-4 text-center">
          <Icon name="ph:lightbulb" class="mx-auto mb-2 text-2xl text-indigo-600" />
          <h2 class="font-semibold text-gray-800">{{ $t("soundTherapy.tips.title") }}</h2>
        </div>
        <div class="grid gap-4 text-sm md:grid-cols-3">
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("soundTherapy.tips.headphones.title") }}</div>
            <p class="text-gray-600">{{ $t("soundTherapy.tips.headphones.description") }}</p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("soundTherapy.tips.volume.title") }}</div>
            <p class="text-gray-600">{{ $t("soundTherapy.tips.volume.description") }}</p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("soundTherapy.tips.consistency.title") }}</div>
            <p class="text-gray-600">{{ $t("soundTherapy.tips.consistency.description") }}</p>
          </div>
        </div>
      </div>
    </section>

    <RelatedTechniques current-technique-id="sound-therapy" />
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch } from "vue";

const frequencies = [
  { name: "396Hz", value: 396, description: "Liberation from fear and guilt" },
  { name: "417Hz", value: 417, description: "Facilitating change and transformation" },
  { name: "528Hz", value: 528, description: "Love frequency and DNA repair" },
  { name: "639Hz", value: 639, description: "Harmonious relationships" },
  { name: "741Hz", value: 741, description: "Awakening intuition and expression" },
  { name: "852Hz", value: 852, description: "Returning to spiritual order" },
  { name: "963Hz", value: 963, description: "Connection to universal consciousness" },
  { name: "174Hz", value: 174, description: "Natural anesthetic and pain relief" },
];

const binauralBeats = [
  { name: "None", value: 0, description: "Pure frequency" },
  { name: "Delta 2Hz", value: 2, description: "Deep sleep" },
  { name: "Theta 4Hz", value: 4, description: "Deep meditation" },
  { name: "Alpha 8Hz", value: 8, description: "Relaxed focus" },
  { name: "Beta 15Hz", value: 15, description: "Alert awareness" },
];

// LFO presets with different rates and depths
const lfoPresets = [
  {
    name: "Off",
    description: "No modulation",
    frequencyDepth: 0,
    amplitudeDepth: 0,
    freqRate: 0,
    ampRate: 0,
  },
  {
    name: "Very Subtle",
    description: "Barely perceptible",
    frequencyDepth: 3.0,
    amplitudeDepth: 0.05,
    freqRate: 0.02,
    ampRate: 0.03,
  },
  {
    name: "Gentle",
    description: "Soft breathing effect",
    frequencyDepth: 8.0,
    amplitudeDepth: 0.15,
    freqRate: 0.04,
    ampRate: 0.05,
  },
  {
    name: "Moderate",
    description: "Noticeable waves",
    frequencyDepth: 15.0,
    amplitudeDepth: 0.25,
    freqRate: 0.08,
    ampRate: 0.1,
  },
  {
    name: "Strong",
    description: "Deep pulsing",
    frequencyDepth: 25.0,
    amplitudeDepth: 0.4,
    freqRate: 0.15,
    ampRate: 0.12,
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

function updateAudioFrequency() {
  if (oscillator.value && selectedFrequency.value && audioContext.value) {
    // Smooth frequency transition to avoid clicks
    oscillator.value.frequency.setTargetAtTime(
      selectedFrequency.value.value,
      audioContext.value.currentTime,
      0.05
    );
  }
  if (oscillator2.value && selectedBeat.value > 0 && audioContext.value) {
    oscillator2.value.frequency.setTargetAtTime(
      selectedFrequency.value.value + selectedBeat.value,
      audioContext.value.currentTime,
      0.05
    );
  } else if (oscillator2.value && selectedBeat.value === 0) {
    // Fade out binaural beat before stopping to prevent click
    const tempGain = audioContext.value.createGain();
    tempGain.gain.value = 1;
    tempGain.gain.linearRampToValueAtTime(0, audioContext.value.currentTime + 0.05);

    oscillator2.value.disconnect();
    oscillator2.value.connect(tempGain);
    tempGain.connect(gainNode.value);

    setTimeout(() => {
      try {
        oscillator2.value.stop();
      } catch (e) {
        // Handle error silently
      }
      oscillator2.value = null;
    }, 60);
  } else if (
    !oscillator2.value &&
    selectedBeat.value > 0 &&
    isPlaying.value &&
    selectedFrequency.value
  ) {
    oscillator2.value = audioContext.value.createOscillator();
    oscillator2.value.type = "sine";
    oscillator2.value.frequency.value = selectedFrequency.value.value + selectedBeat.value;

    const gainNode2 = audioContext.value.createGain();
    gainNode2.gain.value = 0;
    gainNode2.gain.linearRampToValueAtTime(0.5, audioContext.value.currentTime + 0.05); // Fade in

    oscillator2.value.connect(gainNode2);
    gainNode2.connect(gainNode.value);
    oscillator2.value.start();
  }
}

function updateAudioFrequencyWithFade() {
  if (!gainNode.value || !audioContext.value) return;
  
  const currentVolume = (volume.value / 100) * 0.3;
  const currentTime = audioContext.value.currentTime;
  
  // Cancel any scheduled changes to prevent clicks
  gainNode.value.gain.cancelScheduledValues(currentTime);
  gainNode.value.gain.setValueAtTime(gainNode.value.gain.value, currentTime);
  
  // Fade out to complete silence
  gainNode.value.gain.linearRampToValueAtTime(0, currentTime + 1.5);
  
  // Update frequency after fade out is complete
  setTimeout(() => {
    if (gainNode.value && audioContext.value) {
      updateAudioFrequency();
      // Cancel any previous scheduled values and start fresh
      gainNode.value.gain.cancelScheduledValues(audioContext.value.currentTime);
      gainNode.value.gain.setValueAtTime(0, audioContext.value.currentTime);
      // Fade in from silence
      gainNode.value.gain.linearRampToValueAtTime(currentVolume, audioContext.value.currentTime + 1.5);
    }
  }, 1500);
}

function updateBinauralBeatWithFade() {
  if (!gainNode.value || !audioContext.value) return;
  
  const currentVolume = (volume.value / 100) * 0.3;
  const currentTime = audioContext.value.currentTime;
  
  // Cancel any scheduled changes to prevent clicks
  gainNode.value.gain.cancelScheduledValues(currentTime);
  gainNode.value.gain.setValueAtTime(gainNode.value.gain.value, currentTime);
  
  // Fade out to complete silence
  gainNode.value.gain.linearRampToValueAtTime(0, currentTime + 1.5);
  
  // Update binaural beat after fade out is complete
  setTimeout(() => {
    if (gainNode.value && audioContext.value) {
      updateAudioFrequency();
      // Cancel any previous scheduled values and start fresh
      gainNode.value.gain.cancelScheduledValues(audioContext.value.currentTime);
      gainNode.value.gain.setValueAtTime(0, audioContext.value.currentTime);
      // Fade in from silence
      gainNode.value.gain.linearRampToValueAtTime(currentVolume, audioContext.value.currentTime + 1.5);
    }
  }, 1500);
}

function updateLFOsWithFade() {
  if (!gainNode.value || !audioContext.value) return;
  
  const currentVolume = (volume.value / 100) * 0.3;
  const currentTime = audioContext.value.currentTime;
  
  // Cancel any scheduled changes to prevent clicks
  gainNode.value.gain.cancelScheduledValues(currentTime);
  gainNode.value.gain.setValueAtTime(gainNode.value.gain.value, currentTime);
  
  // Fade out to complete silence
  gainNode.value.gain.linearRampToValueAtTime(0, currentTime + 1.5);
  
  // Update LFOs after fade out is complete
  setTimeout(() => {
    if (gainNode.value && audioContext.value) {
      updateLFOs();
      // Cancel any previous scheduled values and start fresh
      gainNode.value.gain.cancelScheduledValues(audioContext.value.currentTime);
      gainNode.value.gain.setValueAtTime(0, audioContext.value.currentTime);
      // Fade in from silence
      gainNode.value.gain.linearRampToValueAtTime(currentVolume, audioContext.value.currentTime + 1.5);
    }
  }, 1500);
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
