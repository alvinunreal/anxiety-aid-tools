<template>
  <div class="mybg transition-colors duration-300">
    <!-- Hero Section -->
    <section class="py-8 pt-20">
      <div class="mx-auto max-w-6xl text-center">
        <h1 class="mb-3 text-4xl font-bold text-gray-800 dark:text-slate-100 md:text-5xl transition-colors duration-200">
          {{ $t("hero.title") }}
        </h1>
        <p class="mx-auto mb-6 max-w-2xl text-base text-gray-600 dark:text-slate-300 transition-colors duration-200">
          {{ $t("hero.description") }}
        </p>
      </div>
    </section>

    <!-- All Techniques Section -->
    <section id="techniques" class="">
      <div class="mx-auto max-w-6xl">
        <TechniquesGrid :techniques="allTechniques" />
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="pt-12">
      <div class="mx-auto max-w-6xl">
        <h2 class="ptitle">{{ $t("about.title") }}</h2>

        <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4 transition-colors duration-200">
            <div>
              <div class="flex items-center justify-start gap-2 mb-2">
                <Icon name="ph:warning-fill" class="flex-shrink-0 text-lg text-amber-600 dark:text-amber-400" />
                <h3 class="font-semibold text-gray-800 dark:text-slate-100">
                  {{ $t("about.whatHappens.title") }}
                </h3>
              </div>
              <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300 px-1">
                {{ $t("about.whatHappens.description") }}
              </p>
            </div>
          </div>

          <div class="border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 p-4 transition-colors duration-200">
            <div>
              <div class="flex items-center justify-start gap-2 mb-2">
                <Icon
                  name="ph:check-circle-fill"
                  class="flex-shrink-0 text-lg text-green-600 dark:text-green-400"
                />
                <h3 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("about.howHelp.title") }}</h3>
              </div>
              <p class="text-sm leading-relaxed text-gray-700 dark:text-slate-300 px-1">
                {{ $t("about.howHelp.description") }}
              </p>
            </div>
          </div>

        </div>

        <div class="border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-4 transition-colors duration-200">
          <div>
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon
                name="ph:lightbulb-fill"
                class="flex-shrink-0 text-lg text-blue-600 dark:text-blue-400"
              />
              <h3 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("about.tips.title") }}</h3>
            </div>
            <ul class="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-slate-300 px-1">
              <li v-for="tip in $tm('about.tips.items')" :key="tip">{{ $rt(tip) }}</li>
            </ul>
          </div>
        </div>

      </div>
    </section>

    <!-- Resources Section -->
    <section id="resources" class="!mb-0 py-12 pb-24">
      <div class="mx-auto max-w-6xl">
        <h2 class="ptitle">{{ $t("resources.title") }}</h2>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="border border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 p-4 transition-colors duration-200">
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:user-circle-fill" class="flex-shrink-0 text-lg text-blue-600 dark:text-blue-400" />
              <h3 class="font-semibold text-gray-800 dark:text-slate-100">
                {{ $t("resources.professional.title") }}
              </h3>
            </div>
            <p class="mb-3 text-sm text-gray-700 dark:text-slate-300">
              {{ $t("resources.professional.description") }}
            </p>
            <ul class="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-slate-300">
              <li v-for="sign in $tm('resources.professional.signs')" :key="sign">
                {{ $rt(sign) }}
              </li>
            </ul>
          </div>

          <div class="border border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 p-4 transition-colors duration-200">
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:buildings-fill" class="flex-shrink-0 text-lg text-green-600 dark:text-green-400" />
              <h3 class="font-semibold text-gray-800 dark:text-slate-100">{{ $t("resources.organizations.title") }}</h3>
            </div>
            <p class="mb-3 text-sm text-gray-700 dark:text-slate-300">
              {{ $t("resources.organizations.description") }}
            </p>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-slate-300">
              <li v-for="org in $tm('resources.organizations.list')" :key="org.name">
                <div>
                  <a :href="$rt(org.url)" target="_blank" rel="noopener noreferrer nofollow" class="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                    {{ $rt(org.name) }}
                  </a>
                  <p class="text-gray-600 dark:text-slate-400 mt-1">{{ $rt(org.description) }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { allTechniques } = useTechniques();
const { t, tm, rt } = useI18n();

useSeoMeta({
  title: () => t("meta.home.title"),
  description: () => t("meta.home.description"),
  ogTitle: () => t("meta.home.title"),
  ogDescription: () => t("meta.home.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>
