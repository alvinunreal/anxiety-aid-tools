<template>
  <section class="sektion" ref="exerciseSection">
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseStarted && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:mountains-fill" class="mx-auto text-6xl text-blue-600" />
        </div>
        <h1 class="ptitle">{{ $t("techniques.peacefulVisualization.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600">
          {{ $t("techniques.peacefulVisualization.description") }}
        </p>

        <!-- Scene Selection Grid -->
        <div class="mx-auto mb-8 grid max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(scene, index) in visualizationScenes"
            :key="index"
            @click="currentSceneIndex = index"
            class="cursor-pointer border-2 p-6 transition-all duration-100 hover:border-blue-300 hover:bg-blue-50/50"
            :class="
              currentSceneIndex === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            "
          >
            <div class="mb-3">
              <Icon
                :name="scene.icon || 'ph:mountains-fill'"
                class="mx-auto text-3xl"
                :class="currentSceneIndex === index ? 'text-blue-600' : 'text-gray-400'"
              />
            </div>
            <p class="mb-2 font-semibold text-gray-800">{{ scene.name }}</p>
            <p class="mb-3 text-sm text-gray-600">{{ scene.description }}</p>
            <div class="text-xs font-medium text-blue-600">
              {{ scene.soundscape }}
            </div>
            <div class="mt-2 text-xs text-gray-500">
              {{ scene.atmosphere }}
            </div>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-2 bg-blue-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-blue-700"
        >
          <Icon name="ph:play-fill" class="text-xl" />
          <span>Begin {{ currentScene.name }}</span>
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
        display-label="peaceful moments"
        :progress="75"
        status-text="Immersive visualization journey"
        status-type="active"
        secondary-info="Close your eyes and breathe"
        theme-color="#2563eb"
      />

      <!-- Immersive 3D Visualization Experience -->
      <div class="relative h-[70vh] min-h-[500px] overflow-hidden border border-gray-200 bg-black">
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
          class="flex items-center gap-2 bg-gray-600 px-4 py-2 text-white transition-colors duration-100 hover:bg-gray-700"
        >
          <Icon name="ph:skip-forward-fill" class="text-lg" />
          <span>Skip</span>
        </button>

        <button
          @click="changeScene"
          class="flex items-center gap-2 bg-blue-600 px-4 py-2 text-white transition-colors duration-100 hover:bg-blue-700"
        >
          <Icon :name="currentScene.icon || 'ph:mountains-fill'" class="text-lg" />
          <span>Change Scene</span>
        </button>

        <button
          @click="stopExercise"
          class="flex items-center gap-2 bg-red-600 px-4 py-2 text-white transition-colors duration-100 hover:bg-red-700"
        >
          <Icon name="ph:stop-fill" class="text-lg" />
          <span>Stop</span>
        </button>
      </div>
    </div>

    <!-- Completion State -->
    <div v-if="exerciseCompleted" class="mb-6 border border-green-200 bg-green-50 p-8 text-center">
      <Icon name="ph:check-circle-fill" class="mx-auto mb-4 text-4xl text-green-600" />
      <h2 class="mb-2 text-xl font-semibold text-green-800">Visualization Complete</h2>
      <p class="mb-6 text-green-700">
        You've successfully journeyed to peaceful places within your mind. This calm state is always
        accessible to you.
      </p>

      <div class="mb-6 flex justify-center gap-6 text-sm">
        <div class="flex items-center gap-1">
          <Icon name="ph:brain-fill" class="text-blue-400" />
          <span>Mind calmed</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="ph:heart-fill" class="text-red-400" />
          <span>Stress reduced</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="ph:leaf-fill" class="text-green-400" />
          <span>Inner peace achieved</span>
        </div>
      </div>

      <button
        @click="startExercise"
        class="mx-auto flex items-center gap-2 bg-blue-600 px-8 py-4 text-lg font-medium text-white transition-colors duration-100 hover:bg-blue-700"
      >
        <Icon name="ph:play-fill" class="text-xl" />
        <span>Visit Another Place</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import * as THREE from "three";

const exerciseStarted = ref(false);
const exerciseCompleted = ref(false);
const currentSceneIndex = ref(0);
const currentGuidanceText = ref("");
const isTransitioning = ref(false);

let phaseTimer = null;
let scene, camera, renderer, environmentMesh;
let animationId = null;

const visualizationCanvas = ref(null);

// Rich visualization scenes with detailed environments
const visualizationScenes = [
  {
    name: "Mountain Peak Sunrise",
    description: "Standing atop a gentle mountain, watching the sun rise over endless peaks",
    soundscape: "Mountain wind",
    atmosphere: "Cool, crisp air",
    icon: "ph:mountains-fill",
    color1: 0x87ceeb, // Sky blue
    color2: 0xffe4b5, // Moccasin
    geometryType: "peaks",
    guidance: [
      "You find yourself standing on a peaceful mountain peak, the world spread out before you like a beautiful painting.",
      "The sunrise paints the sky in gentle colors - soft pinks, warm oranges, and golden yellows stretching across the horizon.",
      "Cool, fresh mountain air fills your lungs. Each breath is pure and energizing, washing away any tension or worry.",
      "Below you, layers of mountains roll into the distance like sleeping giants, covered in a soft morning mist.",
      "You feel completely safe here, standing on solid ground, connected to the earth beneath your feet.",
      "The sun's gentle warmth touches your face, filling you with peace and quiet strength.",
      "This is your peaceful place - you can return here anytime by simply closing your eyes and remembering this moment.",
    ],
  },
  {
    name: "Tranquil Forest Grove",
    description: "In a sun-dappled clearing surrounded by ancient, gentle trees",
    soundscape: "Birdsong & leaves",
    atmosphere: "Dappled sunlight",
    icon: "ph:tree-fill",
    color1: 0x228b22, // Forest green
    color2: 0xf0e68c, // Khaki
    geometryType: "trees",
    guidance: [
      "You're walking into a beautiful forest clearing, where ancient trees create a natural cathedral around you.",
      "Gentle sunlight filters through the leaves above, creating dancing patterns of light and shadow on the forest floor.",
      "The air here is filled with the fresh scent of growing things - moss, earth, and the clean smell of leaves.",
      "Soft moss cushions your steps, and you can hear the peaceful sounds of birds singing and leaves rustling in the gentle breeze.",
      "You settle beside a smooth tree trunk, feeling completely supported and safe in nature's embrace.",
      "Every breath brings you deeper peace, as if the forest itself is sharing its ancient calm with you.",
      "This grove is your sanctuary - a place where you can always find peace and renewal whenever you need it.",
    ],
  },
  {
    name: "Peaceful Ocean Beach",
    description: "Walking barefoot on warm sand beside gentle, rhythmic waves",
    soundscape: "Ocean waves",
    atmosphere: "Sea breeze",
    icon: "ph:waves-fill",
    color1: 0x4682b4, // Steel blue
    color2: 0xf5deb3, // Wheat
    geometryType: "waves",
    guidance: [
      "You're walking barefoot on a beautiful beach, feeling the warm, soft sand between your toes.",
      "Gentle waves roll onto the shore in a peaceful rhythm, like the earth's own breathing, calm and steady.",
      "The ocean stretches endlessly before you, its surface sparkling in the sunlight like scattered diamonds.",
      "A warm, gentle breeze carries the clean scent of salt water and touches your skin with perfect comfort.",
      "You find the perfect spot to rest, feeling completely at peace with the endless rhythm of the waves.",
      "Each wave that rolls in takes away any stress or worry, carrying it out to sea where it dissolves completely.",
      "This beach is your peaceful refuge - the waves will always be here, ready to wash away your cares whenever you return.",
    ],
  },
  {
    name: "Serene Garden Paradise",
    description: "In a beautiful garden filled with colorful flowers and gentle fountains",
    soundscape: "Water flowing",
    atmosphere: "Flower fragrances",
    icon: "ph:flower-fill",
    color1: 0x9370db, // Medium purple
    color2: 0xff69b4, // Hot pink
    geometryType: "garden",
    guidance: [
      "You enter a magnificent garden where every flower seems to welcome you with vibrant colors and gentle fragrances.",
      "A small fountain creates the most peaceful sound as clear water dances over smooth stones in the center of the garden.",
      "Butterfly-soft petals in every color imaginable create a living rainbow around you - deep purples, bright yellows, soft pinks.",
      "The air is filled with the sweetest natural perfumes, and everything feels perfectly warm and welcoming.",
      "You find a comfortable place to rest among the flowers, feeling completely safe and loved by nature itself.",
      "This garden grows more beautiful with each breath you take, as if responding to your peaceful presence.",
      "This is your garden of peace - it will always be in bloom, waiting for you whenever you need beauty and calm.",
    ],
  },
  {
    name: "Starlit Meadow Night",
    description: "Lying in a soft meadow under a blanket of countless stars",
    soundscape: "Night sounds",
    atmosphere: "Cool night air",
    icon: "ph:moon-stars-fill",
    color1: 0x191970, // Midnight blue
    color2: 0xe6e6fa, // Lavender
    geometryType: "stars",
    guidance: [
      "You're lying comfortably in a soft meadow, looking up at a sky filled with countless sparkling stars.",
      "The grass beneath you is perfectly soft, like nature's own cushion, supporting your body completely.",
      "Above you, the Milky Way stretches across the heavens like a river of light, beautiful beyond description.",
      "The night air is perfectly comfortable, with a gentle breeze that carries the sweet scent of night-blooming flowers.",
      "You feel small in the best possible way - connected to something vast and peaceful that holds you safely.",
      "Each star seems to shine just for you, sending down gentle light that fills you with wonder and peace.",
      "This meadow under the stars is your place of infinite calm - you can always look up and find peace in the vastness.",
    ],
  },
];

const currentScene = computed(() => visualizationScenes[currentSceneIndex.value]);

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

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    visualizationCanvas.value.clientWidth / visualizationCanvas.value.clientHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({
    canvas: visualizationCanvas.value,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(visualizationCanvas.value.clientWidth, visualizationCanvas.value.clientHeight);
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

const exerciseSection = ref(null);

const startExercise = () => {
  exerciseStarted.value = true;
  exerciseCompleted.value = false;
  currentGuidanceText.value = "";

  // Scroll to exercise header
  nextTick(() => {
    exerciseSection.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    if (visualizationCanvas.value) {
      // Always reinitialize the scene to ensure proper canvas binding
      if (renderer) {
        renderer.dispose();
      }
      if (environmentMesh?.geometry) {
        environmentMesh.geometry.dispose();
      }
      if (environmentMesh?.material) {
        environmentMesh.material.dispose();
      }

      // Clear any existing animation
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      // Reinitialize everything
      init3DScene();
    }
    startVisualization();
  });
};

const startVisualization = () => {
  exerciseStarted.value = true;
  startGuidanceSequence();
};

const startGuidanceSequence = () => {
  const guidance = currentScene.value.guidance;
  let currentIndex = 0;

  const showNextGuidance = () => {
    if (currentIndex >= guidance.length) {
      completeExercise();
      return;
    }

    isTransitioning.value = true;

    setTimeout(() => {
      currentGuidanceText.value = guidance[currentIndex];
      isTransitioning.value = false;
    }, 500);

    // Each guidance text shows for 8 seconds
    const duration = 8000;
    currentIndex++;

    phaseTimer = setTimeout(() => {
      showNextGuidance();
    }, duration);
  };

  showNextGuidance();
};

const skipToNext = () => {
  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }

  // Find current guidance index and advance to next
  const guidance = currentScene.value.guidance;
  const currentIndex = guidance.findIndex((text) => text === currentGuidanceText.value);
  const nextIndex = currentIndex + 1;

  if (nextIndex < guidance.length) {
    // Show next guidance immediately
    isTransitioning.value = true;
    setTimeout(() => {
      currentGuidanceText.value = guidance[nextIndex];
      isTransitioning.value = false;
    }, 500);

    // Continue sequence from next index
    const showFollowingGuidance = () => {
      const followingIndex = nextIndex + 1;
      if (followingIndex >= guidance.length) {
        completeExercise();
        return;
      }

      isTransitioning.value = true;
      setTimeout(() => {
        currentGuidanceText.value = guidance[followingIndex];
        isTransitioning.value = false;
      }, 500);

      phaseTimer = setTimeout(() => {
        const newCurrentIndex = guidance.findIndex((text) => text === currentGuidanceText.value);
        if (newCurrentIndex < guidance.length - 1) {
          showFollowingGuidance();
        } else {
          completeExercise();
        }
      }, 8000);
    };

    // Start the continuing sequence after showing next guidance
    setTimeout(() => {
      showFollowingGuidance();
    }, 8000);
  } else {
    completeExercise();
  }
};


const changeScene = () => {
  currentSceneIndex.value = (currentSceneIndex.value + 1) % visualizationScenes.length;
  createEnvironment();

  if (exerciseStarted.value && !exerciseCompleted.value) {
    if (phaseTimer) clearTimeout(phaseTimer);
    startGuidanceSequence();
  }
};

const stopExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = false;
  currentGuidanceText.value = "";

  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }

  // Stop the animation loop when stopping exercise
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
};

const completeExercise = () => {
  exerciseStarted.value = false;
  exerciseCompleted.value = true;
  currentGuidanceText.value = "";

  if (phaseTimer) {
    clearTimeout(phaseTimer);
    phaseTimer = null;
  }
};

// Handle window resize for 3D canvas
const handleResize = () => {
  if (camera && renderer && visualizationCanvas.value) {
    camera.aspect = visualizationCanvas.value.clientWidth / visualizationCanvas.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(visualizationCanvas.value.clientWidth, visualizationCanvas.value.clientHeight);
  }
};

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
