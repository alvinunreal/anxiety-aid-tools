<template>
  <div class="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 transition-colors duration-300">
    <Breadcrumb duration="12-15 min" />

    <main id="main-content" tabindex="-1">

    <!-- Exercise Component -->
    <ProgressiveMuscleRelaxationExercise />

    <!-- Why It Works Section -->
    <section>
      <!-- How PMR Helps -->
      <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 transition-colors duration-200 p-6">
        <div>
          <SectionHeader icon="ph:heart-fill" color="indigo">
            {{ $t("progressiveMuscleRelaxation.howItWorks.title") }}
          </SectionHeader>
          <div class="px-1">
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("progressiveMuscleRelaxation.howItWorks.description") }}
            </p>
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("progressiveMuscleRelaxation.howItWorks.physiology") }}
            </p>
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("progressiveMuscleRelaxation.howItWorks.awareness") }}
            </p>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 transition-colors duration-200 p-4">
                <div class="mb-2 flex items-center">
                  <Icon name="ph:lightning" class="mr-2 text-indigo-600 dark:text-indigo-400" />
                  <span class="font-medium text-gray-800 dark:text-slate-100">{{ $t("progressiveMuscleRelaxation.howItWorks.tension.title") }}</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-slate-300">
                  {{ $t("progressiveMuscleRelaxation.howItWorks.tension.description") }}
                </p>
              </div>
              <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 transition-colors duration-200 p-4">
                <div class="mb-2 flex items-center">
                  <Icon name="ph:hand-peace" class="mr-2 text-indigo-600 dark:text-indigo-400" />
                  <span class="font-medium text-gray-800 dark:text-slate-100">{{ $t("progressiveMuscleRelaxation.howItWorks.release.title") }}</span>
                </div>
                <p class="text-xs text-gray-600 dark:text-slate-300">
                  {{ $t("progressiveMuscleRelaxation.howItWorks.release.description") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scientific Background -->
    <section>
      <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 transition-colors duration-200 p-6">
        <SectionHeader icon="ph:flask" color="purple">
          {{ $t("progressiveMuscleRelaxation.science.title") }}
        </SectionHeader>
        
        <div class="mb-4">
          <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300" v-html="$t('progressiveMuscleRelaxation.science.description')"></p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 transition-colors duration-200">
            <div class="mb-2 flex items-center">
              <Icon name="ph:heart" class="mr-2 text-purple-600 dark:text-purple-400" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("progressiveMuscleRelaxation.science.research.anxiety.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300" v-html="$t('progressiveMuscleRelaxation.science.research.anxiety.description')"></p>
          </div>
          
          <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 transition-colors duration-200">
            <div class="mb-2 flex items-center">
              <Icon name="ph:hospital" class="mr-2 text-purple-600 dark:text-purple-400" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("progressiveMuscleRelaxation.science.research.medical.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300" v-html="$t('progressiveMuscleRelaxation.science.research.medical.description')"></p>
          </div>
          
          <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 transition-colors duration-200">
            <div class="mb-2 flex items-center">
              <Icon name="ph:calendar-plus" class="mr-2 text-purple-600 dark:text-purple-400" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("progressiveMuscleRelaxation.science.research.longterm.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300" v-html="$t('progressiveMuscleRelaxation.science.research.longterm.description')"></p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="grid gap-8 md:grid-cols-2">
        <!-- When to Use -->
        <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 transition-colors duration-200 p-6">
          <SectionHeader icon="ph:calendar-check" color="blue">
            {{ $t("progressiveMuscleRelaxation.whenToPractice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
            <li class="flex items-start" v-for="(item, index) in $tm('progressiveMuscleRelaxation.whenToPractice.items')" :key="item">
              <Icon :name="['ph:moon', 'ph:lightning-slash', 'ph:brain', 'ph:shield-check'][index]" :class="[['text-blue-400', 'text-purple-400', 'text-green-400', 'text-orange-400'][index], 'mr-2 mt-0.5 flex-shrink-0']" />
              <span>{{ $rt(item) }}</span>
            </li>
          </ul>
        </div>

        <!-- What You'll Experience -->
        <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 transition-colors duration-200 p-6">
          <SectionHeader icon="ph:trend-up" color="green">
            {{ $t("progressiveMuscleRelaxation.whatYoullNotice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
            <li class="flex items-start" v-for="(item, index) in $tm('progressiveMuscleRelaxation.whatYoullNotice.items')" :key="item">
              <Icon :name="['ph:timer-fill', 'ph:brain', 'ph:heart', 'ph:shield-check'][index]" :class="[['text-blue-400', 'text-purple-400', 'text-red-400', 'text-green-400'][index], 'mr-2 mt-0.5 flex-shrink-0']" />
              <span>{{ $rt(item) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Tips Section -->
    <section>
      <div class="border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 p-6 transition-colors duration-200">
        <div class="mb-4 text-center">
          <Icon name="ph:lightbulb" class="mx-auto mb-2 text-2xl text-indigo-600 dark:text-indigo-400" />
          <h2 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("progressiveMuscleRelaxation.bestResults.title") }}</h2>
        </div>
        <div class="grid gap-4 text-sm md:grid-cols-3">
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("progressiveMuscleRelaxation.bestResults.environment.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("progressiveMuscleRelaxation.bestResults.environment.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("progressiveMuscleRelaxation.bestResults.tension.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("progressiveMuscleRelaxation.bestResults.tension.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("progressiveMuscleRelaxation.bestResults.consistency.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("progressiveMuscleRelaxation.bestResults.consistency.description") }}
            </p>
          </div>
        </div>
      </div>
    </section>

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
