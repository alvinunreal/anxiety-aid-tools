<template>
  <div class="mybg transition-colors duration-300">
    <main id="main-content" tabindex="-1">
      <div class=" pt-20">
        <div class="mx-auto max-w-4xl sektion pb-8 !mb-0">
          <h1 class="mb-6 text-4xl font-bold text-gray-800 dark:text-slate-100">
            {{ $t("privacy.title") }}
          </h1>

          <p class="text-sm text-gray-500 dark:text-slate-400 mb-8">
            {{ $t("privacy.lastUpdated") }}: {{ $t("privacy.date") }}
          </p>

          <div class="space-y-8 text-gray-700 dark:text-slate-300">

            <!-- Overview -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("privacy.overview.title") }}
              </h2>
              <p class="leading-relaxed">{{ $t("privacy.overview.description") }}</p>
            </div>

            <!-- Data Collection -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("privacy.dataCollection.title") }}
              </h2>
              <div class="space-y-4">
                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-slate-100 mb-2">
                    {{ $t("privacy.dataCollection.noPersonalData.title") }}
                  </h3>
                  <p class="leading-relaxed">{{ $t("privacy.dataCollection.noPersonalData.description") }}</p>
                </div>

                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-slate-100 mb-2">
                    {{ $t("privacy.dataCollection.analytics.title") }}
                  </h3>
                  <p class="leading-relaxed mb-2">{{ $t("privacy.dataCollection.analytics.description") }}</p>
                  <ul class="list-disc list-inside space-y-1 text-sm pl-4">
                    <li v-for="item in $tm('privacy.dataCollection.analytics.items')" :key="item">
                      {{ $rt(item) }}
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-slate-100 mb-2">
                    {{ $t("privacy.dataCollection.localStorage.title") }}
                  </h3>
                  <p class="leading-relaxed">{{ $t("privacy.dataCollection.localStorage.description") }}</p>
                </div>
              </div>
            </div>

            <!-- Your Rights -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("privacy.rights.title") }}
              </h2>
              <p class="leading-relaxed">{{ $t("privacy.rights.description") }}</p>
            </div>

            <!-- Changes -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("privacy.changes.title") }}
              </h2>
              <p class="leading-relaxed">{{ $t("privacy.changes.description") }}</p>
            </div>

            <!-- Contact -->
            <div>
              <h2 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
                {{ $t("privacy.contact.title") }}
              </h2>
              <p class="leading-relaxed">
                {{ $t("privacy.contact.description") }}
                <a
                  href="https://github.com/alvinunreal/anxiety-aid-tools/discussions"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  class="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {{ $t("privacy.contact.link") }}
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
  title: () => t("meta.privacy.title"),
  description: () => t("meta.privacy.description"),
  robots: "noindex, nofollow"
});
</script>
