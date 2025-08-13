<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8">
    <Breadcrumb duration="3-5 min" />

    <!-- Exercise Component -->
    <GroundingExercise />

    <!-- Educational Content -->
    <!-- How It Works -->
    <section>
      <div class="border border-gray-200 bg-white/60 p-6">
        <SectionHeader icon="ph:brain" color="green">
          How Grounding Works
        </SectionHeader>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h3 class="mb-2 font-semibold text-gray-800">Neurological Impact</h3>
            <p class="mb-3 text-sm leading-relaxed text-gray-700">
              The 5-4-3-2-1 technique redirects attention from internal anxious thoughts to external
              sensory experiences. This engages your prefrontal cortex while calming the
              amygdala—your brain's alarm system.
            </p>
            <p class="text-sm leading-relaxed text-gray-700">
              When you systematically use your five senses, it activates present-moment awareness and
              breaks the cycle of anxious thinking patterns.
            </p>
          </div>
          <div>
            <h3 class="mb-2 font-semibold text-gray-800">Immediate Stability</h3>
            <p class="mb-3 text-sm leading-relaxed text-gray-700">
              The structured sequence (5 things to see, 4 to touch, etc.) gives your mind a concrete
              focus during chaotic mental states, preventing further spiraling into anxiety.
            </p>
            <p class="text-sm leading-relaxed text-gray-700">
              This technique provides immediate grounding by connecting you with your physical
              environment and current reality.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Scientific Background -->
    <section>
      <div class="border border-gray-200 bg-white/60 p-6">
        <SectionHeader icon="ph:flask" color="purple">
          {{ $t("grounding.science.title") }}
        </SectionHeader>
        
        <div class="mb-4">
          <p class="text-sm leading-relaxed text-gray-700" v-html="$t('grounding.science.description')"></p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:gear" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("grounding.science.research.regulation.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('grounding.science.research.regulation.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:heart" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("grounding.science.research.anxiety.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('grounding.science.research.anxiety.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:shield-check" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("grounding.science.research.stability.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('grounding.science.research.stability.description')"></p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="grid gap-8 md:grid-cols-2">
        <!-- When to Use -->
        <div class="border border-gray-200 bg-white/60 p-6">
          <SectionHeader icon="ph:calendar-check" color="blue">
            When to practice
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="flex items-start">
              <Icon name="ph:lightning-fill" class="mr-2 mt-0.5 flex-shrink-0 text-red-500" />
              <span>During panic attacks or overwhelming anxiety</span>
            </li>
            <li class="flex items-start">
              <Icon
                name="ph:cloud-lightning-fill"
                class="mr-2 mt-0.5 flex-shrink-0 text-orange-500"
              />
              <span>When racing thoughts won't stop</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:ghost-fill" class="mr-2 mt-0.5 flex-shrink-0 text-purple-500" />
              <span>Feeling disconnected from reality</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:warning-fill" class="mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
              <span>When situations feel overwhelming</span>
            </li>
          </ul>
        </div>

        <!-- What You'll Experience -->
        <div class="border border-gray-200 bg-white/60 p-6">
          <SectionHeader icon="ph:trend-up" color="green">
            What you'll notice
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700">
            <li class="flex items-start">
              <Icon name="ph:timer" class="mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
              <span>Immediate calming effect within the first minute</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:brain" class="mr-2 mt-0.5 flex-shrink-0 text-purple-400" />
              <span>Clearer thinking and improved decision-making</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:eye" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>Enhanced present-moment awareness</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:shield-check" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>Better stress resilience with regular practice</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Tips Section -->
    <section>
      <div class="border border-indigo-200 bg-indigo-50 p-6">
        <div class="mb-4 text-center">
          <Icon name="ph:lightbulb" class="mx-auto mb-2 text-2xl text-indigo-600" />
          <h2 class="font-semibold text-gray-800">Tips for best results</h2>
        </div>
        <div class="grid gap-4 text-sm md:grid-cols-3">
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">Timing</div>
            <p class="text-gray-600">
              Don't rush through the steps. Spend time really observing each sense.
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">Detail</div>
            <p class="text-gray-600">
              Notice details like colors, textures, temperatures, and specific sounds.
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">Practice</div>
            <p class="text-gray-600">
              Use this technique even when calm to build familiarity for anxious moments.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="grounding" />
  </div>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.grounding.title"),
  description: () => t("meta.grounding.description"),
  ogTitle: () => t("meta.grounding.title"),
  ogDescription: () => t("meta.grounding.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>
