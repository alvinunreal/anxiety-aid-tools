<template>
  <div class="mybg transition-colors duration-300">
    <main id="main-content" tabindex="-1">
      <div class="py-8 pt-20">
        <div class="mx-auto max-w-3xl sektion">
          <h1 class="mb-2 text-3xl font-bold text-gray-800 dark:text-slate-100 text-center">
            {{ $t("mobile.title") }}
          </h1>
          <p class="text-sm text-gray-600 dark:text-slate-300 mb-6 text-center">
            {{ $t("mobile.description") }}
          </p>

          <div class="space-y-4">
            <!-- iOS Section -->
            <div class="border border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 p-4 transition-colors duration-200">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <Icon name="ph:apple-logo-fill" class="text-3xl text-gray-800 dark:text-slate-100 flex-shrink-0" />
                  <div class="min-w-0">
                    <h2 class="text-lg font-semibold text-gray-800 dark:text-slate-100">
                      {{ $t("mobile.ios.title") }}
                    </h2>
                    <p class="text-xs text-gray-600 dark:text-slate-400">
                      {{ $t("mobile.ios.subtitle") }}
                    </p>
                  </div>
                </div>
                <a
                  href="https://apps.apple.com/app/anxiety-aid-tools/id6738602906"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  class="w-full sm:w-40 flex-shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <Icon name="ph:download-simple" class="text-base" />
                  <span class="truncate">{{ $t("mobile.ios.button") }}</span>
                </a>
              </div>
            </div>

            <!-- Android Section -->
            <div class="border border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 transition-colors duration-200">
              <div class="p-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                  <div class="flex items-center gap-3 min-w-0">
                    <Icon name="ph:android-logo-fill" class="text-3xl text-green-600 dark:text-green-400 flex-shrink-0" />
                    <div class="min-w-0">
                      <h2 class="text-lg font-semibold text-gray-800 dark:text-slate-100">
                        {{ $t("mobile.android.title") }}
                      </h2>
                      <p class="text-xs text-gray-600 dark:text-slate-400">
                        {{ $t("mobile.android.subtitle") }}
                      </p>
                    </div>
                  </div>
                  <a
                    href="/AnxietyAidTools_v1.0.0.apk"
                    download
                    class="w-full sm:w-40 flex-shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <Icon name="ph:download-simple" class="text-base" />
                    <span class="truncate">{{ $t("mobile.android.button") }}</span>
                  </a>
                </div>

                <!-- Status Note -->
                <div class="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border-l-2 border-amber-500 px-3 py-2 mb-3">
                  <Icon name="ph:info" class="text-amber-600 dark:text-amber-400 text-sm flex-shrink-0 mt-0.5" />
                  <p class="text-xs text-gray-700 dark:text-slate-300">
                    <span class="font-medium">{{ $t("mobile.android.status.title") }}:</span> {{ $t("mobile.android.status.description") }}
                  </p>
                </div>

                <!-- Installation Instructions -->
                <details class="border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/30 transition-colors duration-200">
                  <summary class="cursor-pointer text-xs text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium px-3 py-2">
                    {{ $t("mobile.android.instructions.title") }}
                  </summary>
                  <div class="px-3 pb-3 pt-1">
                    <ol class="space-y-2 text-xs text-gray-600 dark:text-slate-400">
                      <li v-for="(step, index) in $tm('mobile.android.instructions.steps')" :key="index" class="flex gap-2">
                        <span class="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-slate-300 flex items-center justify-center text-[10px] font-semibold">{{ index + 1 }}</span>
                        <span class="flex-1 pt-0.5">{{ $rt(step) }}</span>
                      </li>
                    </ol>
                  </div>
                </details>
              </div>
            </div>

            <!-- Screenshots Gallery -->
            <div class="border border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 p-4 transition-colors duration-200">
              <h3 class="text-sm font-semibold text-gray-800 dark:text-slate-100 mb-3 text-center">{{ $t("mobile.screenshots.title") }}</h3>
              <div class="overflow-x-auto -mx-4 px-4 pb-2">
                <div class="flex gap-3 min-w-min">
                  <div v-for="i in 7" :key="i" class="flex-shrink-0 w-32 sm:w-36">
                    <img
                      :src="`/ios/${1342 + i}.png`"
                      :alt="`App Screenshot ${i}`"
                      class="w-full h-auto rounded border border-gray-300 dark:border-slate-600 shadow-sm hover:shadow-md transition-shadow duration-200"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <p class="text-xs text-gray-500 dark:text-slate-400 text-center mt-2">{{ $t("mobile.screenshots.hint") }}</p>
            </div>

            <!-- Bottom Info Grid -->
            <div class="space-y-3 mt-6">
              <!-- Features -->
              <div class="border border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 p-3 transition-colors duration-200">
                <h3 class="text-sm font-semibold text-gray-800 dark:text-slate-100 mb-2">{{ $t("mobile.features.title") }}</h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-slate-400">
                  <li v-for="feature in $tm('mobile.features.items')" :key="feature" class="flex items-start gap-1.5">
                    <Icon name="ph:check" class="text-green-600 dark:text-green-400 text-sm flex-shrink-0 mt-0.5" />
                    <span>{{ $rt(feature) }}</span>
                  </li>
                </ul>
              </div>

              <!-- Privacy & Support Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="border border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 p-3 transition-colors duration-200">
                  <div class="flex items-start gap-2">
                    <Icon name="ph:shield-check" class="text-green-600 dark:text-green-400 text-sm flex-shrink-0 mt-0.5" />
                    <div class="text-xs">
                      <p class="font-semibold text-gray-800 dark:text-slate-100 mb-0.5">{{ $t("mobile.privacy.title") }}</p>
                      <p class="text-gray-600 dark:text-slate-400">{{ $t("mobile.privacy.description") }}</p>
                    </div>
                  </div>
                </div>

                <div class="border border-gray-200 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 p-3 transition-colors duration-200">
                  <p class="text-xs text-gray-600 dark:text-slate-400 mb-1.5">
                    {{ $t("mobile.support.description") }}
                  </p>
                  <NuxtLink
                    :to="localePath('/support')"
                    class="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {{ $t("mobile.support.link") }}
                    <Icon name="ph:arrow-right" class="text-xs" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { t, tm, rt } = useI18n();
const localePath = useLocalePath();

useSeoMeta({
  title: () => t("meta.mobile.title"),
  description: () => t("meta.mobile.description"),
  ogTitle: () => t("meta.mobile.title"),
  ogDescription: () => t("meta.mobile.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>
