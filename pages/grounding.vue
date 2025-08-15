<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <Breadcrumb duration="3-5 min" />

    <!-- Exercise Component -->
    <GroundingExercise />

    <!-- Educational Content -->
    <!-- How It Works -->
    <section>
      <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
        <SectionHeader icon="ph:brain" color="green">
          {{ $t("grounding.howItWorks.title") }}
        </SectionHeader>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h3 class="mb-2 font-semibold text-gray-800 dark:text-slate-100">{{ $t("grounding.howItWorks.neurological.title") }}</h3>
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("grounding.howItWorks.neurological.description") }}
            </p>
            <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("grounding.howItWorks.neurological.awareness") }}
            </p>
          </div>
          <div>
            <h3 class="mb-2 font-semibold text-gray-800 dark:text-slate-100">{{ $t("grounding.howItWorks.stability.title") }}</h3>
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("grounding.howItWorks.stability.description") }}
            </p>
            <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("grounding.howItWorks.stability.grounding") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Scientific Background -->
    <section>
      <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
        <SectionHeader icon="ph:flask" color="purple">
          {{ $t("grounding.science.title") }}
        </SectionHeader>
        
        <div class="mb-4">
          <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300" v-html="$t('grounding.science.description')"></p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:gear" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("grounding.science.research.regulation.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('grounding.science.research.regulation.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:heart" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("grounding.science.research.anxiety.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('grounding.science.research.anxiety.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:shield-check" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800">{{ $t("grounding.science.research.stability.title") }}</span>
            </div>
            <p class="text-xs text-gray-600" v-html="$t('grounding.science.research.stability.description')"></p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="grid gap-8 md:grid-cols-2">
        <!-- When to Use -->
        <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
          <SectionHeader icon="ph:calendar-check" color="blue">
            {{ $t("grounding.whenToPractice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
            <li class="flex items-start">
              <Icon name="ph:lightning-fill" class="mr-2 mt-0.5 flex-shrink-0 text-red-500" />
              <span>{{ $t("grounding.whenToPractice.items.0") }}</span>
            </li>
            <li class="flex items-start">
              <Icon
                name="ph:cloud-lightning-fill"
                class="mr-2 mt-0.5 flex-shrink-0 text-orange-500"
              />
              <span>{{ $t("grounding.whenToPractice.items.1") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:ghost-fill" class="mr-2 mt-0.5 flex-shrink-0 text-purple-500" />
              <span>{{ $t("grounding.whenToPractice.items.2") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:warning-fill" class="mr-2 mt-0.5 flex-shrink-0 text-blue-500" />
              <span>{{ $t("grounding.whenToPractice.items.3") }}</span>
            </li>
          </ul>
        </div>

        <!-- What You'll Experience -->
        <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 p-6 transition-colors duration-200">
          <SectionHeader icon="ph:trend-up" color="green">
            {{ $t("grounding.whatYoullNotice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
            <li class="flex items-start">
              <Icon name="ph:timer-fill" class="mr-2 mt-0.5 flex-shrink-0 text-blue-400" />
              <span>{{ $t("grounding.whatYoullNotice.items.0") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:brain" class="mr-2 mt-0.5 flex-shrink-0 text-purple-400" />
              <span>{{ $t("grounding.whatYoullNotice.items.1") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:eye" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>{{ $t("grounding.whatYoullNotice.items.2") }}</span>
            </li>
            <li class="flex items-start">
              <Icon name="ph:shield-check" class="mr-2 mt-0.5 flex-shrink-0 text-green-400" />
              <span>{{ $t("grounding.whatYoullNotice.items.3") }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Tips Section -->
    <section>
      <div class="border border-indigo-200 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 p-6 transition-colors duration-200">
        <div class="mb-4 text-center">
          <Icon name="ph:lightbulb" class="mx-auto mb-2 text-2xl text-indigo-600 dark:text-indigo-400" />
          <h2 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("grounding.bestResults.title") }}</h2>
        </div>
        <div class="grid gap-4 text-sm md:grid-cols-3">
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("grounding.bestResults.timing.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("grounding.bestResults.timing.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("grounding.bestResults.detail.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("grounding.bestResults.detail.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600 dark:text-indigo-400">{{ $t("grounding.bestResults.practice.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("grounding.bestResults.practice.description") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="grounding" />
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
