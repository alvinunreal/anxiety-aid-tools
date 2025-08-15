<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 py-8 dark:from-slate-800 dark:via-slate-900 dark:to-black">
    <Breadcrumb duration="2-3 min" />

    <!-- Exercise Component -->
    <BreathingExercise />

    <!-- Educational Content -->
    <section>
      <!-- What happens in your body -->
      <div class="border border-gray-200 bg-white/60 p-6 dark:bg-slate-800/20 dark:border-slate-700">
        <div>
          <SectionHeader icon="ph:brain" color="gray">
            {{ $t("breathing.education.whatHappens.title") }}
          </SectionHeader>
          <div class="px-1">
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              {{ $t("breathing.education.whatHappens.description") }}
            </p>
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              {{ $t("breathing.education.whatHappens.benefits") }}
            </p>
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
              {{ $t("breathing.education.whatHappens.practice") }}
            </p>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <div class="border border-gray-200 bg-white/60 p-3 dark:bg-slate-700/20 dark:border-slate-600">
                <div class="mb-1 flex items-center">
                  <Icon name="ph:arrow-down" class="mr-2 text-cyan-600" />
                  <span class="text-xs font-medium text-gray-800 dark:text-gray-200">{{
                    $t("breathing.education.inhale.title")
                  }}</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400">
                  {{ $t("breathing.education.inhale.description") }}
                </p>
              </div>
              <div class="border border-gray-200 bg-white/60 p-3 dark:bg-slate-700/20 dark:border-slate-600">
                <div class="mb-1 flex items-center">
                  <Icon name="ph:arrow-up" class="mr-2 text-cyan-600" />
                  <span class="text-xs font-medium text-gray-800 dark:text-gray-200">{{
                    $t("breathing.education.exhale.title")
                  }}</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-gray-400">
                  {{ $t("breathing.education.exhale.description") }}
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
          {{ $t("breathing.education.science.title") }}
        </SectionHeader>
        
        <div class="mb-4">
          <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-400" v-html="$t('breathing.education.science.description')"></p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="border border-purple-200 bg-purple-50 p-4 dark:bg-purple-900/10 dark:border-purple-500/20">
            <div class="mb-2 flex items-center">
              <Icon name="ph:drop" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ $t("breathing.education.science.research.cortisol.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400" v-html="$t('breathing.education.science.research.cortisol.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4 dark:bg-purple-900/10 dark:border-purple-500/20">
            <div class="mb-2 flex items-center">
              <Icon name="ph:heart" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ $t("breathing.education.science.research.anxiety.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400" v-html="$t('breathing.education.science.research.anxiety.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4 dark:bg-purple-900/10 dark:border-purple-500/20">
            <div class="mb-2 flex items-center">
              <Icon name="ph:lightning" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ $t("breathing.education.science.research.vagal.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400" v-html="$t('breathing.education.science.research.vagal.description')"></p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="grid gap-8 md:grid-cols-2">
        <!-- When to Use -->
        <div class="border border-gray-200 bg-white/60 p-6 dark:bg-slate-800/20 dark:border-slate-700">
          <SectionHeader icon="ph:calendar-check" color="blue">
            {{ $t("breathing.education.whenToPractice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-400">
            <li class="flex items-start">
              <Icon name="ph:sun" class="mr-2 mt-0.5 flex-shrink-0 text-yellow-500" />
              <span>{{ $t("breathing.education.whenToPractice.items.0") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:briefcase" class="mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
              <span>{{ $t("breathing.education.whenToPractice.items.1") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:clock-afternoon" class="mr-2 mt-0.5 flex-shrink-0 text-orange-400" />
              <span>{{ $t("breathing.education.whenToPractice.items.2") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:moon" class="mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
              <span>{{ $t("breathing.education.whenToPractice.items.3") }}</span>
            </li>
          </ul>
        </div>

        <!-- What You'll Experience -->
        <div class="border border-gray-200 bg-white/60 p-6 dark:bg-slate-800/20 dark:border-slate-700">
          <SectionHeader icon="ph:trend-up" color="green">
            {{ $t("breathing.education.whatYoullNotice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-gray-400">
            <li class="flex items-start">
              <Icon name="ph:timer-fill" class="mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
              <span>{{ $t("breathing.education.whatYoullNotice.items.0") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:brain" class="mr-2 mt-0.5 flex-shrink-0 text-purple-400" />
              <span>{{ $t("breathing.education.whatYoullNotice.items.1") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:heart" class="mr-2 mt-0.5 flex-shrink-0 text-red-400" />
              <span>{{ $t("breathing.education.whatYoullNotice.items.2") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:shield-check" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>{{ $t("breathing.education.whatYoullNotice.items.3") }}</span>
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
          <h2 class="font-semibold text-gray-800 dark:text-gray-200">
            {{ $t("breathing.education.bestResults.title") }}
          </h2>
        </div>
        <div class="grid gap-4 text-sm md:grid-cols-3">
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">
              {{ $t("breathing.education.bestResults.posture.title") }}
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("breathing.education.bestResults.posture.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">
              {{ $t("breathing.education.bestResults.environment.title") }}
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("breathing.education.bestResults.environment.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">
              {{ $t("breathing.education.bestResults.consistency.title") }}
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              {{ $t("breathing.education.bestResults.consistency.description") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="breathing" />
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
