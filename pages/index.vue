<template>
  <div class="mybg">
    <!-- Hero Section -->
    <section class="py-8 pt-20">
      <div class="mx-auto max-w-6xl text-center">
        <h1 class="mb-3 text-4xl font-bold text-gray-800 md:text-5xl dark:text-gray-200">
          {{ $t("hero.title") }}
        </h1>
        <p class="mx-auto mb-6 max-w-2xl text-base text-gray-600 dark:text-gray-400">
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
          <div class="border border-amber-200 bg-amber-50 p-4 dark:bg-amber-900/10 dark:border-amber-500/20">
            <div>
              <div class="flex items-center justify-start gap-2 mb-2">
                <Icon name="ph:warning-fill" class="flex-shrink-0 text-lg text-amber-600" />
                <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                  {{ $t("about.whatHappens.title") }}
                </h3>
              </div>
              <p class="text-sm leading-relaxed text-gray-700 px-1 dark:text-gray-400">
                {{ $t("about.whatHappens.description") }}
              </p>
            </div>
          </div>

          <div class="border border-green-200 bg-green-50 p-4 dark:bg-green-900/10 dark:border-green-500/20">
            <div>
              <div class="flex items-center justify-start gap-2 mb-2">
                <Icon
                  name="ph:check-circle-fill"
                  class="flex-shrink-0 text-lg text-green-600"
                />
                <h3 class="font-semibold text-gray-800 dark:text-gray-200">{{ $t("about.howHelp.title") }}</h3>
              </div>
              <p class="text-sm leading-relaxed text-gray-700 px-1 dark:text-gray-400">
                {{ $t("about.howHelp.description") }}
              </p>
            </div>
          </div>

        </div>

        <div class="border border-blue-200 bg-blue-50 p-4 dark:bg-blue-900/10 dark:border-blue-500/20">
          <div>
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon
                name="ph:lightbulb-fill"
                class="flex-shrink-0 text-lg text-blue-600"
              />
              <h3 class="font-semibold text-gray-800 dark:text-gray-200">{{ $t("about.tips.title") }}</h3>
            </div>
            <ul class="list-inside list-disc space-y-1 text-sm text-gray-700 px-1 dark:text-gray-400">
              <li v-for="tip in $tm('about.tips.items')" :key="tip">{{ $rt(tip) }}</li>
            </ul>
          </div>
        </div>

      </div>
    </section>

    <!-- Resources Section -->
    <section id="resources" class="!mb-0 py-12 pb-24">
      <div class="mx-auto max-w-6xl">
        <h2 class="ptitle dark:text-gray-200">{{ $t("resources.title") }}</h2>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="border border-gray-200 bg-white bg-opacity-80 p-4 dark:bg-slate-800/20 dark:border-slate-700">
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:user-circle-fill" class="flex-shrink-0 text-lg text-blue-600" />
              <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                {{ $t("resources.professional.title") }}
              </h3>
            </div>
            <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">
              {{ $t("resources.professional.description") }}
            </p>
            <ul class="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-400">
              <li v-for="sign in $tm('resources.professional.signs')" :key="sign">
                {{ $rt(sign) }}
              </li>
            </ul>
          </div>

          <div class="border border-gray-200 bg-white bg-opacity-80 p-4 dark:bg-slate-800/20 dark:border-slate-700">
            <div class="flex items-center justify-start gap-2 mb-2">
              <Icon name="ph:buildings-fill" class="flex-shrink-0 text-lg text-green-600" />
              <h3 class="font-semibold text-gray-800 dark:text-gray-200">{{ $t("resources.organizations.title") }}</h3>
            </div>
            <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">
              {{ $t("resources.organizations.description") }}
            </p>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-400">
              <li v-for="org in $tm('resources.organizations.list')" :key="org.name">
                <div>
                  <a :href="$rt(org.url)" target="_blank" rel="noopener noreferrer nofollow" class="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-100 dark:text-blue-400 dark:hover:text-blue-300">
                    {{ $rt(org.name) }}
                  </a>
                  <p class="text-gray-600 mt-1 dark:text-gray-500">{{ $rt(org.description) }}</p>
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
