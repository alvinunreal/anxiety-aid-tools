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
        <div class="mx-auto mb-8 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(scene, index) in visualizationScenes"
            :key="index"
            class="relative border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 transition-colors duration-200"
          >
            <div class="mb-3">
              <Icon
                :name="scene.icon || 'ph:mountains-fill'"
                class="mx-auto text-3xl text-blue-600 dark:text-blue-400"
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

            <!-- Play Button -->
            <button
              @click.stop="startSceneExercise(index)"
              class="mt-4 flex w-full items-center justify-center gap-2 border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 px-4 py-2 text-sm text-gray-700 dark:text-slate-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <Icon name="ph:play-fill" class="text-base" />
              <span>{{ $t('peacefulVisualization.interface.play') }}</span>
            </button>
          </div>
        </div>
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
      <div class="mt-6 flex justify-center">
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
  {
    key: 'cozyRainyCabin',
    icon: 'ph:house-line',
    color1: 0x1f2937,
    color2: 0xffa07a,
    geometryType: 'rain',
  },
  {
    key: 'mistyLakesideDawn',
    icon: 'ph:sun-horizon-fill',
    color1: 0x6baed6,
    color2: 0xfef3c7,
    geometryType: 'mist',
  },
  {
    key: 'sunlitDesertOasis',
    icon: 'ph:sun-fill',
    color1: 0xf59e0b,
    color2: 0xc08457,
    geometryType: 'oasis',
  },
  {
    key: 'floatingCloudSanctuary',
    icon: 'ph:cloud-fill',
    color1: 0xdbeafe,
    color2: 0xf5f5f5,
    geometryType: 'clouds',
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

const defaultAudioLocale = 'en';
const sceneAudioBasePath = (targetLocale) => `/audios/peaceful-visualization/${targetLocale}`;

const buildSceneAudioPath = (sceneKey, index, targetLocale = locale.value) => {
  return `${sceneAudioBasePath(targetLocale)}/${sceneKey}/${String(index + 1).padStart(2, '0')}.mp3`;
};

const getAudioCacheKey = (sceneKey, targetLocale = locale.value) => `${targetLocale}::${sceneKey}`;

const loadAudioElement = (sceneKey, index, targetLocale = locale.value) => {
  if (!import.meta.client) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const src = buildSceneAudioPath(sceneKey, index, targetLocale);
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = src;
    audio.crossOrigin = 'anonymous';
    audio.dataset.sceneKey = sceneKey;
    audio.dataset.guidanceIndex = String(index);
    audio.dataset.locale = targetLocale;

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

const ensureAudioArray = (sceneKey, guidanceLength, targetLocale = locale.value) => {
  const cacheKey = getAudioCacheKey(sceneKey, targetLocale);

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

const getAudioForStep = async (sceneKey, index, guidanceLength, { allowFallback = true } = {}) => {
  if (!import.meta.client) {
    return null;
  }

  const attemptLoad = async (targetLocale) => {
    const audioArray = ensureAudioArray(sceneKey, guidanceLength, targetLocale);
    if (audioArray[index]) {
      return audioArray[index];
    }

    audioLoading.value = true;
    audioError.value = null;

    try {
      const audio = await loadAudioElement(sceneKey, index, targetLocale);
      audioArray[index] = audio;
      return audio;
    } catch (error) {
      console.warn(`Peaceful visualization audio missing for ${sceneKey} step ${index + 1} (locale: ${targetLocale}):`, error);
      return null;
    } finally {
      audioLoading.value = false;
    }
  };

  const primaryLocale = locale.value;
  const primaryAudio = await attemptLoad(primaryLocale);
  if (primaryAudio) {
    return primaryAudio;
  }

  if (!allowFallback || primaryLocale === defaultAudioLocale) {
    audioError.value = new Error(`Audio not found for ${sceneKey} step ${index + 1} in locale ${primaryLocale}`);
    return null;
  }

  console.info(`Falling back to ${defaultAudioLocale} audio for ${sceneKey} step ${index + 1}`);
  const fallbackAudio = await attemptLoad(defaultAudioLocale);
  if (!fallbackAudio) {
    audioError.value = new Error(`Audio not found for ${sceneKey} step ${index + 1} in locales ${primaryLocale} or ${defaultAudioLocale}`);
  }
  return fallbackAudio;
};

const preloadNextAudio = (sceneKey, index, guidanceLength, targetLocale = locale.value) => {
  if (!import.meta.client) return;

  const nextIndex = index + 1;
  if (nextIndex >= guidanceLength) return;

  const audioArray = ensureAudioArray(sceneKey, guidanceLength, targetLocale);
  if (audioArray[nextIndex]) return;

  loadAudioElement(sceneKey, nextIndex, targetLocale)
    .then((audio) => {
      audioArray[nextIndex] = audio;
    })
    .catch((error) => {
      console.warn(`Unable to preload peaceful visualization audio for step ${nextIndex + 1} (locale: ${targetLocale}):`, error);
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

const cleanupAudioCache = () => {
  // Dispose all cached audio elements to prevent memory leaks
  for (const [key, audioArray] of sceneAudioCache.entries()) {
    if (Array.isArray(audioArray)) {
      audioArray.forEach((audio) => {
        if (audio && audio instanceof Audio) {
          try {
            audio.pause();
            audio.src = '';
            audio.load();
          } catch (error) {
            // Ignore errors during cleanup
          }
        }
      });
    }
  }
  sceneAudioCache.clear();
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
  const audioLocale = audioForStep?.dataset?.locale || locale.value;
  preloadNextAudio(sceneKey, index, guidance.length, audioLocale);
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
  // Clear existing environment
  if (environmentMesh) {
    scene.remove(environmentMesh);
    if (environmentMesh.geometry) environmentMesh.geometry.dispose();
    if (environmentMesh.material) environmentMesh.material.dispose();
  }

  // Dispose old background texture to prevent memory leak
  if (scene.background && scene.background.dispose) {
    scene.background.dispose();
    scene.background = null;
  }

  // Always create the same calm sphere shape with consistent blue color
  const geometry = new THREE.SphereGeometry(12, 64, 32);
  const positions = geometry.attributes.position.array;

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];

    const flow = Math.sin(x * 0.1) * Math.cos(y * 0.1) * Math.sin(z * 0.1) * 2;
    const length = Math.sqrt(x * x + y * y + z * z);
    const factor = 1 + (flow * 0.3) / length;

    positions[i] = x * factor;
    positions[i + 1] = y * factor;
    positions[i + 2] = z * factor;
  }
  geometry.attributes.position.needsUpdate = true;

  // Use bright blue color for wireframe lines
  const material = new THREE.MeshBasicMaterial({
    color: 0x3b82f6, // Vibrant blue
    transparent: true,
    opacity: 0.8, // Much higher opacity for visible blue
    wireframe: true,
  });

  environmentMesh = new THREE.Mesh(geometry, material);
  scene.add(environmentMesh);

  // Set camera position for optimal viewing
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  // Create simple dark background so blue lines pop
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  // Create dark gradient - nearly black so blue stands out
  const gradient = context.createLinearGradient(0, 512, 0, 0);
  gradient.addColorStop(0, "#0a0e1a"); // Very dark blue-black
  gradient.addColorStop(0.5, "#050810"); // Nearly black
  gradient.addColorStop(1, "#000000"); // Pure black

  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  scene.background = texture;
};

const animate3D = () => {
  if (!renderer || !scene || !camera) return;

  animationId = requestAnimationFrame(animate3D);

  const time = Date.now() * 0.001;

  // Gentle sphere animation
  if (environmentMesh) {
    // Very gentle rotation for light effect
    environmentMesh.rotation.y += 0.0005;

    // Extremely subtle camera movement
    camera.position.y = Math.sin(time * 0.03) * 0.05;
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

const startSceneExercise = (sceneIndex) => {
  currentSceneIndex.value = sceneIndex;
  startExercise();
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

// Expose state and actions to parent
defineExpose({
  exerciseStarted,
  stopExercise
});

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

  // Properly cleanup audio before clearing cache
  stopCurrentAudio();
  cleanupAudioCache();

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

const handlePageUnload = () => {
  // Stop all audio immediately on page unload
  stopCurrentAudio();
  cleanupAudioCache();
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  window.addEventListener("beforeunload", handlePageUnload);
  window.addEventListener("pagehide", handlePageUnload); // For iOS Safari
  // Note: 3D scene is initialized in startExercise when canvas is actually visible
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("beforeunload", handlePageUnload);
  window.removeEventListener("pagehide", handlePageUnload);

  if (phaseTimer) clearTimeout(phaseTimer);
  if (animationId) cancelAnimationFrame(animationId);
  stopCurrentAudio();
  cleanupAudioCache();

  // Dispose 3D resources
  if (scene?.background?.dispose) {
    scene.background.dispose();
  }
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
