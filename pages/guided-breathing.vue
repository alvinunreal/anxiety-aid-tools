<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 dark:from-slate-800 dark:via-slate-900 dark:to-black">
    <Breadcrumb duration="3-5 min" />

    <!-- Exercise Component -->
    <GuidedBreathingExercise />
    <!-- Why It Works Section -->
    <section>
      <!-- Technique Overview -->
      <div class="mb-6 grid gap-6 md:grid-cols-2">
        <div class="border border-blue-200 bg-blue-50 p-6 dark:bg-blue-900/10 dark:border-blue-500/20">
          <div>
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:squares-four" class="flex-shrink-0 text-2xl text-blue-600" />
              <h2 class="font-semibold text-gray-800 dark:text-gray-200">{{ $t("guidedBreathing.techniquesOverview.boxBreathing.title") }}</h2>
            </div>
            <div class="px-1">
              <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                {{ $t("guidedBreathing.techniquesOverview.boxBreathing.description") }}
              </p>
              <div class="text-xs font-medium text-blue-600 dark:text-blue-400">
                {{ $t("guidedBreathing.techniquesOverview.boxBreathing.bestFor") }}
              </div>
            </div>
          </div>
        </div>

        <div class="border border-purple-200 bg-purple-50 p-6 dark:bg-purple-900/10 dark:border-purple-500/20">
          <div>
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:moon-stars" class="flex-shrink-0 text-2xl text-purple-600" />
              <h2 class="font-semibold text-gray-800 dark:text-gray-200">{{ $t("guidedBreathing.techniquesOverview.calming.title") }}</h2>
            </div>
            <div class="px-1">
              <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                {{ $t("guidedBreathing.techniquesOverview.calming.description") }}
              </p>
              <div class="text-xs font-medium text-purple-600 dark:text-purple-400">
                {{ $t("guidedBreathing.techniquesOverview.calming.bestFor") }}
              </div>
            </div>
          </div>
        </div>

        <div class="border border-green-200 bg-green-50 p-6 dark:bg-green-900/10 dark:border-green-500/20">
          <div>
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:lightning" class="flex-shrink-0 text-2xl text-green-600" />
              <h2 class="font-semibold text-gray-800 dark:text-gray-200">{{ $t("guidedBreathing.techniquesOverview.energizing.title") }}</h2>
            </div>
            <div class="px-1">
              <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                {{ $t("guidedBreathing.techniquesOverview.energizing.description") }}
              </p>
              <div class="text-xs font-medium text-green-600 dark:text-green-400">
                {{ $t("guidedBreathing.techniquesOverview.energizing.bestFor") }}
              </div>
            </div>
          </div>
        </div>

        <div class="border border-orange-200 bg-orange-50 p-6 dark:bg-orange-900/10 dark:border-orange-500/20">
          <div>
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:clock" class="flex-shrink-0 text-2xl text-orange-600" />
              <h2 class="font-semibold text-gray-800 dark:text-gray-200">{{ $t("guidedBreathing.techniquesOverview.quickReset.title") }}</h2>
            </div>
            <div class="px-1">
              <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                {{ $t("guidedBreathing.techniquesOverview.quickReset.description") }}
              </p>
              <div class="text-xs font-medium text-orange-600 dark:text-orange-400">
                {{ $t("guidedBreathing.techniquesOverview.quickReset.bestFor") }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- How It Works -->
      <div class="border border-gray-200 bg-white/60 p-6 dark:bg-slate-800/20 dark:border-slate-700">
        <div>
          <SectionHeader icon="ph:brain" color="gray">
            {{ $t("guidedBreathing.howItWorks.title") }}
          </SectionHeader>
          <div class="px-1">
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              {{ $t("guidedBreathing.howItWorks.description1") }}
            </p>
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              {{ $t("guidedBreathing.howItWorks.description2") }}
            </p>
            <div class="mt-4 grid gap-4 md:grid-cols-3">
              <div class="border border-gray-200 bg-white/60 p-3 dark:bg-slate-700/20 dark:border-slate-600">
                <div class="mb-1 flex items-center">
                  <Icon name="ph:target" class="mr-2 text-gray-600" />
                  <span class="text-xs font-medium text-gray-800 dark:text-gray-200">{{ $t("guidedBreathing.howItWorks.focusedAttention.title") }}</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400">
                  {{ $t("guidedBreathing.howItWorks.focusedAttention.description") }}
                </p>
              </div>
              <div class="border border-gray-200 bg-white/60 p-3 dark:bg-slate-700/20 dark:border-slate-600">
                <div class="mb-1 flex items-center">
                  <Icon name="ph:activity" class="mr-2 text-gray-600" />
                  <span class="text-xs font-medium text-gray-800 dark:text-gray-200">{{ $t("guidedBreathing.howItWorks.nervousSystem.title") }}</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400">
                  {{ $t("guidedBreathing.howItWorks.nervousSystem.description") }}
                </p>
              </div>
              <div class="border border-gray-200 bg-white/60 p-3 dark:bg-slate-700/20 dark:border-slate-600">
                <div class="mb-1 flex items-center">
                  <Icon name="ph:repeat" class="mr-2 text-gray-600" />
                  <span class="text-xs font-medium text-gray-800 dark:text-gray-200">{{ $t("guidedBreathing.howItWorks.skillBuilding.title") }}</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400">
                  {{ $t("guidedBreathing.howItWorks.skillBuilding.description") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scientific Background -->
    <section>
      <div class="border border-gray-200 bg-white/60 p-6 dark:bg-slate-800/20 dark:border-slate-700">
        <SectionHeader icon="ph:flask" color="purple">
          {{ $t("guidedBreathing.science.title") }}
        </SectionHeader>
        
        <div class="mb-4">
          <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-400" v-html="$t('guidedBreathing.science.description')"></p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="border border-purple-200 bg-purple-50 p-4 dark:bg-purple-900/10 dark:border-purple-500/20">
            <div class="mb-2 flex items-center">
              <Icon name="ph:trend-up" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ $t("guidedBreathing.science.research.effectiveness.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400" v-html="$t('guidedBreathing.science.research.effectiveness.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4 dark:bg-purple-900/10 dark:border-purple-500/20">
            <div class="mb-2 flex items-center">
              <Icon name="ph:hospital" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ $t("guidedBreathing.science.research.clinical.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400" v-html="$t('guidedBreathing.science.research.clinical.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4 dark:bg-purple-900/10 dark:border-purple-500/20">
            <div class="mb-2 flex items-center">
              <Icon name="ph:calendar-plus" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ $t("guidedBreathing.science.research.longterm.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400" v-html="$t('guidedBreathing.science.research.longterm.description')"></p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="grid gap-8 md:grid-cols-2">
        <!-- When to Use -->
        <div class="border border-gray-200 bg-white/60 p-6 dark:bg-slate-800/20 dark:border-slate-700">
          <SectionHeader icon="ph:calendar-check" color="blue">
            {{ $t("guidedBreathing.whenToPractice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-400">
            <li class="flex items-start">
              <Icon name="ph:sun" class="mr-2 mt-0.5 flex-shrink-0 text-yellow-500" />
              <span>{{ $t("guidedBreathing.whenToPractice.items.0") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:briefcase" class="mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
              <span>{{ $t("guidedBreathing.whenToPractice.items.1") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:clock-afternoon" class="mr-2 mt-0.5 flex-shrink-0 text-orange-400" />
              <span>{{ $t("guidedBreathing.whenToPractice.items.2") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:moon" class="mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
              <span>{{ $t("guidedBreathing.whenToPractice.items.3") }}</span>
            </li>
          </ul>
        </div>

        <!-- What You'll Experience -->
        <div class="border border-gray-200 bg-white/60 p-6 dark:bg-slate-800/20 dark:border-slate-700">
          <SectionHeader icon="ph:trend-up" color="green">
            {{ $t("guidedBreathing.whatYoullNotice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-400">
            <li class="flex items-start">
              <Icon name="ph:timer-fill" class="mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
              <span>{{ $t("guidedBreathing.whatYoullNotice.items.0") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:brain" class="mr-2 mt-0.5 flex-shrink-0 text-purple-400" />
              <span>{{ $t("guidedBreathing.whatYoullNotice.items.1") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:heart" class="mr-2 mt-0.5 flex-shrink-0 text-red-400" />
              <span>{{ $t("guidedBreathing.whatYoullNotice.items.2") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:shield-check" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>{{ $t("guidedBreathing.whatYoullNotice.items.3") }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Tips Section -->
    <section>
      <div class="border border-indigo-200 bg-indigo-50 p-6 dark:bg-indigo-900/10 dark:border-indigo-500/20">
        <div class="mb-4 text-center">
          <Icon name="ph:lightbulb" class="mx-auto mb-2 text-2xl text-indigo-600" />
          <h2 class="font-semibold text-gray-800 dark:text-gray-200">{{ $t("guidedBreathing.tips.title") }}</h2>
        </div>
        <div class="grid gap-4 text-sm md:grid-cols-3">
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("guidedBreathing.tips.posture.title") }}</div>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("guidedBreathing.tips.posture.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("guidedBreathing.tips.environment.title") }}</div>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("guidedBreathing.tips.environment.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("guidedBreathing.tips.consistency.title") }}</div>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("guidedBreathing.tips.consistency.description") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="guided-breathing" />
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
