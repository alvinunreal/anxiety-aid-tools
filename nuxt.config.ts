import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

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

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/device",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    '@sentry/nuxt/module',
    "@nuxtjs/color-mode",
  ],

  colorMode: {
    classSuffix: "",
  },

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
          'en/exercises.json',
          'en/pages.json',
          'en/meta.json'
        ]
      },
      {
        code: 'fr',
        language: 'fr-FR',
        name: 'Français',
        files: [
          'fr/navigation.json',
          'fr/techniques.json',
          'fr/exercises.json',
          'fr/pages.json',
          'fr/meta.json'
        ]
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default'
  },

  compatibilityDate: "2024-12-26",

  sentry: {
    enabled: process.env.NODE_ENV === 'production',
    sourceMapsUploadOptions: {
      telemetry: false,
      org: 'boring-dystopia-development',
      project: 'anxietyaidtools',
    },
  },

  sourcemap: {
    client: 'hidden',
  },
});