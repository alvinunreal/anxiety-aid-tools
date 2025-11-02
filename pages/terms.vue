<template>
  <div class="mybg transition-colors duration-300">
    <main id="main-content" tabindex="-1">
      <div class="py-8 pt-20">
        <div class="mx-auto max-w-4xl sektion">
          <h1 class="mb-6 text-4xl font-bold text-gray-800 dark:text-slate-100">
            {{ $t("terms.title") }}
          </h1>

          <p class="text-sm text-gray-500 dark:text-slate-400 mb-8">
            {{ $t("terms.lastUpdated") }}: {{ $t("terms.date") }}
          </p>

          <div class="space-y-8 text-gray-700 dark:text-slate-300">

            <!-- Acceptance -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("terms.acceptance.title") }}
              </h2>
              <p class="leading-relaxed">{{ $t("terms.acceptance.description") }}</p>
            </div>

            <!-- Medical Disclaimer -->
            <div class="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-4">
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("terms.medicalDisclaimer.title") }}
              </h2>
              <p class="leading-relaxed">{{ $t("terms.medicalDisclaimer.description") }}</p>
            </div>

            <!-- Use License -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("terms.license.title") }}
              </h2>
              <p class="leading-relaxed mb-2">{{ $t("terms.license.description") }}</p>
              <ul class="list-disc list-inside space-y-1 pl-4">
                <li v-for="item in $tm('terms.license.items')" :key="item">
                  {{ $rt(item) }}
                </li>
              </ul>
            </div>

            <!-- Liability -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("terms.liability.title") }}
              </h2>
              <p class="leading-relaxed">{{ $t("terms.liability.description") }}</p>
            </div>

            <!-- Open Source -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("terms.opensource.title") }}
              </h2>
              <p class="leading-relaxed">
                {{ $t("terms.opensource.description") }}
                <a
                  href="https://github.com/alvinunreal/anxiety-aid-tools"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  class="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {{ $t("terms.opensource.link") }}
                </a>
              </p>
            </div>

            <!-- Changes -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("terms.changes.title") }}
              </h2>
              <p class="leading-relaxed">{{ $t("terms.changes.description") }}</p>
            </div>

            <!-- Contact -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("terms.contact.title") }}
              </h2>
              <p class="leading-relaxed">
                {{ $t("terms.contact.description") }}
                <a
                  href="https://github.com/alvinunreal/anxiety-aid-tools/discussions"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  class="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {{ $t("terms.contact.link") }}
                </a>
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
  title: () => t("meta.terms.title"),
  description: () => t("meta.terms.description"),
  robots: "noindex, nofollow"
});
</script>
