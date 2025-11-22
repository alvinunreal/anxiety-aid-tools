# Adding a New Language to Anxiety Aid Tools

Complete step-by-step guide for adding full language support to the project.

## Overview

Adding a new language requires:
1. Creating 13 translation JSON files
2. Updating Nuxt i18n configuration
3. Localizing mental health organization resources
4. (Optional) Generating audio narration for Peaceful Visualization
5. Testing and validation

**Time Estimate:** 4-8 hours for complete translation (excluding audio generation)

---

## Prerequisites

- Fluency in the target language
- Understanding of mental health terminology in that language
- (Optional) ElevenLabs API key for audio narration

---

## Step 1: Create Translation Directory

Create a new directory for your language code in `/i18n/locales/`:

```bash
# Example for German (de)
mkdir -p i18n/locales/de
```

**Language Codes:** Use ISO 639-1 two-letter codes (e.g., `de`, `it`, `ja`, `ko`, `ar`)

---

## Step 2: Create Translation Files

You need to create **13 JSON translation files**. Use `/i18n/locales/en/` as your reference.

### Required Files:

#### Core Files (4)
1. **`navigation.json`** - Header, menus, breadcrumbs, error messages
2. **`techniques.json`** - Descriptions and metadata for all 10 techniques
3. **`pages.json`** - About section, resources, footer, mobile app page
4. **`meta.json`** - SEO titles and descriptions for all pages

#### Exercise Files (9)
5. **`breathing.json`** - 2-minute breathing exercise
6. **`grounding.json`** - 5-4-3-2-1 sensory grounding technique
7. **`guided-breathing.json`** - Extended breathing patterns (Box, 4-7-8, etc.)
8. **`progressive-muscle-relaxation.json`** - Full-body muscle relaxation
9. **`peaceful-visualization.json`** - 9 visualization scenes with guidance
10. **`thought-labeling.json`** - Cognitive thought categorization
11. **`stress-relief-bubbles.json`** - Interactive stress relief activity
12. **`fidget-spinner.json`** - Virtual fidget spinner controls
13. **`sound-therapy.json`** - Sound frequencies and binaural beats

#### Legal File (Shared)
14. **`legal.json`** - Privacy policy, terms, support (use English fallback - no translation needed)

---

## Step 3: Translation Guidelines

### General Principles

1. **Tone:** Professional, calm, supportive, reassuring
2. **Formality:** Use formal address where culturally appropriate (e.g., "Sie" in German, "vous" in French)
3. **Medical Terms:** Use clinically accurate terminology
4. **Preserve Structure:**
   - Keep all JSON keys unchanged
   - Preserve HTML tags: `<a href="...">`, `<strong>`, etc.
   - Maintain research citation links intact
   - Keep formatting markers like `{count}`, `{time}`, `{completedCycles}`

### Special Attention Areas

#### Research Citations
Preserve all scientific research links and HTML:
```json
"description": "Research shows <a href=\"https://pmc.ncbi.nlm.nih.gov/articles/PMC5455070/\" target=\"_blank\" rel=\"nofollow\" class=\"text-purple-600 underline hover:text-purple-800\">8-week program</a> lowered cortisol levels."
```

#### Variable Placeholders
Keep exactly as-is:
- `{count}`, `{time}`, `{completedCycles}`, `{techniqueName}`, `{totalTime}`
- `{current}`, `{total}`, `{progress}`, `{plural}`

#### ARIA Labels
Translate accessibility text clearly:
```json
"sessionProgressAriaLabel": "Session progress: {current} of {total} breathing cycles completed"
```

---

## Step 4: Localize Mental Health Organizations

In `pages.json`, update the `resources.organizations.list` array with **mental health organizations relevant to your country/region**.

### Example Structure:
```json
"organizations": {
  "title": "Mental Health Organizations",
  "description": "Leading organizations providing evidence-based information...",
  "list": [
    {
      "name": "National Mental Health Organization Name",
      "url": "https://example.org",
      "description": "Brief description of services and resources provided"
    },
    {
      "name": "Anxiety Support Foundation",
      "url": "https://example.com",
      "description": "Description..."
    }
  ]
}
```

### Finding Organizations:
- Government mental health agencies
- National psychology/psychiatry associations
- Established anxiety/depression support organizations
- Crisis hotline providers
- Evidence-based therapy resource centers

**Important:** Choose reputable, established organizations with evidence-based approaches.

---

## Step 5: Update Nuxt Configuration

Edit `/nuxt.config.ts` to add your language to the `i18n.locales` array:

```typescript
{
  code: 'de',  // Your language code
  language: 'de-DE',  // BCP 47 language tag
  name: 'Deutsch',  // Native language name
  files: [
    'de/navigation.json',
    'de/techniques.json',
    'de/pages.json',
    'de/meta.json',
    'en/legal.json',  // Always use English legal.json
    'de/breathing.json',
    'de/guided-breathing.json',
    'de/grounding.json',
    'de/peaceful-visualization.json',
    'de/progressive-muscle-relaxation.json',
    'de/sound-therapy.json',
    'de/stress-relief-bubbles.json',
    'de/thought-labeling.json',
    'de/fidget-spinner.json'
  ]
}
```

**Insert** this object into the `locales` array in alphabetical order by language name.

---

## Step 6: Validate Translations

Run the sync-locales script to check for missing or extra keys:

```bash
pnpm sync-locales de
```

This will:
- ✅ Show which files are fully synced
- 🔴 List missing translation keys
- 🟡 Identify extra keys that should be removed
- 🟠 Flag type mismatches

**Fix all issues** before proceeding.

---

## Step 7: Generate Audio Narration (Optional)

The Peaceful Visualization exercise supports audio narration for each scene. This is **optional** but enhances the experience.

### Requirements:
- ElevenLabs API account and API key
- Voice configured in ElevenLabs for your language

### Steps:

1. **Set up API key:**
```bash
export ELEVENLABS_API_KEY=sk-your-key-here
```

2. **Generate audio for all scenes:**
```bash
pnpm generate:peaceful-visualization --lang de --scene all
```

3. **Or generate individual scenes:**
```bash
pnpm generate:peaceful-visualization --lang de --scene mountainPeakSunrise
```

### Available Scenes:
- `mountainPeakSunrise`
- `tranquilForestGrove`
- `peacefulOceanBeach`
- `sereneGardenParadise`
- `starlitMeadowNight`
- `cozyRainyCabin`
- `mistyLakesideDawn`
- `sunlitDesertOasis`
- `floatingCloudSanctuary`

### Audio Output:
Files are generated in: `/public/audios/peaceful-visualization/{locale}/{scene}/01.mp3` through `09.mp3`

**Cost Note:** Each sentence costs ~1 ElevenLabs API credit. 9 scenes × 7-9 sentences = ~70-80 credits per language.

### Testing Audio:
```bash
# Dry run (no API calls)
pnpm generate:peaceful-visualization --lang de --scene mountainPeakSunrise --dry-run

# Test one scene first
pnpm generate:peaceful-visualization --lang de --scene mountainPeakSunrise

# Regenerate existing files
pnpm generate:peaceful-visualization --lang de --scene all --overwrite
```

---

## Step 8: Test Your Translation

### Local Testing:

1. **Start dev server:**
```bash
pnpm dev
```

2. **Test the language selector:**
   - Open http://localhost:3000
   - Click language selector in header
   - Choose your new language
   - Verify it appears and switches correctly

3. **Test each page:**
   - Home page
   - All 10 technique pages
   - Mobile app page
   - Privacy, Terms, Support pages

4. **Check for issues:**
   - Missing translations (English text appearing)
   - Broken layouts (text overflow)
   - Non-functional components
   - Broken links in mental health organizations

### Build Testing:

```bash
pnpm build
pnpm preview
```

Test the production build to ensure everything works in the optimized version.

---

## Step 9: Common Issues & Solutions

### Issue: Text Appears in English
**Cause:** Missing translation key or incorrect file structure  
**Solution:** Run `pnpm sync-locales de` and add missing keys

### Issue: Layout Breaks with Long Text
**Cause:** Target language has longer words/phrases  
**Solution:** This is expected—CSS should handle it. If severe, file an issue.

### Issue: Research Links Not Working
**Cause:** Accidentally modified href attribute  
**Solution:** Ensure all `href` values match English version exactly

### Issue: Audio Not Playing
**Cause:** Audio files not generated or incorrect path  
**Solution:** 
- Check files exist in `/public/audios/peaceful-visualization/{locale}/`
- Verify file names are `01.mp3`, `02.mp3`, etc.
- Check browser console for 404 errors

### Issue: Variable Placeholders Appearing as Text
**Cause:** Modified placeholder format (e.g., changed `{count}` to `{anzahl}`)  
**Solution:** Keep all placeholders exactly as they appear in English

---

## Step 10: Submission Checklist

Before submitting your translation:

- [ ] All 13 JSON files created and translated
- [ ] Mental health organizations localized in `pages.json`
- [ ] `nuxt.config.ts` updated with new locale
- [ ] `pnpm sync-locales` shows ✅ all files synced
- [ ] Tested language selector works
- [ ] All technique pages display correctly
- [ ] No English text appears in translated version
- [ ] Research citation links work
- [ ] Audio generated (optional, but recommended)
- [ ] Build completes without errors
- [ ] Reviewed for cultural sensitivity

---

## Translation File Size Reference

For planning purposes:

| File | Approximate Word Count | Complexity |
|------|------------------------|------------|
| navigation.json | 100 | Low |
| techniques.json | 400 | Medium |
| pages.json | 800 | Medium |
| meta.json | 600 | Low |
| breathing.json | 500 | Medium |
| grounding.json | 800 | High |
| guided-breathing.json | 700 | Medium |
| progressive-muscle-relaxation.json | 1,200 | High |
| peaceful-visualization.json | 1,500 | High |
| thought-labeling.json | 700 | Medium |
| stress-relief-bubbles.json | 400 | Low |
| fidget-spinner.json | 50 | Low |
| sound-therapy.json | 600 | Medium |
| **Total** | **~8,350 words** | |

---

## Questions or Issues?

- **General Questions:** [GitHub Discussions](https://github.com/alvinunreal/anxiety-aid-tools/discussions)
- **Translation Help:** Check existing translations in `/i18n/locales/` for reference
- **Technical Issues:** [GitHub Issues](https://github.com/alvinunreal/anxiety-aid-tools/issues)
- **Community:** [r/AnxietyAidTools](https://www.reddit.com/r/AnxietyAidTools/)

---

## Example: Quick Start for German

```bash
# 1. Create directory
mkdir -p i18n/locales/de

# 2. Copy English files as templates
cp i18n/locales/en/*.json i18n/locales/de/

# 3. Translate each file (use your text editor or IDE)
# ... translation work ...

# 4. Update nuxt.config.ts
# Add German locale configuration

# 5. Validate
pnpm sync-locales de

# 6. Test
pnpm dev

# 7. Generate audio (optional)
export ELEVENLABS_API_KEY=sk-your-key
pnpm generate:peaceful-visualization --lang de --scene all

# 8. Build and verify
pnpm build
pnpm preview
```

---

## Thank You! 🙏

Your translation helps make anxiety relief tools accessible to more people around the world. The open-source mental health community appreciates your contribution.

---

**Document Version:** 1.0  
**Last Updated:** November 2025  
**Maintained by:** Anxiety Aid Tools Contributors
