import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  sourcemap: {
    client: false,
    server: false
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.VITE_BASE_URL || 'https://anxietyaidtools.com'
    }
  },

  nitro: {
    preset: "cloudflare_pages",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
    compressPublicAssets: true,
    logLevel: 4,
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true,
      failOnError: false,
      routes: ['/']
    }
  },
  vite: {
    server: {
      allowedHosts: true
    }
  },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/device",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    "@vite-pwa/nuxt",
  ],

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.ts",
    exposeConfig: false,
    viewer: true,
  },

  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

  image: {
    provider: process.env.NODE_ENV === 'production' ? 'ipxStatic' : 'ipx',
    quality: 80,
    format: ["webp"],
    domains: [],
    dir: 'public',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    densities: [1, 2],
    presets: {
      blog: {
        modifiers: {
          format: 'webp',
          quality: 80,
          width: 800,
          height: 450
        }
      }
    }
  },

  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
  },

  site: {
    url: 'https://anxietyaidtools.com',
    name: 'Anxiety Aid Tools',
  },

  ogImage: {
    enabled: true,
    defaults: {
      component: 'NuxtSeo',
    },
  },

  seo: {
    meta: {
      ogImage: 'https://anxietyaidtools.com/og.png',
      twitterCard: 'summary_large_image',
      themeColor: '#9333ea',
      robots: 'index, follow',
    }
  },

  schemaOrg: {
    identity: 'Organization',
  },

  i18n: {
    baseUrl: 'https://anxietyaidtools.com',
    compilation: {
      strictMessage: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      cookieCrossOrigin: false,
      cookieSecure: true
    },
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        files: [
          'en/navigation.json',
          'en/techniques.json',
          'en/pages.json',
          'en/meta.json',
          'en/legal.json',
          'en/breathing.json',
          'en/guided-breathing.json',
          'en/grounding.json',
          'en/peaceful-visualization.json',
          'en/progressive-muscle-relaxation.json',
          'en/sound-therapy.json',
          'en/stress-relief-bubbles.json',
          'en/thought-labeling.json',
          'en/fidget-spinner.json'
        ]
      },
      {
        code: 'fr',
        language: 'fr',
        name: 'Français',
        files: [
          'fr/navigation.json',
          'fr/techniques.json',
          'fr/pages.json',
          'fr/meta.json',
          'en/legal.json',
          'fr/breathing.json',
          'fr/guided-breathing.json',
          'fr/grounding.json',
          'fr/peaceful-visualization.json',
          'fr/progressive-muscle-relaxation.json',
          'fr/sound-therapy.json',
          'fr/stress-relief-bubbles.json',
          'fr/thought-labeling.json',
          'fr/fidget-spinner.json'
        ]
      },
      {
        code: 'pt',
        language: 'pt-BR',
        name: 'Português Brasileiro',
        files: [
          'pt/navigation.json',
          'pt/techniques.json',
          'pt/pages.json',
          'pt/meta.json',
          'en/legal.json',
          'pt/breathing.json',
          'pt/guided-breathing.json',
          'pt/grounding.json',
          'pt/peaceful-visualization.json',
          'pt/progressive-muscle-relaxation.json',
          'pt/sound-therapy.json',
          'pt/stress-relief-bubbles.json',
          'pt/thought-labeling.json',
          'pt/fidget-spinner.json'
        ]
      },
      {
        code: 'zh',
        language: 'zh-CN',
        name: '简体中文',
        files: [
          'zh/navigation.json',
          'zh/techniques.json',
          'zh/pages.json',
          'zh/meta.json',
          'en/legal.json',
          'zh/breathing.json',
          'zh/guided-breathing.json',
          'zh/grounding.json',
          'zh/peaceful-visualization.json',
          'zh/progressive-muscle-relaxation.json',
          'zh/sound-therapy.json',
          'zh/stress-relief-bubbles.json',
          'zh/thought-labeling.json',
          'zh/fidget-spinner.json'
        ]
      },
      {
        code: 'ru',
        language: 'ru',
        name: 'Русский',
        files: [
          'ru/navigation.json',
          'ru/techniques.json',
          'ru/pages.json',
          'ru/meta.json',
          'en/legal.json',
          'ru/breathing.json',
          'ru/guided-breathing.json',
          'ru/grounding.json',
          'ru/peaceful-visualization.json',
          'ru/progressive-muscle-relaxation.json',
          'ru/sound-therapy.json',
          'ru/stress-relief-bubbles.json',
          'ru/thought-labeling.json',
          'ru/fidget-spinner.json'
        ]
      },
      {
        code: 'he',
        language: 'he',
        name: 'Hebrew',
        files: [
          'he/navigation.json',
          'he/techniques.json',
          'he/pages.json',
          'he/meta.json',
          'en/legal.json',
          'he/breathing.json',
          'he/guided-breathing.json',
          'he/grounding.json',
          'he/peaceful-visualization.json',
          'he/progressive-muscle-relaxation.json',
          'he/sound-therapy.json',
          'he/stress-relief-bubbles.json',
          'he/thought-labeling.json',
          'he/fidget-spinner.json'
        ]
      },
      {
        code: 'nl',
        language: 'nl',
        name: 'Nederlands',
        files: [
          'nl/navigation.json',
          'nl/techniques.json',
          'nl/pages.json',
          'nl/meta.json',
          'en/legal.json',
          'nl/breathing.json',
          'nl/guided-breathing.json',
          'nl/grounding.json',
          'nl/peaceful-visualization.json',
          'nl/progressive-muscle-relaxation.json',
          'nl/sound-therapy.json',
          'nl/stress-relief-bubbles.json',
          'nl/thought-labeling.json',
          'nl/fidget-spinner.json'
        ]
      },
      {
        code: 'es',
        language: 'es-ES',
        name: 'Español',
        files: [
          'es/navigation.json',
          'es/techniques.json',
          'es/pages.json',
          'es/meta.json',
          'en/legal.json',
          'es/breathing.json',
          'es/guided-breathing.json',
          'es/grounding.json',
          'es/peaceful-visualization.json',
          'es/progressive-muscle-relaxation.json',
          'es/sound-therapy.json',
          'es/stress-relief-bubbles.json',
          'es/thought-labeling.json',
          'es/fidget-spinner.json'
        ]
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default'
  },

  compatibilityDate: "2024-12-26",

  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
    manifest: {
      name: 'Anxiety Aid Tools',
      short_name: 'AAT',
      description: 'Evidence-based techniques to find calm when you need it most',
      theme_color: '#9333ea',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/aat.svg',
          sizes: 'any',
          type: 'image/svg+xml'
        },
        {
          src: '/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
  },
});
