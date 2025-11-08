<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <Breadcrumb duration="5-10 min" />

    <main id="main-content" tabindex="-1">

    <!-- Exercise Component -->
    <ThoughtLabelingExercise />

    <!-- How It Works Section -->
    <InfoHowItWorks
      i18n-key="thoughtLabeling.howItWorks"
      icon="ph:brain"
      color="gray"
      :paragraphs="['description1', 'description2', 'description3']"
      :items="[
        { key: 'cognitiveDefusion', icon: 'ph:link-break' },
        { key: 'emotionalRegulation', icon: 'ph:gauge' },
        { key: 'patternRecognition', icon: 'ph:magnifying-glass' }
      ]"
      :columns="3"
    />

    <!-- Science Behind Section -->
    <InfoScienceBehind
      i18n-key="thoughtLabeling.science"
      :research-items="[
        { key: 'performanceAnxiety', icon: 'ph:trend-down' },
        { key: 'mindfulnessEnhancement', icon: 'ph:heart-half' },
        { key: 'attentionControl', icon: 'ph:target' }
      ]"
    />

    <!-- When & What Section -->
    <InfoWhenAndWhat
      i18n-key="thoughtLabeling"
      :when-section="{
        icon: 'ph:calendar-check',
        color: 'blue',
        items: [
          { icon: 'ph:arrows-counter-clockwise', iconClass: 'text-purple-500' },
          { icon: 'ph:briefcase', iconClass: 'text-gray-500' },
          { icon: 'ph:warning-circle', iconClass: 'text-orange-500' },
          { icon: 'ph:sun-horizon', iconClass: 'text-yellow-400' }
        ]
      }"
      :what-section="{
        icon: 'ph:trend-up',
        color: 'green',
        items: [
          { icon: 'ph:timer', iconClass: 'text-blue-400' },
          { icon: 'ph:subtract', iconClass: 'text-indigo-400' },
          { icon: 'ph:chart-line', iconClass: 'text-purple-400' },
          { icon: 'ph:eye', iconClass: 'text-green-400' }
        ]
      }"
    />

    <!-- Tips Section -->
    <InfoTips
      i18n-key="thoughtLabeling.tips"
      :tips="['observation', 'consistency', 'simplicity']"
    />

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="thought-labeling" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.thoughtLabeling.title"),
  description: () => t("meta.thoughtLabeling.description"),
  ogTitle: () => t("meta.thoughtLabeling.title"),
  ogDescription: () => t("meta.thoughtLabeling.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>
