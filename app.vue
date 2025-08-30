<script setup lang="ts">
const isLoading = ref(true);

onMounted(() => {
  nextTick(() => {
    isLoading.value = false;
  });
});
</script>

<template>
  <VitePwaManifest />
  <div class="relative">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-300 dark:bg-gray-900"
    ></div>
    <NuxtLayout>
      <div>
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>
