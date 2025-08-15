<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <Breadcrumb duration="5-10 min" />

    <!-- Exercise Component -->
    <ThoughtLabelingExercise />

    <!-- Educational Content -->
    <section class="mt-12 space-y-8">
      <!-- How It Works -->
      <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 transition-colors duration-200 p-6">
        <SectionHeader icon="ph:brain" color="indigo">
          {{ $t("thoughtLabeling.howItWorks.title") }}
        </SectionHeader>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h3 class="mb-2 font-semibold text-gray-800 dark:text-slate-100">{{ $t("thoughtLabeling.howItWorks.cognitive.title") }}</h3>
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("thoughtLabeling.howItWorks.cognitive.description") }}
            </p>
            <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("thoughtLabeling.howItWorks.cognitive.therapy") }}
            </p>
          </div>
          <div>
            <h3 class="mb-2 font-semibold text-gray-800 dark:text-slate-100">{{ $t("thoughtLabeling.howItWorks.pattern.title") }}</h3>
            <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("thoughtLabeling.howItWorks.pattern.description") }}
            </p>
            <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300">
              {{ $t("thoughtLabeling.howItWorks.pattern.benefits") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Scientific Background -->
    <section>
      <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 transition-colors duration-200 p-6">
        <SectionHeader icon="ph:flask" color="purple">
          {{ $t("thoughtLabeling.science.title") }}
        </SectionHeader>
        
        <div class="mb-4">
          <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300" v-html="$t('thoughtLabeling.science.description')"></p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:brain" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("thoughtLabeling.science.research.cognitive.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300" v-html="$t('thoughtLabeling.science.research.cognitive.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:lightning" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("thoughtLabeling.science.research.neurological.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300" v-html="$t('thoughtLabeling.science.research.neurological.description')"></p>
          </div>
          
          <div class="border border-purple-200 bg-purple-50 p-4">
            <div class="mb-2 flex items-center">
              <Icon name="ph:hospital" class="mr-2 text-purple-600" />
              <span class="text-sm font-medium text-gray-800 dark:text-slate-100">{{ $t("thoughtLabeling.science.research.clinical.title") }}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300" v-html="$t('thoughtLabeling.science.research.clinical.description')"></p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="grid gap-8 md:grid-cols-2">
        <!-- When to Use -->
        <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 transition-colors duration-200 p-6">
          <SectionHeader icon="ph:calendar-check" color="blue">
            {{ $t("thoughtLabeling.whenToPractice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
            <li v-for="(item, index) in $tm('thoughtLabeling.whenToPractice.items')" :key="index" class="flex items-start">
              <Icon 
                :name="['ph:cloud-lightning', 'ph:warning', 'ph:arrow-clockwise', 'ph:question'][index]" 
                :class="['text-amber-500', 'text-red-500', 'text-blue-500', 'text-purple-500'][index]" 
                class="mr-2 mt-0.5 flex-shrink-0" 
              />
              <span>{{ $rt(item) }}</span>
            </li>
          </ul>
        </div>

        <!-- What You'll Experience -->
        <div class="border border-gray-200 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60 transition-colors duration-200 p-6">
          <SectionHeader icon="ph:trend-up" color="green">
            {{ $t("thoughtLabeling.whatYoullNotice.title") }}
          </SectionHeader>
          <ul class="space-y-3 text-sm text-gray-700 dark:text-slate-300">
            <li v-for="(item, index) in $tm('thoughtLabeling.whatYoullNotice.items')" :key="index" class="flex items-start">
              <Icon 
                :name="['ph:eye', 'ph:chart-bar', 'ph:shield-check', 'ph:lightbulb'][index]" 
                :class="['text-indigo-400', 'text-purple-400', 'text-green-400', 'text-yellow-400'][index]" 
                class="mr-2 mt-0.5 flex-shrink-0" 
              />
              <span>{{ $rt(item) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Tips Section -->
    <section>
      <div class="border border-indigo-200 bg-indigo-50 p-6">
        <div class="mb-4 text-center">
          <Icon name="ph:lightbulb" class="mx-auto mb-2 text-2xl text-indigo-600" />
          <h2 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("thoughtLabeling.tips.title") }}</h2>
        </div>
        <div class="grid gap-4 text-sm md:grid-cols-3">
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("thoughtLabeling.tips.nonJudgmental.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("thoughtLabeling.tips.nonJudgmental.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("thoughtLabeling.tips.observe.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("thoughtLabeling.tips.observe.description") }}
            </p>
          </div>
          <div class="text-center">
            <div class="mb-1 font-medium text-indigo-600">{{ $t("thoughtLabeling.tips.practice.title") }}</div>
            <p class="text-gray-600 dark:text-slate-300">
              {{ $t("thoughtLabeling.tips.practice.description") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="thought-labeling" />
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
