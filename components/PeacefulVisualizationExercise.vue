<template>
  <section class="sektion scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseStarted && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:mountains-fill" class="mx-auto text-6xl text-blue-600" />
        </div>
        <h1 class="ptitle">{{ $t("techniques.peacefulVisualization.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 transition-colors duration-200">
          {{ $t("techniques.peacefulVisualization.description") }}
        </p>

        <!-- Scene Selection Grid -->
        <div class="mx-auto mb-8 grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(scene, index) in visualizationScenes"
            :key="index"
            @click="currentSceneIndex = index"
            class="cursor-pointer border-2 p-6 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/50 dark:hover:border-blue-500 dark:hover:bg-blue-900/20"
            :class="
              currentSceneIndex === index
                ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30'
                : 'border-gray-200 bg-white dark:border-slate-600 dark:bg-slate-800'
            "
          >
            <div class="mb-3">
              <Icon
                :name="scene.icon || 'ph:mountains-fill'"
                class="mx-auto text-3xl"
                :class="currentSceneIndex === index ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-slate-400'"
              />
            </div>
            <p class="mb-2 font-semibold text-gray-800 dark:text-slate-100 transition-colors duration-200">{{ scene.name }}</p>
            <p class="mb-3 text-sm text-gray-600 dark:text-slate-300 transition-colors duration-200">{{ scene.description }}</p>
            <div class="text-xs font-medium text-blue-600 dark:text-blue-400 transition-colors duration-200">
              {{ scene.soundscape }}
            </div>
            <div class="mt-2 text-xs text-gray-500 dark:text-slate-400 transition-colors duration-200">
              {{ scene.atmosphere }}
            </div>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-2 bg-blue-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          <Icon name="ph:play-fill" class="text-xl" />
          <span>{{ $t('peacefulVisualization.interface.beginExercise', { sceneName: currentScene.name }) }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseStarted && !exerciseCompleted">
      <!-- Session Header -->
      <SessionHeader
        :icon="currentScene.icon || 'ph:mountains-fill'"
        :title="currentScene.name"
        :subtitle="`${currentScene.soundscape} • ${currentScene.atmosphere}`"
        display-value="∞"
        :display-label="$t('peacefulVisualization.interface.peacefulMoments')"
        :progress="75"
        :status-text="$t('peacefulVisualization.interface.immersiveJourney')"
        status-type="active"
        :secondary-info="$t('peacefulVisualization.interface.closeEyesAndBreathe')"
        theme-color="#2563eb"
      />

      <!-- Immersive 3D Visualization Experience -->
      <div class="relative h-[70vh] min-h-[500px] overflow-hidden border border-gray-200 dark:border-slate-600 bg-black transition-colors duration-200">
        <!-- 3D Canvas -->
        <canvas ref="visualizationCanvas" class="h-full w-full"></canvas>

        <!-- Floating Guidance Text -->
        <div
          v-if="currentGuidanceText"
          class="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 text-center"
        >
          <div
            class="mx-auto max-w-2xl bg-black/20 px-6 py-4 text-white backdrop-blur-sm transition-all duration-1000"
            :class="{ 'opacity-0': isTransitioning, 'opacity-100': !isTransitioning }"
          >
            <p class="text-lg leading-relaxed md:text-xl">
              {{ currentGuidanceText }}
            </p>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="mt-6 flex justify-center gap-3">
        <button
          @click="skipToNext"
          class="flex items-center gap-2 bg-gray-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <Icon name="ph:skip-forward-fill" class="text-lg" />
          <span>{{ $t('peacefulVisualization.interface.skip') }}</span>
        </button>

        <button
          @click="changeScene"
          class="flex items-center gap-2 bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          <Icon :name="currentScene.icon || 'ph:mountains-fill'" class="text-lg" />
          <span>{{ $t('peacefulVisualization.interface.changeScene') }}</span>
        </button>

        <button
          @click="stopExercise"
          class="flex items-center gap-2 bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
        >
          <Icon name="ph:stop-fill" class="text-lg" />
          <span>{{ $t('peacefulVisualization.interface.stop') }}</span>
        </button>
      </div>
    </div>

    <!-- Completion State -->
    <div v-if="exerciseCompleted" class="mb-6 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-8 text-center transition-colors duration-200">
      <Icon name="ph:check-circle-fill" class="mx-auto mb-4 text-4xl text-green-600 dark:text-green-400" />
      <h2 class="mb-2 text-xl font-semibold text-green-800 dark:text-green-200 transition-colors duration-200">{{ $t('peacefulVisualization.completion.title') }}</h2>
      <p class="mb-6 text-green-700 dark:text-green-300 transition-colors duration-200">
        {{ $t('peacefulVisualization.completion.description') }}
      </p>

      <div class="mb-6 flex justify-center gap-6 text-sm">
        <div class="flex items-center gap-1">
          <Icon name="ph:brain-fill" class="text-blue-400 dark:text-blue-300" />
          <span>{{ $t('peacefulVisualization.completion.benefits.mindCalmed') }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="ph:heart-fill" class="text-red-400 dark:text-red-300" />
          <span>{{ $t('peacefulVisualization.completion.benefits.stressReduced') }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="ph:leaf-fill" class="text-green-400 dark:text-green-300" />
          <span>{{ $t('peacefulVisualization.completion.benefits.innerPeaceAchieved') }}</span>
        </div>
      </div>

      <button
        @click="startExercise"
        class="mx-auto flex items-center gap-2 bg-blue-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
      >
        <Icon name="ph:play-fill" class="text-xl" />
        <span>{{ $t('peacefulVisualization.interface.visitAnotherPlace') }}</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import * as THREE from "three";

const { t, tm, rt, locale } = useI18n();

const exerciseStarted = ref(false);
const exerciseCompleted = ref(false);
const currentSceneIndex = ref(0);
const currentGuidanceText = ref("");
const isTransitioning = ref(false);
const currentGuidanceIndex = ref(-1);
const audioLoading = ref(false);
const audioError = ref(null);
const currentlyPlayingAudio = ref(null);

const pauseBetweenGuidanceMs = 1500;
const fallbackGuidanceDelayMs = 8000;

const sceneAudioCache = new Map();
let currentAudioEndHandler = null;
let currentAudioErrorHandler = null;

let phaseTimer = null;
let scene, camera, renderer, environmentMesh;
let animationId = null;

const visualizationCanvas = ref(null);
const exerciseSection = ref(null);

const sceneDefinitions = [
  {
    key: 'mountainPeakSunrise',
    icon: 'ph:mountains-fill',
    color1: 0x87ceeb,
    color2: 0xffe4b5,
    geometryType: 'peaks',
  },
  {
    key: 'tranquilForestGrove',
    icon: 'ph:tree-fill',
    color1: 0x228b22,
    color2: 0xf0e68c,
    geometryType: 'trees',
  },
  {
    key: 'peacefulOceanBeach',
    icon: 'ph:waves-fill',
    color1: 0x4682b4,
    color2: 0xf5deb3,
    geometryType: 'waves',
  },
  {
    key: 'sereneGardenParadise',
    icon: 'ph:flower-fill',
    color1: 0x9370db,
    color2: 0xff69b4,
    geometryType: 'garden',
  },
  {
    key: 'starlitMeadowNight',
    icon: 'ph:moon-stars-fill',
    color1: 0x191970,
    color2: 0xe6e6fa,
    geometryType: 'stars',
  },
];

// Rich visualization scenes with detailed environments
const visualizationScenes = computed(() => {
  return sceneDefinitions.map((definition) => {
    const basePath = `peacefulVisualization.scenes.${definition.key}`;
    const rawGuidance = tm(`${basePath}.guidance`);
    const guidance = Array.isArray(rawGuidance) ? rawGuidance.map(rt) : [];

    return {
      key: definition.key,
      name: t(`${basePath}.name`),
      description: t(`${basePath}.description`),
      soundscape: t(`${basePath}.soundscape`),
      atmosphere: t(`${basePath}.atmosphere`),
      icon: definition.icon,
      color1: definition.color1,
      color2: definition.color2,
      geometryType: definition.geometryType,
      guidance,
    };
  });
});

const currentScene = computed(() => {
  if (!visualizationScenes.value.length) {
    return {
      key: '',
      name: '',
      description: '',
      soundscape: '',
      atmosphere: '',
      icon: 'ph:mountains-fill',
      color1: 0x87ceeb,
      color2: 0xffe4b5,
      geometryType: 'peaks',
      guidance: [],
    };
  }

  return visualizationScenes.value[currentSceneIndex.value] ?? visualizationScenes.value[0];
});

const sceneAudioBasePath = computed(() => `/audios/peaceful-visualization/${locale.value}`);

const buildSceneAudioPath = (sceneKey, index) => {
  return `${sceneAudioBasePath.value}/${sceneKey}/${String(index + 1).padStart(2, '0')}.mp3`;
};

const getAudioCacheKey = (sceneKey) => `${locale.value}::${sceneKey}`;

const loadAudioElement = (sceneKey, index) => {
  if (!import.meta.client) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const src = buildSceneAudioPath(sceneKey, index);
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = src;
    audio.crossOrigin = 'anonymous';
    audio.dataset.sceneKey = sceneKey;
    audio.dataset.guidanceIndex = String(index);

    const cleanup = () => {
      audio.removeEventListener('canplaythrough', handleSuccess);
      audio.removeEventListener('loadeddata', handleSuccess);
      audio.removeEventListener('error', handleError);
    };

    const handleSuccess = () => {
      cleanup();
      resolve(audio);
    };

    const handleError = (event) => {
      cleanup();
      reject(new Error(`Unable to load audio at ${src}`));
    };

    audio.addEventListener('canplaythrough', handleSuccess, { once: true });
    audio.addEventListener('loadeddata', handleSuccess, { once: true });
    audio.addEventListener('error', handleError, { once: true });

    // Trigger loading explicitly
    audio.load();
  });
};

const ensureAudioArray = (sceneKey, guidanceLength) => {
  const cacheKey = getAudioCacheKey(sceneKey);

  if (!sceneAudioCache.has(cacheKey)) {
    sceneAudioCache.set(cacheKey, Array.from({ length: guidanceLength }, () => null));
  }

  const audioArray = sceneAudioCache.get(cacheKey);

  if (audioArray.length < guidanceLength) {
    audioArray.length = guidanceLength;
    for (let i = 0; i < audioArray.length; i += 1) {
      if (typeof audioArray[i] === 'undefined') {
        audioArray[i] = null;
      }
    }
  }

  return audioArray;
};

const getAudioForStep = async (sceneKey, index, guidanceLength) => {
  if (!import.meta.client) {
    return null;
  }

  const audioArray = ensureAudioArray(sceneKey, guidanceLength);
  if (audioArray[index]) {
    return audioArray[index];
  }

  audioLoading.value = true;
  audioError.value = null;

  try {
    const audio = await loadAudioElement(sceneKey, index);
    audioArray[index] = audio;
    return audio;
  } catch (error) {
    audioError.value = error;
    console.warn(`Peaceful visualization audio missing for ${sceneKey} step ${index + 1}:`, error);
    return null;
  } finally {
    audioLoading.value = false;
  }
};

const preloadNextAudio = (sceneKey, index, guidanceLength) => {
  if (!import.meta.client) return;

  const nextIndex = index + 1;
  if (nextIndex >= guidanceLength) return;

  const audioArray = ensureAudioArray(sceneKey, guidanceLength);
  if (audioArray[nextIndex]) return;

  loadAudioElement(sceneKey, nextIndex)
    .then((audio) => {
      audioArray[nextIndex] = audio;
    })
    .catch((error) => {
      console.warn(`Unable to preload peaceful visualization audio for step ${nextIndex + 1}:`, error);
    });
};

const stopCurrentAudio = () => {
  if (!currentlyPlayingAudio.value) return;

  if (currentAudioEndHandler) {
    currentlyPlayingAudio.value.removeEventListener('ended', currentAudioEndHandler);
    currentAudioEndHandler = null;
  }

  if (currentAudioErrorHandler) {
    currentlyPlayingAudio.value.removeEventListener('error', currentAudioErrorHandler);
    currentAudioErrorHandler = null;
  }

  try {
    currentlyPlayingAudio.value.pause();
  } catch (error) {
    console.warn('Unable to pause current audio:', error);
  }

  try {
    currentlyPlayingAudio.value.currentTime = 0;
  } catch (error) {
    // Ignore if resetting currentTime fails (Safari quirks)
  }

  currentlyPlayingAudio.value = null;
};

const scheduleNextGuidance = (nextIndex, delay = pauseBetweenGuidanceMs) => {
  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }

  phaseTimer = setTimeout(() => {
    showGuidanceAtIndex(nextIndex);
  }, delay);
};

const playAudioForStep = async (audioElement, index) => {
  if (!audioElement) {
    scheduleNextGuidance(index + 1, fallbackGuidanceDelayMs);
    return;
  }

  stopCurrentAudio();

  const fallbackDelay = Number.isFinite(audioElement.duration) && audioElement.duration > 0
    ? Math.ceil(audioElement.duration * 1000) + pauseBetweenGuidanceMs + 1500
    : fallbackGuidanceDelayMs + 3000;

  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }

  phaseTimer = setTimeout(() => {
    console.warn('Audio playback fallback triggered, advancing to next guidance step.');
    if (currentlyPlayingAudio.value === audioElement) {
      stopCurrentAudio();
      showGuidanceAtIndex(index + 1, { immediate: true });
    }
  }, fallbackDelay);

  const handleEnded = () => {
    if (phaseTimer) {
      clearTimeout(phaseTimer);
      phaseTimer = null;
    }
    currentAudioEndHandler = null;
    currentAudioErrorHandler = null;
    currentlyPlayingAudio.value = null;
    scheduleNextGuidance(index + 1, pauseBetweenGuidanceMs);
  };

  const handleError = (event) => {
    console.warn('Audio playback error encountered:', event);
    if (phaseTimer) {
      clearTimeout(phaseTimer);
      phaseTimer = null;
    }
    currentAudioEndHandler = null;
    currentAudioErrorHandler = null;
    currentlyPlayingAudio.value = null;
    scheduleNextGuidance(index + 1, fallbackGuidanceDelayMs);
  };

  currentAudioEndHandler = handleEnded;
  currentAudioErrorHandler = handleError;

  audioElement.addEventListener('ended', handleEnded, { once: true });
  audioElement.addEventListener('error', handleError, { once: true });

  currentlyPlayingAudio.value = audioElement;

  try {
    audioElement.currentTime = 0;
    await audioElement.play();
  } catch (error) {
    console.warn('Failed to play peaceful visualization audio:', error);
    audioElement.removeEventListener('ended', handleEnded);
    audioElement.removeEventListener('error', handleError);
    currentAudioEndHandler = null;
    currentAudioErrorHandler = null;
    currentlyPlayingAudio.value = null;
    scheduleNextGuidance(index + 1, fallbackGuidanceDelayMs);
  }
};

const showGuidanceAtIndex = async (index, { immediate = false } = {}) => {
  const guidance = currentScene.value.guidance || [];

  if (!guidance.length) {
    completeExercise();
    return;
  }

  if (index >= guidance.length) {
    completeExercise();
    return;
  }

  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }

  stopCurrentAudio();
  currentGuidanceIndex.value = index;

  if (immediate) {
    isTransitioning.value = false;
    currentGuidanceText.value = guidance[index];
  } else {
    isTransitioning.value = true;
    await new Promise((resolve) => {
      setTimeout(() => {
        currentGuidanceText.value = guidance[index];
        isTransitioning.value = false;
        resolve();
      }, 500);
    });
  }

  if (!import.meta.client) {
    scheduleNextGuidance(index + 1, fallbackGuidanceDelayMs);
    return;
  }

  const sceneKey = currentScene.value.key;
  if (!sceneKey) {
    scheduleNextGuidance(index + 1, fallbackGuidanceDelayMs);
    return;
  }

  const audioForStep = await getAudioForStep(sceneKey, index, guidance.length);

  if (!audioForStep) {
    scheduleNextGuidance(index + 1, fallbackGuidanceDelayMs);
    return;
  }

  await playAudioForStep(audioForStep, index);
  preloadNextAudio(sceneKey, index, guidance.length);
};

// Seeded random number generator for consistent visuals
let seed = 12345; // Fixed seed for consistent results
const seededRandom = () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};

// Reset seed for each scene to ensure consistency
const resetSeed = (sceneIndex) => {
  seed = 12345 + sceneIndex * 1000; // Different seed per scene but consistent
};

const init3DScene = () => {
  if (!visualizationCanvas.value) return;

  const width = visualizationCanvas.value?.clientWidth || 800;
  const height = visualizationCanvas.value?.clientHeight || 600;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    width / height,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({
    canvas: visualizationCanvas.value,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  createEnvironment();
  animate3D();
};

const createEnvironment = () => {
  // Reset seed for consistent generation per scene
  resetSeed(currentSceneIndex.value);

  // Clear existing environment
  if (environmentMesh) {
    scene.remove(environmentMesh);
    if (environmentMesh.geometry) environmentMesh.geometry.dispose();
    if (environmentMesh.material) environmentMesh.material.dispose();
  }

  const sceneData = currentScene.value;
  let geometry, material;

  // Create beautiful starfield
  switch (sceneData.geometryType) {
    case "starfield":
      // Create realistic starfield with different star sizes and brightness
      geometry = new THREE.BufferGeometry();
      const starCount = 3000;
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);
      const starSizes = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;

        // Create a dome-like distribution for natural sky appearance
        const phi = seededRandom() * Math.PI * 2; // Full rotation
        const theta = Math.acos(1 - seededRandom()); // Weighted towards horizon
        const radius = 100 + seededRandom() * 200; // Varying distances

        starPositions[i3] = radius * Math.sin(theta) * Math.cos(phi);
        starPositions[i3 + 1] = radius * Math.cos(theta);
        starPositions[i3 + 2] = radius * Math.sin(theta) * Math.sin(phi);

        // Different star types and colors
        const starType = seededRandom();
        let r, g, b, size;

        if (starType < 0.7) {
          // White/blue-white stars (most common bright stars)
          r = 0.9 + seededRandom() * 0.1;
          g = 0.9 + seededRandom() * 0.1;
          b = 1;
          size = 0.8 + seededRandom() * 1.5;
        } else if (starType < 0.9) {
          // Golden/yellow stars (like our sun)
          r = 1;
          g = 0.9 + seededRandom() * 0.1;
          b = 0.7 + seededRandom() * 0.2;
          size = 1 + seededRandom() * 2;
        } else {
          // Red giants (rare but prominent)
          r = 1;
          g = 0.3 + seededRandom() * 0.3;
          b = 0.2 + seededRandom() * 0.3;
          size = 1.5 + seededRandom() * 2.5;
        }

        starColors[i3] = r;
        starColors[i3 + 1] = g;
        starColors[i3 + 2] = b;
        starSizes[i] = size;
      }

      // Add some extra bright stars for major constellations
      const brightStars = [
        // Polaris (North Star)
        { x: 0, y: 180, z: -50, size: 3, color: [1, 1, 0.9] },
        // Sirius (brightest star)
        { x: -80, y: 20, z: -120, size: 4, color: [1, 1, 1] },
        // Betelgeuse (red giant in Orion)
        { x: 60, y: 40, z: -100, size: 3.5, color: [1, 0.4, 0.2] },
        // Vega (bright blue star)
        { x: 40, y: 120, z: -80, size: 3, color: [0.9, 0.9, 1] },
      ];

      brightStars.forEach((star, index) => {
        const baseIndex = starCount - brightStars.length + index;
        const i3 = baseIndex * 3;

        starPositions[i3] = star.x;
        starPositions[i3 + 1] = star.y;
        starPositions[i3 + 2] = star.z;

        starColors[i3] = star.color[0];
        starColors[i3 + 1] = star.color[1];
        starColors[i3 + 2] = star.color[2];
        starSizes[baseIndex] = star.size;
      });

      geometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));

      material = new THREE.PointsMaterial({
        size: 2,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.9,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      });

      environmentMesh = new THREE.Points(geometry, material);
      break;

    default:
      // Default flowing abstract form
      geometry = new THREE.SphereGeometry(12, 64, 32);
      const defaultPositions = geometry.attributes.position.array;

      for (let i = 0; i < defaultPositions.length; i += 3) {
        const x = defaultPositions[i];
        const y = defaultPositions[i + 1];
        const z = defaultPositions[i + 2];

        const flow = Math.sin(x * 0.1) * Math.cos(y * 0.1) * Math.sin(z * 0.1) * 2;
        const length = Math.sqrt(x * x + y * y + z * z);
        const factor = 1 + (flow * 0.3) / length;

        defaultPositions[i] = x * factor;
        defaultPositions[i + 1] = y * factor;
        defaultPositions[i + 2] = z * factor;
      }
      geometry.attributes.position.needsUpdate = true;

      material = new THREE.MeshBasicMaterial({
        color: sceneData.color1,
        transparent: true,
        opacity: 0.5,
        wireframe: true,
      });
  }

  if (!environmentMesh) {
    environmentMesh = new THREE.Mesh(geometry, material);
  }

  scene.add(environmentMesh);

  // Set camera position for optimal viewing
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  // Create beautiful night sky background
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext("2d");

  // Create gradient from horizon to zenith like a real night sky
  const gradient = context.createLinearGradient(0, 1024, 0, 0);
  gradient.addColorStop(0, "#000022"); // Deep blue at horizon
  gradient.addColorStop(0.3, "#000033"); // Darker blue
  gradient.addColorStop(0.7, "#000011"); // Very dark blue
  gradient.addColorStop(1, "#000000"); // Pure black at zenith

  context.fillStyle = gradient;
  context.fillRect(0, 0, 1024, 1024);

  // Add subtle Milky Way glow
  const milkyWayGradient = context.createRadialGradient(700, 400, 0, 700, 400, 300);
  milkyWayGradient.addColorStop(0, "rgba(100, 100, 150, 0.1)");
  milkyWayGradient.addColorStop(0.5, "rgba(80, 80, 120, 0.05)");
  milkyWayGradient.addColorStop(1, "rgba(60, 60, 100, 0)");

  context.fillStyle = milkyWayGradient;
  context.fillRect(0, 0, 1024, 1024);

  // Add some subtle nebula clouds
  for (let i = 0; i < 5; i++) {
    const x = seededRandom() * 1024;
    const y = seededRandom() * 512 + 256; // Keep in upper half
    const size = 100 + seededRandom() * 200;

    const nebulaGradient = context.createRadialGradient(x, y, 0, x, y, size);
    nebulaGradient.addColorStop(0, "rgba(120, 100, 200, 0.03)");
    nebulaGradient.addColorStop(0.5, "rgba(100, 80, 150, 0.02)");
    nebulaGradient.addColorStop(1, "rgba(80, 60, 120, 0)");

    context.fillStyle = nebulaGradient;
    context.fillRect(0, 0, 1024, 1024);
  }

  const texture = new THREE.CanvasTexture(canvas);
  scene.background = texture;
};

const animate3D = () => {
  if (!renderer || !scene || !camera) return;

  animationId = requestAnimationFrame(animate3D);

  const time = Date.now() * 0.001;

  // Beautiful star twinkling animation
  if (environmentMesh) {
    const sceneType = currentScene.value.geometryType;

    switch (sceneType) {
      case "starfield":
        // Gentle star twinkling effect
        if (environmentMesh.geometry.attributes.color) {
          const colors = environmentMesh.geometry.attributes.color.array;
          const sizes = environmentMesh.geometry.attributes.size.array;
          const positions = environmentMesh.geometry.attributes.position.array;

          for (let i = 0; i < colors.length; i += 3) {
            const starIndex = i / 3;
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];

            // Create unique twinkling pattern for each star
            const twinkleSpeed = 2 + (starIndex % 5) * 0.5;
            const twinkleOffset = (starIndex * 0.1) % (Math.PI * 2);
            const twinkle = 0.7 + Math.sin(time * twinkleSpeed + twinkleOffset) * 0.3;

            // Slightly vary the twinkling with position for more randomness
            const positionNoise =
              Math.sin(x * 0.001 + time * 0.5) * Math.cos(y * 0.001 + time * 0.3) * 0.1;
            const finalTwinkle = Math.max(0.3, twinkle + positionNoise);

            // Apply twinkling to brightness while preserving star color
            const baseR = colors[i] / (colors[i] + colors[i + 1] + colors[i + 2]) || 0.33;
            const baseG = colors[i + 1] / (colors[i] + colors[i + 1] + colors[i + 2]) || 0.33;
            const baseB = colors[i + 2] / (colors[i] + colors[i + 1] + colors[i + 2]) || 0.33;

            colors[i] = baseR * finalTwinkle;
            colors[i + 1] = baseG * finalTwinkle;
            colors[i + 2] = baseB * finalTwinkle;

            // Slightly vary star sizes for more natural look
            const sizeVariation = 1 + Math.sin(time * (twinkleSpeed * 0.5) + twinkleOffset) * 0.2;
            sizes[starIndex] = sizes[starIndex] * sizeVariation;
          }

          environmentMesh.geometry.attributes.color.needsUpdate = true;
          environmentMesh.geometry.attributes.size.needsUpdate = true;
        }

        // Very slow rotation to simulate earth's rotation
        environmentMesh.rotation.y += 0.0001;
        break;

      default:
        // Default gentle rotation
        environmentMesh.rotation.y += 0.002;
    }

    // Minimal camera movement - just breathing effect
    camera.position.y = Math.sin(time * 0.05) * 0.1;
    camera.lookAt(0, 0, 0);
  }

  renderer.render(scene, camera);
};

const startGuidanceSequence = async ({ immediate = true } = {}) => {
  const guidance = currentScene.value.guidance || [];

  if (!guidance.length) {
    completeExercise();
    return;
  }

  await showGuidanceAtIndex(0, { immediate });
};

const startExercise = () => {
  exerciseStarted.value = true;
  exerciseCompleted.value = false;
  currentGuidanceText.value = "";
  currentGuidanceIndex.value = -1;
  audioError.value = null;

  nextTick(async () => {
    exerciseSection.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    if (visualizationCanvas.value) {
      if (renderer) {
        renderer.dispose();
      }
      if (environmentMesh?.geometry) {
        environmentMesh.geometry.dispose();
      }
      if (environmentMesh?.material) {
        environmentMesh.material.dispose();
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      init3DScene();
    }

    await startGuidanceSequence({ immediate: true });
  });
};

const skipToNext = async () => {
  if (!exerciseStarted.value) return;

  const guidance = currentScene.value.guidance || [];
  if (!guidance.length) {
    completeExercise();
    return;
  }

  const nextIndex = Math.max(0, currentGuidanceIndex.value + 1);
  if (nextIndex >= guidance.length) {
    completeExercise();
    return;
  }

  await showGuidanceAtIndex(nextIndex, { immediate: true });
};

const changeScene = async () => {
  if (!visualizationScenes.value.length) return;

  currentSceneIndex.value = (currentSceneIndex.value + 1) % visualizationScenes.value.length;
  createEnvironment();

  if (exerciseStarted.value && !exerciseCompleted.value) {
    if (phaseTimer) {
      clearTimeout(phaseTimer);
      phaseTimer = null;
    }
    await startGuidanceSequence({ immediate: true });
  }
};

const stopExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = false;
  currentGuidanceText.value = "";
  currentGuidanceIndex.value = -1;
  audioError.value = null;

  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }

  stopCurrentAudio();

  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
};

const completeExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = true;
  currentGuidanceText.value = "";
  currentGuidanceIndex.value = -1;

  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }

  stopCurrentAudio();
};

// Handle window resize for 3D canvas
const handleResize = () => {
  if (!camera || !renderer || !visualizationCanvas.value) return;

  const width = visualizationCanvas.value?.clientWidth || 800;
  const height = visualizationCanvas.value?.clientHeight || 600;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

watch(locale, async () => {
  if (!import.meta.client) return;

  sceneAudioCache.clear();
  stopCurrentAudio();

  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }

  currentGuidanceText.value = "";
  currentGuidanceIndex.value = -1;

  if (exerciseStarted.value && !exerciseCompleted.value) {
    await startGuidanceSequence({ immediate: true });
  }
});

onMounted(() => {
  window.addEventListener("resize", handleResize);
  nextTick(() => {
    if (visualizationCanvas.value) {
      init3DScene();
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);

  if (phaseTimer) clearTimeout(phaseTimer);
  if (animationId) cancelAnimationFrame(animationId);
  stopCurrentAudio();

  if (renderer) {
    renderer.dispose();
  }
  if (environmentMesh?.geometry) {
    environmentMesh.geometry.dispose();
  }
  if (environmentMesh?.material) {
    environmentMesh.material.dispose();
  }
});
</script>
