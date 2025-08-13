<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
    <Breadcrumb duration="12-15 min" />

    <!-- Exercise Component -->
    <ProgressiveMuscleRelaxationExercise />

    <!-- Why It Works Section -->
    <section>
      <!-- How PMR Helps -->
      <div class="border border-gray-200 bg-white/60 p-6">
        <div>
          <SectionHeader icon="ph:heart-fill" color="indigo">
            What happens in your body
          </SectionHeader>
          <div class="px-1">
            <p class="mb-3 text-sm leading-relaxed text-gray-700">
              Progressive Muscle Relaxation (PMR) works by teaching your body to recognize the
              difference between tension and relaxation. When you deliberately tense a muscle group
              for 5 seconds and then release it, you activate the relaxation response, which is the
              opposite of the stress response that contributes to anxiety and physical tension.
            </p>
            <p class="mb-3 text-sm leading-relaxed text-gray-700">
              This technique leverages a natural physiological principle: after a muscle contracts
              intensely, it automatically relaxes more deeply than it would at rest. This rebound
              effect helps achieve a state of relaxation that's deeper than what you can typically
              reach through willpower alone. The systematic progression through different muscle
              groups ensures your entire body benefits from this relaxation response.
            </p>
            <p class="mb-3 text-sm leading-relaxed text-gray-700">
              PMR also helps break the cycle of chronic muscle tension that often accompanies
              anxiety disorders. Many people hold tension in their shoulders, jaw, or stomach
              without realizing it. By systematically working through each muscle group, you develop
              greater body awareness and learn to release tension before it builds up.
            </p>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <div class="border border-gray-200 bg-white/60 p-4">
                <div class="mb-2 flex items-center">
                  <Icon name="ph:lightning" class="mr-2 text-indigo-600" />
                  <span class="font-medium text-gray-800">5-Second Tension</span>
                </div>
                <p class="text-xs text-gray-600">
                  Deliberately contracting muscles activates awareness and prepares for deep
                  release.
                </p>
              </div>
              <div class="border border-gray-200 bg-white/60 p-4">
                <div class="mb-2 flex items-center">
                  <Icon name="ph:hand-peace" class="mr-2 text-indigo-600" />
                  <span class="font-medium text-gray-800">15-Second Release</span>
                </div>
                <p class="text-xs text-gray-600">
                  Extended relaxation allows muscles to reach deeper rest than normal baseline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scientific Background -->
    <section>
      <div class="border border-gray-200 bg-white/60 p-6">
        <SectionHeader icon="ph:flask" color="purple">
          {{ $t("progressiveMuscleRelaxation.science.title") }}
        </SectionHeader>
        
        <div class="mb-4">
          <p class="text-sm leading-relaxed text-gray-700" v-html="$t('progressiveMuscleRelaxation.science.description')"></p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:heart" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("progressiveMuscleRelaxation.science.research.anxiety.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('progressiveMuscleRelaxation.science.research.anxiety.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:hospital" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("progressiveMuscleRelaxation.science.research.medical.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('progressiveMuscleRelaxation.science.research.medical.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:calendar-plus" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("progressiveMuscleRelaxation.science.research.longterm.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('progressiveMuscleRelaxation.science.research.longterm.description')"></p>
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
              <Icon name="ph:moon" class="mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
              <span>Before bedtime for better sleep quality</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:lightning-slash" class="mr-2 mt-0.5 flex-shrink-0 text-purple-400" />
              <span>When feeling physically tense or tight</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:brain" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>After stressful days to release accumulated tension</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:shield-check" class="mr-2 mt-0.5 flex-shrink-0 text-orange-400" />
              <span>As part of daily relaxation routine</span>
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
              <span>Physical tension melts away muscle by muscle</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:brain" class="mr-2 mt-0.5 flex-shrink-0 text-purple-400" />
              <span>Mental chatter quiets as body deeply relaxes</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:heart" class="mr-2 mt-0.5 flex-shrink-0 text-red-400" />
              <span>Body feels heavy, warm, and completely at ease</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:shield-check" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>Deep relaxation that improves sleep quality</span>
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
            <div class="mb-1 font-medium text-indigo-600">Environment</div>
            <p class="text-gray-600">
              Find a quiet, comfortable place where you won't be interrupted. Comfortable
              temperature helps focus.
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">Tension Level</div>
            <p class="text-gray-600">
              Tense muscles firmly but avoid pain. Focus on the contrast between tension and
              relaxation.
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">Consistency</div>
            <p class="text-gray-600">
              Regular practice improves your ability to recognize and release muscle tension
              quickly.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="progressive-muscle-relaxation" />
  </div>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.progressiveMuscleRelaxation.title"),
  description: () => t("meta.progressiveMuscleRelaxation.description"),
  ogTitle: () => t("meta.progressiveMuscleRelaxation.title"),
  ogDescription: () => t("meta.progressiveMuscleRelaxation.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>
