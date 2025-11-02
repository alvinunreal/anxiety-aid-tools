<template>
  <div class="mybg transition-colors duration-300">
    <main id="main-content" tabindex="-1">
      <div class="py-8 pt-20">
        <div class="mx-auto max-w-4xl sektion">
          <h1 class="mb-6 text-4xl font-bold text-gray-800 dark:text-slate-100">
            {{ $t("support.title") }}
          </h1>

          <p class="text-lg text-gray-600 dark:text-slate-300 mb-8">
            {{ $t("support.description") }}
          </p>

          <div class="space-y-8">

            <!-- About -->
            <div class="border border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 p-6 transition-colors duration-200">
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("support.about.title") }}
              </h2>
              <p class="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
                {{ $t("support.about.description") }}
              </p>
              <p class="text-gray-700 dark:text-slate-300 leading-relaxed">
                {{ $t("support.about.available") }}
              </p>
            </div>

            <!-- Features -->
            <div class="border border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 p-6 transition-colors duration-200">
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("support.features.title") }}
              </h2>
              <ul class="space-y-2 text-gray-700 dark:text-slate-300">
                <li v-for="feature in $tm('support.features.items')" :key="feature" class="flex items-start gap-2">
                  <Icon name="ph:check-circle-fill" class="text-green-600 dark:text-green-400 text-lg flex-shrink-0 mt-0.5" />
                  <span>{{ $rt(feature) }}</span>
                </li>
              </ul>
            </div>

            <!-- Getting Help -->
            <div class="border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-6 transition-colors duration-200">
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("support.help.title") }}
              </h2>
              <p class="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
                {{ $t("support.help.description") }}
              </p>
              <div class="space-y-3">
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-slate-100 mb-1">
                    {{ $t("support.help.website.title") }}
                  </h3>
                  <a
                    href="https://anxietyaidtools.com"
                    class="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    anxietyaidtools.com
                  </a>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-slate-100 mb-1">
                    {{ $t("support.help.github.title") }}
                  </h3>
                  <a
                    href="https://github.com/alvinunreal/anxiety-aid-tools/discussions"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    class="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {{ $t("support.help.github.link") }}
                  </a>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-slate-100 mb-1">
                    {{ $t("support.help.bugs.title") }}
                  </h3>
                  <a
                    href="https://github.com/alvinunreal/anxiety-aid-tools/issues"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    class="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {{ $t("support.help.bugs.link") }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Common Questions -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-4">
                {{ $t("support.questions.title") }}
              </h2>
              <div class="space-y-4">
                <div
                  v-for="(item, index) in $tm('support.questions.items')"
                  :key="index"
                  class="border border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 p-4 transition-colors duration-200"
                >
                  <h3 class="font-semibold text-gray-800 dark:text-slate-100 mb-2">
                    {{ $rt(item.q) }}
                  </h3>
                  <p class="text-gray-700 dark:text-slate-300 leading-relaxed text-sm">
                    {{ $rt(item.a) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Medical Disclaimer -->
            <div class="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-6">
              <h2 class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("support.disclaimer.title") }}
              </h2>
              <p class="text-gray-700 dark:text-slate-300 leading-relaxed text-sm">
                {{ $t("support.disclaimer.text") }}
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { t, tm, rt } = useI18n();

useSeoMeta({
  title: () => t("meta.support.title"),
  description: () => t("meta.support.description"),
});
</script>
