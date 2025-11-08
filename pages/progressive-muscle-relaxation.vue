<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 transition-colors duration-300">
    <Breadcrumb duration="12-15 min" />

    <main id="main-content" tabindex="-1">

    <!-- Exercise Component -->
    <ProgressiveMuscleRelaxationExercise />

    <!-- How It Works Section -->
    <InfoHowItWorks
      i18n-key="progressiveMuscleRelaxation.howItWorks"
      icon="ph:arrows-in-line-horizontal"
      color="gray"
      :paragraphs="['description1', 'description2', 'description3']"
      :items="[
        { key: 'tensionContrast', icon: 'ph:arrows-out-simple' },
        { key: 'nervousSystemShift', icon: 'ph:heart-half' },
        { key: 'bodyAwareness', icon: 'ph:scan' }
      ]"
      :columns="3"
    />

    <!-- Science Behind Section -->
    <InfoScienceBehind
      i18n-key="progressiveMuscleRelaxation.science"
      :research-items="[
        { key: 'nurseStress', icon: 'ph:trend-down' },
        { key: 'studentAnxiety', icon: 'ph:student' },
        { key: 'clinicalTraining', icon: 'ph:hospital' }
      ]"
    />

    <!-- When & What Section -->
    <InfoWhenAndWhat
      i18n-key="progressiveMuscleRelaxation"
      :when-section="{
        icon: 'ph:calendar-check',
        color: 'blue',
        items: [
          { icon: 'ph:person-arms-spread', iconClass: 'text-orange-500' },
          { icon: 'ph:briefcase', iconClass: 'text-gray-500' },
          { icon: 'ph:clock-afternoon', iconClass: 'text-amber-500' },
          { icon: 'ph:moon-stars', iconClass: 'text-indigo-400' }
        ]
      }"
      :what-section="{
        icon: 'ph:trend-up',
        color: 'green',
        items: [
          { icon: 'ph:lightbulb', iconClass: 'text-yellow-400' },
          { icon: 'ph:waves', iconClass: 'text-blue-400' },
          { icon: 'ph:heartbeat', iconClass: 'text-red-400' },
          { icon: 'ph:shield-check', iconClass: 'text-green-400' }
        ]
      }"
    />

    <!-- Tips Section -->
    <InfoTips
      i18n-key="progressiveMuscleRelaxation.tips"
      :tips="['position', 'technique', 'focus']"
    />

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="progressive-muscle-relaxation" />
    </main>
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
