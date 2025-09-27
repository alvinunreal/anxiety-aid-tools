#!/bin/bash
rm -rf .nuxt
rm -rf .output
pnpm run build
pnpx wrangler pages deploy --branch main
