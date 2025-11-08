<script setup>
const head = useLocaleHead()
</script>

<template>
  <div class="min-h-screen bg-white">
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <Head>
        <template v-for="link in head.link" :key="link.key">
          <Link :id="link.key" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.key">
          <Meta :id="meta.key" :property="meta.property" :content="meta.content" />
        </template>
      </Head>
      <Body>
        <MobileAppBanner />
        <AppHeader />
        <main>
          <div class="">
            <slot />
          </div>
        </main>
        <AppFooter />
      </Body>
    </Html>
  </div>
</template>