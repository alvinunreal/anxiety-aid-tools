#!/usr/bin/env node

/**
 * Generate locale-specific narration audio for the Peaceful Visualization exercise
 * using the ElevenLabs Text to Speech API.
 *
 * Examples:
 *   pnpm generate:peaceful-visualization --lang en
 *   pnpm generate:peaceful-visualization --lang nl --scene tranquilForestGrove --overwrite
 */

import { mkdir, readdir, readFile, stat } from 'node:fs/promises';
import { createWriteStream, existsSync } from 'node:fs';
import path from 'node:path';
import process, { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const ELEVENLABS_VOICE_ID = 'Mu5jxyqZOLIGltFpfalg';
const ELEVENLABS_MODEL = 'eleven_multilingual_v2';
const ELEVENLABS_OUTPUT_FORMAT = 'mp3_44100_128';
const DEFAULT_PAUSE_MS = 1200;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const localesDir = path.join(repoRoot, 'i18n', 'locales');
const audioBaseDir = path.join(repoRoot, 'public', 'audios', 'peaceful-visualization');

/**
 * Basic CLI argument parsing.
 */
const parseArgs = () => {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    switch (arg) {
      case '--lang':
      case '-l':
        options.lang = args[i + 1];
        i += 1;
        break;
      case '--scene':
      case '-s':
        options.scene = args[i + 1];
        i += 1;
        break;
      case '--overwrite':
        options.overwrite = true;
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
      default:
        console.warn(`Unknown argument "${arg}" will be ignored.`);
    }
  }

  return options;
};

const printHelp = async () => {
  console.log(`
Generate ElevenLabs narration for the Peaceful Visualization exercise.

Options:
  -l, --lang <code>     Locale code to process (e.g. en, fr). Defaults to interactive prompt.
  -s, --scene <key>     Scene key (e.g. mountainPeakSunrise). Use "all" for every scene.
      --overwrite       Re-generate files even if audio already exists.
      --dry-run         Show what would be generated without calling the API.
  -h, --help            Show this help message.

Environment:
  ELEVENLABS_API_KEY    Required. Your ElevenLabs API key.
`);
};

const ensureApiKey = () => {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    console.error('ELEVENLABS_API_KEY is not set. Please export it or add it to your .env file.');
    process.exitCode = 1;
    process.exit();
  }
  return key;
};

const listLocales = async () => {
  const entries = await readdir(localesDir, { withFileTypes: true });
  const localeCodes = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const exercisesPath = path.join(localesDir, entry.name, 'exercises.json');
    if (existsSync(exercisesPath)) {
      localeCodes.push(entry.name);
    }
  }
  return localeCodes.sort();
};

const loadLocaleData = async (locale) => {
  const exercisesPath = path.join(localesDir, locale, 'exercises.json');
  const data = JSON.parse(await readFile(exercisesPath, 'utf8'));
  if (!data.peacefulVisualization?.scenes) {
    throw new Error(`Locale "${locale}" does not define peacefulVisualization.scenes in exercises.json`);
  }
  return data.peacefulVisualization.scenes;
};

const promptChoice = async (message, choices) => {
  if (!process.stdin.isTTY) {
    throw new Error(`${message} (non-interactive). Provide a value via command line arguments.`);
  }

  const rl = readline.createInterface({ input, output });
  try {
    console.log(message);
    choices.forEach((choice, index) => {
      console.log(`  ${index + 1}. ${choice}`);
    });

    // loop until valid selection
    while (true) {
      const answer = await rl.question('Select an option by number: ');
      const choiceIndex = Number.parseInt(answer, 10);
      if (!Number.isNaN(choiceIndex) && choiceIndex >= 1 && choiceIndex <= choices.length) {
        return choices[choiceIndex - 1];
      }
      console.log(`Invalid selection "${answer}". Please try again.`);
    }
  } finally {
    await rl.close();
  }
};

const ensureDir = async (dirPath) => {
  await mkdir(dirPath, { recursive: true });
};

const audioExists = async (filePath) => {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
};

const generateAudio = async ({ client, text, outputPath, dryRun }) => {
  if (dryRun) {
    console.log(`[dry-run] Would generate ${outputPath}`);
    return;
  }

  const response = await client.textToSpeech.convert(ELEVENLABS_VOICE_ID, {
    text,
    modelId: ELEVENLABS_MODEL,
    outputFormat: ELEVENLABS_OUTPUT_FORMAT,
    voiceSettings: {
      stability: 0.45,
      similarityBoost: 0.8,
      style: 0.2,
      useSpeakerBoost: true,
    },
  });

  const nodeStream = Readable.fromWeb(response);
  await pipeline(nodeStream, createWriteStream(outputPath));
};

const main = async () => {
  const options = parseArgs();

  if (options.help) {
    await printHelp();
    return;
  }

  const apiKey = ensureApiKey();
  const availableLocales = await listLocales();

  let locale = options.lang;
  if (locale && !availableLocales.includes(locale)) {
    console.warn(`Locale "${locale}" is not available. Available locales: ${availableLocales.join(', ')}`);
    locale = undefined;
  }

  if (!locale) {
    locale = await promptChoice('Select a locale to generate audio for:', availableLocales);
  }

  const scenes = await loadLocaleData(locale);
  const sceneKeys = Object.keys(scenes);
  if (sceneKeys.length === 0) {
    throw new Error(`No scenes defined for locale "${locale}".`);
  }

  let selectedScene = options.scene;
  if (selectedScene && selectedScene !== 'all' && !sceneKeys.includes(selectedScene)) {
    console.warn(`Scene "${selectedScene}" is not defined. Available scenes: ${sceneKeys.join(', ')}`);
    selectedScene = undefined;
  }

  if (!selectedScene) {
    // Default to interactive selection unless running all scenes.
    selectedScene = await promptChoice(
      'Select a scene (choose "all" to process every scene):',
      [...sceneKeys, 'all'],
    );
  }

  const scenesToProcess = selectedScene === 'all' ? sceneKeys : [selectedScene];

  const client = new ElevenLabsClient({
    apiKey,
  });

  await ensureDir(audioBaseDir);

  for (const sceneKey of scenesToProcess) {
    const guidance = scenes[sceneKey]?.guidance;
    if (!Array.isArray(guidance) || guidance.length === 0) {
      console.warn(`Scene "${sceneKey}" has no guidance array. Skipping.`);
      continue;
    }

    const sceneDir = path.join(audioBaseDir, locale, sceneKey);
    await ensureDir(sceneDir);

    console.log(`\nProcessing ${locale} → ${sceneKey} (${guidance.length} sentences)`);
    for (const [index, sentence] of guidance.entries()) {
      const fileName = `${String(index + 1).padStart(2, '0')}.mp3`;
      const filePath = path.join(sceneDir, fileName);

      if (!options.overwrite && (await audioExists(filePath))) {
        console.log(`  [skip] ${fileName} already exists`);
        continue;
      }

      console.log(`  [${index + 1}/${guidance.length}] Generating ${fileName}`);
      try {
        await generateAudio({
          client,
          text: sentence,
          outputPath: filePath,
          dryRun: options.dryRun,
        });

        if (!options.dryRun) {
          await new Promise((resolve) => setTimeout(resolve, DEFAULT_PAUSE_MS));
        }
      } catch (error) {
        console.error(`  Failed to generate "${fileName}":`, error.message || error);
        if (!options.dryRun) {
          console.error('  Aborting to avoid partial output. Re-run with --overwrite once resolved.');
          throw error;
        }
      }
    }
  }

  console.log('\nDone.');
};

main().catch((error) => {
  console.error('\nGeneration script failed:', error.message || error);
  process.exitCode = 1;
});
