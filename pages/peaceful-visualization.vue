<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <Breadcrumb
      duration="10-12 min"
      :back-label="isExerciseActive ? $t('breadcrumb.back') : undefined"
      :back-action="isExerciseActive ? handleStopExercise : null"
    />

    <main id="main-content" tabindex="-1">

    <!-- Exercise Component -->
    <PeacefulVisualizationExercise ref="exerciseComponent" />

    <!-- How It Works -->
    <InfoHowItWorks
      i18n-key="peacefulVisualization.howItWorks"
      icon="ph:brain"
      color="gray"
      :paragraphs="['description1', 'description2']"
      :items="[
        { key: 'mentalImagery', icon: 'ph:brain' },
        { key: 'sensoryEngagement', icon: 'ph:eye' },
        { key: 'neuralPathways', icon: 'ph:path' }
      ]"
      :columns="3"
    />

    <!-- Science Behind -->
    <InfoScienceBehind
      i18n-key="peacefulVisualization.science"
      :research-items="[
        { key: 'covidAnxiety', icon: 'ph:hospital' },
        { key: 'surgicalAnxiety', icon: 'ph:first-aid-kit' },
        { key: 'metaAnalysis', icon: 'ph:chart-line-up' }
      ]"
    />

    <!-- When & What -->
    <InfoWhenAndWhat
      i18n-key="peacefulVisualization"
      :when-section="{
        icon: 'ph:calendar-check',
        color: 'blue',
        items: [
          { icon: 'ph:warning-circle', iconClass: 'text-orange-500' },
          { icon: 'ph:presentation-chart', iconClass: 'text-blue-500' },
          { icon: 'ph:moon-stars', iconClass: 'text-indigo-400' },
          { icon: 'ph:coffee', iconClass: 'text-amber-600' }
        ]
      }"
      :what-section="{
        icon: 'ph:trend-up',
        color: 'green',
        items: [
          { icon: 'ph:brain', iconClass: 'text-purple-400' },
          { icon: 'ph:heart-half', iconClass: 'text-red-400' },
          { icon: 'ph:hand-palm', iconClass: 'text-blue-400' },
          { icon: 'ph:path', iconClass: 'text-green-400' }
        ]
      }"
    />

    <!-- Tips -->
    <InfoTips
      i18n-key="peacefulVisualization.tips"
      :tips="['preparation', 'engagement', 'patience']"
    />

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="peaceful-visualization" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();

const exerciseComponent = ref(null);

const isExerciseActive = computed(() => {
  return exerciseComponent.value?.exerciseStarted || false;
});

const handleStopExercise = () => {
  if (exerciseComponent.value?.stopExercise) {
    exerciseComponent.value.stopExercise();
  }
};

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
