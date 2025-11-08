<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb duration="2-3 min" />

    <!-- Exercise Component -->
    <BreathingExercise />

    <!-- How It Works Section -->
    <InfoHowItWorks
      i18n-key="breathing.howItWorks"
      :paragraphs="['description1', 'description2', 'description3']"
      :items="[
        { key: 'vagalActivation', icon: 'ph:heart-half' },
        { key: 'gasExchange', icon: 'ph:wind' },
        { key: 'stressHormones', icon: 'ph:drop' }
      ]"
      :columns="3"
    />

    <!-- Science Section -->
    <InfoScienceBehind
      i18n-key="breathing.science"
      :research-items="[
        { key: 'anxietyReduction', icon: 'ph:trend-down' },
        { key: 'panicDisorders', icon: 'ph:shield-check' },
        { key: 'gadImprovement', icon: 'ph:chart-line-up' }
      ]"
    />

    <!-- When & What Section -->
    <InfoWhenAndWhat
      i18n-key="breathing"
      :when-section="{
        icon: 'ph:calendar-check',
        color: 'blue',
        items: [
          { icon: 'ph:sun', iconClass: 'text-yellow-500' },
          { icon: 'ph:briefcase', iconClass: 'text-gray-500' },
          { icon: 'ph:warning-circle', iconClass: 'text-orange-500' },
          { icon: 'ph:moon-stars', iconClass: 'text-indigo-400' }
        ]
      }"
      :what-section="{
        icon: 'ph:trend-up',
        color: 'green',
        items: [
          { icon: 'ph:timer', iconClass: 'text-blue-400' },
          { icon: 'ph:calendar-check', iconClass: 'text-green-400' },
          { icon: 'ph:moon', iconClass: 'text-purple-400' },
          { icon: 'ph:calendar-plus', iconClass: 'text-emerald-500' }
        ]
      }"
    />

    <!-- Tips Section -->
    <InfoTips
      i18n-key="breathing.tips"
      :tips="['posture', 'environment', 'consistency']"
    />

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="breathing" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.breathing.title"),
  description: () => t("meta.breathing.description"),
  ogTitle: () => t("meta.breathing.title"),
  ogDescription: () => t("meta.breathing.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>
