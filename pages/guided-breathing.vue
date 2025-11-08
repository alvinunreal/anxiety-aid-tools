<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb duration="3-5 min" />

    <!-- Exercise Component -->
    <GuidedBreathingExercise />

    <!-- Technique Overview (Exercise-Specific Info Grid) -->
    <section>
      <div class="mb-6 grid gap-6 md:grid-cols-2">
        <div class="border border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-6 transition-colors duration-200">
          <div>
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:squares-four" class="flex-shrink-0 text-2xl text-blue-600 dark:text-blue-400" />
              <h2 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("guidedBreathing.techniquesOverview.boxBreathing.title") }}</h2>
            </div>
            <div class="px-1">
              <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
                {{ $t("guidedBreathing.techniquesOverview.boxBreathing.description") }}
              </p>
              <div class="text-xs font-medium text-blue-600 dark:text-blue-400">
                {{ $t("guidedBreathing.techniquesOverview.boxBreathing.bestFor") }}
              </div>
            </div>
          </div>
        </div>

        <div class="border border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-6 transition-colors duration-200">
          <div>
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:moon-stars" class="flex-shrink-0 text-2xl text-purple-600 dark:text-purple-400" />
              <h2 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("guidedBreathing.techniquesOverview.calming.title") }}</h2>
            </div>
            <div class="px-1">
              <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
                {{ $t("guidedBreathing.techniquesOverview.calming.description") }}
              </p>
              <div class="text-xs font-medium text-purple-600 dark:text-purple-400">
                {{ $t("guidedBreathing.techniquesOverview.calming.bestFor") }}
              </div>
            </div>
          </div>
        </div>

        <div class="border border-green-200 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-6 transition-colors duration-200">
          <div>
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:lightning" class="flex-shrink-0 text-2xl text-green-600 dark:text-green-400" />
              <h2 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("guidedBreathing.techniquesOverview.energizing.title") }}</h2>
            </div>
            <div class="px-1">
              <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
                {{ $t("guidedBreathing.techniquesOverview.energizing.description") }}
              </p>
              <div class="text-xs font-medium text-green-600 dark:text-green-400">
                {{ $t("guidedBreathing.techniquesOverview.energizing.bestFor") }}
              </div>
            </div>
          </div>
        </div>

        <div class="border border-orange-200 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 p-6 transition-colors duration-200">
          <div>
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:clock" class="flex-shrink-0 text-2xl text-orange-600 dark:text-orange-400" />
              <h2 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("guidedBreathing.techniquesOverview.quickReset.title") }}</h2>
            </div>
            <div class="px-1">
              <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
                {{ $t("guidedBreathing.techniquesOverview.quickReset.description") }}
              </p>
              <div class="text-xs font-medium text-orange-600 dark:text-orange-400">
                {{ $t("guidedBreathing.techniquesOverview.quickReset.bestFor") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <InfoHowItWorks
      i18n-key="guidedBreathing.howItWorks"
      icon="ph:brain"
      color="gray"
      :paragraphs="['description1', 'description2', 'description3']"
      :items="[
        { key: 'rhythmicControl', icon: 'ph:metronome' },
        { key: 'patternVariety', icon: 'ph:list-checks' },
        { key: 'neuralRegulation', icon: 'ph:lightning' }
      ]"
      :columns="3"
    />

    <!-- Science Behind Section -->
    <InfoScienceBehind
      i18n-key="guidedBreathing.science"
      :research-items="[
        { key: 'anxietyReduction', icon: 'ph:trend-down' },
        { key: 'panicReduction', icon: 'ph:shield-check' },
        { key: 'gadImprovement', icon: 'ph:chart-line-up' }
      ]"
    />

    <!-- When & What Section -->
    <InfoWhenAndWhat
      i18n-key="guidedBreathing"
      :when-section="{
        icon: 'ph:calendar-check',
        color: 'blue',
        items: [
          { icon: 'ph:warning-circle', iconClass: 'text-red-500' },
          { icon: 'ph:moon-stars', iconClass: 'text-indigo-400' },
          { icon: 'ph:briefcase', iconClass: 'text-gray-500' },
          { icon: 'ph:repeat', iconClass: 'text-green-500' }
        ]
      }"
      :what-section="{
        icon: 'ph:trend-up',
        color: 'green',
        items: [
          { icon: 'ph:timer', iconClass: 'text-blue-400' },
          { icon: 'ph:heart-half', iconClass: 'text-red-400' },
          { icon: 'ph:brain', iconClass: 'text-purple-400' },
          { icon: 'ph:shield-check', iconClass: 'text-emerald-500' }
        ]
      }"
    />

    <!-- Tips Section -->
    <InfoTips
      i18n-key="guidedBreathing.tips"
      :tips="['technique', 'environment', 'progression']"
    />

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="guided-breathing" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.guidedBreathing.title"),
  description: () => t("meta.guidedBreathing.description"),
  ogTitle: () => t("meta.guidedBreathing.title"),
  ogDescription: () => t("meta.guidedBreathing.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>
