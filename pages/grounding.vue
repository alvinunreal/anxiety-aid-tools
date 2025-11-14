<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb duration="3-5 min" />

    <!-- Exercise Component -->
    <GroundingExercise />

    <!-- How It Works -->
    <InfoHowItWorks
      i18n-key="grounding.howItWorks"
      icon="ph:hand-eye"
      color="gray"
      :paragraphs="['description1', 'description2', 'description3']"
      :items="[
        { key: 'sensoryEngagement', icon: 'ph:eye' },
        { key: 'neuralInterruption', icon: 'ph:brain' },
        { key: 'presentMomentAnchoring', icon: 'ph:anchor' }
      ]"
      :columns="3"
    />

    <!-- Science Behind -->
    <InfoScienceBehind
      i18n-key="grounding.science"
      :research-items="[
        { key: 'anxietyReduction', icon: 'ph:trend-down' },
        { key: 'mentalHealthImprovement', icon: 'ph:heart-half' },
        { key: 'symptomFrequencyReduction', icon: 'ph:chart-line-down' }
      ]"
    />

    <!-- When & What -->
    <InfoWhenAndWhat
      i18n-key="grounding"
      :when-section="{
        icon: 'ph:calendar-check',
        color: 'blue',
        items: [
          { icon: 'ph:warning-circle', iconClass: 'text-red-500' },
          { icon: 'ph:ghost', iconClass: 'text-gray-400' },
          { icon: 'ph:presentation-chart', iconClass: 'text-blue-500' },
          { icon: 'ph:lightning', iconClass: 'text-yellow-500' }
        ]
      }"
      :what-section="{
        icon: 'ph:trend-up',
        color: 'green',
        items: [
          { icon: 'ph:timer', iconClass: 'text-blue-400' },
          { icon: 'ph:heart-half', iconClass: 'text-red-400' },
          { icon: 'ph:lightbulb', iconClass: 'text-yellow-400' },
          { icon: 'ph:shield-check', iconClass: 'text-green-400' }
        ]
      }"
    />

    <!-- Tips -->
    <InfoTips
      i18n-key="grounding.tips"
      :tips="['tip1', 'tip2', 'tip3']"
    />

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="grounding" />
    </main>
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
