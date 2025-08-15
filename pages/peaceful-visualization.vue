<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <Breadcrumb duration="10-12 min" />

    <!-- Exercise Component -->
    <PeacefulVisualizationExercise />

    <!-- Educational Content -->
    <section>
      <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
        <div>
          <SectionHeader icon="ph:brain" color="gray">
            {{ $t("peacefulVisualization.howItWorks.title") }}
          </SectionHeader>
          <div class="px-1">
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("peacefulVisualization.howItWorks.description") }}
            </p>
            <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("peacefulVisualization.howItWorks.multisensory") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Scientific Background -->
    <section>
      <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
        <SectionHeader icon="ph:flask" color="purple">
          {{ $t("peacefulVisualization.science.title") }}
        </SectionHeader>
        
        <div class="mb-4">
          <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300" v-html="$t('peacefulVisualization.science.description')"></p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:chart-line" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("peacefulVisualization.science.research.effectiveness.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300" v-html="$t('peacefulVisualization.science.research.effectiveness.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:hospital" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("peacefulVisualization.science.research.medical.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300" v-html="$t('peacefulVisualization.science.research.medical.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:heart" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("peacefulVisualization.science.research.physiological.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300" v-html="$t('peacefulVisualization.science.research.physiological.description')"></p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="grid gap-8 md:grid-cols-2">
        <!-- When to Use -->
        <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
          <SectionHeader icon="ph:calendar-check" color="blue">
            {{ $t("peacefulVisualization.whenToPractice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
            <li class="flex items-start" v-for="item in $tm('peacefulVisualization.whenToPractice.items')" :key="item">
              <Icon name="ph:sun" class="mr-2 mt-0.5 flex-shrink-0 text-yellow-500" v-if="$tm('peacefulVisualization.whenToPractice.items').indexOf(item) === 0" />
              <Icon name="ph:briefcase" class="mr-2 mt-0.5 flex-shrink-0 text-gray-500" v-else-if="$tm('peacefulVisualization.whenToPractice.items').indexOf(item) === 1" />
              <Icon name="ph:clock-afternoon" class="mr-2 mt-0.5 flex-shrink-0 text-orange-400" v-else-if="$tm('peacefulVisualization.whenToPractice.items').indexOf(item) === 2" />
              <Icon name="ph:moon" class="mr-2 mt-0.5 flex-shrink-0 text-blue-400" v-else />
              <span>{{ $rt(item) }}</span>
            </li>
          </ul>
        </div>

        <!-- What You'll Experience -->
        <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
          <SectionHeader icon="ph:trend-up" color="green">
            {{ $t("peacefulVisualization.whatYoullNotice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
            <li class="flex items-start" v-for="item in $tm('peacefulVisualization.whatYoullNotice.items')" :key="item">
              <Icon name="ph:brain" class="mr-2 mt-0.5 flex-shrink-0 text-purple-400" v-if="$tm('peacefulVisualization.whatYoullNotice.items').indexOf(item) === 0" />
              <Icon name="ph:heart" class="mr-2 mt-0.5 flex-shrink-0 text-red-400" v-else-if="$tm('peacefulVisualization.whatYoullNotice.items').indexOf(item) === 1" />
              <Icon name="ph:wind" class="mr-2 mt-0.5 flex-shrink-0 text-cyan-400" v-else-if="$tm('peacefulVisualization.whatYoullNotice.items').indexOf(item) === 2" />
              <Icon name="ph:shield-check" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" v-else />
              <span>{{ $rt(item) }}</span>
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
          <h2 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("peacefulVisualization.tips.title") }}</h2>
        </div>
        <div class="grid gap-4 text-sm md:grid-cols-3">
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("peacefulVisualization.tips.preparation.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("peacefulVisualization.tips.preparation.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("peacefulVisualization.tips.engagement.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("peacefulVisualization.tips.engagement.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("peacefulVisualization.tips.patience.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("peacefulVisualization.tips.patience.description") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="peaceful-visualization" />
  </div>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.peacefulVisualization.title"),
  description: () => t("meta.peacefulVisualization.description"),
  ogTitle: () => t("meta.peacefulVisualization.title"),
  ogDescription: () => t("meta.peacefulVisualization.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>
