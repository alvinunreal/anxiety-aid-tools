#!/usr/bin/env node

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOCALES_DIR = join(__dirname, "..", "i18n", "locales");
const BASE_LOCALE = "en";

function deepCompare(base, target, path = "") {
  const result = {
    missing: [],
    extra: [],
    different: [],
  };

  // Check for missing keys in target
  for (const key in base) {
    const currentPath = path ? `${path}.${key}` : key;

    if (!(key in target)) {
      if (typeof base[key] === "object" && base[key] !== null) {
        // Entire object is missing
        result.missing.push({
          path: currentPath,
          value: base[key],
          type: "object",
        });
      } else {
        // Simple value is missing
        result.missing.push({
          path: currentPath,
          value: base[key],
          type: "value",
        });
      }
    } else if (typeof base[key] === "object" && base[key] !== null) {
      // Recursively compare nested objects
      if (typeof target[key] === "object" && target[key] !== null) {
        const nestedResult = deepCompare(base[key], target[key], currentPath);
        result.missing.push(...nestedResult.missing);
        result.extra.push(...nestedResult.extra);
        result.different.push(...nestedResult.different);
      } else {
        // Type mismatch
        result.different.push({
          path: currentPath,
          baseValue: base[key],
          targetValue: target[key],
        });
      }
    }
  }

  // Check for extra keys in target
  for (const key in target) {
    const currentPath = path ? `${path}.${key}` : key;

    if (!(key in base)) {
      if (typeof target[key] === "object" && target[key] !== null) {
        result.extra.push({
          path: currentPath,
          value: target[key],
          type: "object",
        });
      } else {
        result.extra.push({
          path: currentPath,
          value: target[key],
          type: "value",
        });
      }
    }
  }

  return result;
}

function formatValue(value, indent = 0) {
  const spaces = "  ".repeat(indent);
  if (typeof value === "object" && value !== null) {
    const lines = ["{"];
    for (const [key, val] of Object.entries(value)) {
      if (typeof val === "object" && val !== null) {
        lines.push(`${spaces}  "${key}": ${formatValue(val, indent + 1)},`);
      } else {
        lines.push(`${spaces}  "${key}": ${JSON.stringify(val)},`);
      }
    }
    // Remove trailing comma from last line
    if (lines.length > 1) {
      lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
    }
    lines.push(`${spaces}}`);
    return lines.join("\n");
  }
  return JSON.stringify(value);
}

function generateAIInstructions(fileName, comparison) {
  const instructions = [];

  instructions.push(`# AI Instructions for Syncing ${fileName}`);
  instructions.push("");

  if (comparison.missing.length > 0) {
    instructions.push("## 🔴 MISSING KEYS (Must Add)");
    instructions.push("Add the following keys to the target locale file:");
    instructions.push("");

    for (const item of comparison.missing) {
      instructions.push(`### Key path: ${item.path}`);
      instructions.push("**English value to translate:**");
      instructions.push("```json");
      if (item.type === "object") {
        instructions.push(formatValue(item.value));
      } else {
        instructions.push(`"${item.path.split(".").pop()}": ${JSON.stringify(item.value)}`);
      }
      instructions.push("```");
      instructions.push("");
    }
  }

  if (comparison.extra.length > 0) {
    instructions.push("## 🟡 EXTRA KEYS (Should Remove)");
    instructions.push(
      "The following keys exist in the target but not in English. Consider removing them:"
    );
    instructions.push("");

    for (const item of comparison.extra) {
      instructions.push(`- **${item.path}**`);
      if (item.type === "value") {
        instructions.push(`  Current value: ${JSON.stringify(item.value)}`);
      }
    }
    instructions.push("");
  }

  if (comparison.different.length > 0) {
    instructions.push("## 🟠 TYPE MISMATCHES (Must Fix)");
    instructions.push("The following keys have different types and need to be corrected:");
    instructions.push("");

    for (const item of comparison.different) {
      instructions.push(`- **${item.path}**`);
      instructions.push(`  English type: ${typeof item.baseValue}`);
      instructions.push(`  Current type: ${typeof item.targetValue}`);
    }
    instructions.push("");
  }

  return instructions.join("\n");
}

function compareLocales(targetLocale) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`Comparing '${BASE_LOCALE}' (base) with '${targetLocale}' (target)`);
  console.log(`${"=".repeat(60)}\n`);

  const baseDir = join(LOCALES_DIR, BASE_LOCALE);
  const targetDir = join(LOCALES_DIR, targetLocale);

  if (!existsSync(targetDir)) {
    console.error(`❌ Target locale directory not found: ${targetDir}`);
    return;
  }

  const baseFiles = readdirSync(baseDir).filter((f) => f.endsWith(".json"));

  let totalMissing = 0;
  let totalExtra = 0;
  let totalDifferent = 0;

  for (const file of baseFiles) {
    if (file.startsWith(".")) continue; // Skip hidden files
    const basePath = join(baseDir, file);
    const targetPath = join(targetDir, file);

    if (!existsSync(targetPath)) {
      console.log(`\n📄 ${file}: ❌ FILE MISSING`);
      console.log(`   Create ${targetPath} with translated content from ${basePath}`);
      continue;
    }

    const baseContent = JSON.parse(readFileSync(basePath, "utf8"));
    const targetContent = JSON.parse(readFileSync(targetPath, "utf8"));

    const comparison = deepCompare(baseContent, targetContent);

    totalMissing += comparison.missing.length;
    totalExtra += comparison.extra.length;
    totalDifferent += comparison.different.length;

    if (
      comparison.missing.length === 0 &&
      comparison.extra.length === 0 &&
      comparison.different.length === 0
    ) {
      console.log(`📄 ${file}: ✅ SYNCED`);
    } else {
      console.log(`\n📄 ${file}:`);
      if (comparison.missing.length > 0) {
        console.log(`   🔴 Missing: ${comparison.missing.length} keys`);
      }
      if (comparison.extra.length > 0) {
        console.log(`   🟡 Extra: ${comparison.extra.length} keys`);
      }
      if (comparison.different.length > 0) {
        console.log(`   🟠 Different: ${comparison.different.length} keys`);
      }

      console.log(`\n${"-".repeat(60)}`);
      console.log(generateAIInstructions(file, comparison));
      console.log(`${"-".repeat(60)}`);
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log("SUMMARY");
  console.log(`${"=".repeat(60)}`);
  console.log(`Total missing keys: ${totalMissing}`);
  console.log(`Total extra keys: ${totalExtra}`);
  console.log(`Total type mismatches: ${totalDifferent}`);

  if (totalMissing === 0 && totalExtra === 0 && totalDifferent === 0) {
    console.log(`\n✅ Locale '${targetLocale}' is fully synced with '${BASE_LOCALE}'!`);
  } else {
    console.log(`\n⚠️  Locale '${targetLocale}' needs updates to sync with '${BASE_LOCALE}'.`);
    console.log("\nTo sync this locale:");
    console.log("1. Copy the AI instructions above for each file");
    console.log("2. Provide them to an AI assistant with translation capabilities");
    console.log(
      "3. Ask the AI to translate and add missing keys while preserving the JSON structure"
    );
    console.log("4. Remove any extra keys that are no longer needed");
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  // Compare all locales
  const locales = readdirSync(LOCALES_DIR).filter(
    (dir) => dir !== BASE_LOCALE && !dir.startsWith(".")
  );

  if (locales.length === 0) {
    console.log("No locales found to compare.");
    process.exit(0);
  }

  console.log(`Found locales: ${locales.join(", ")}`);

  for (const locale of locales) {
    console.log("\n" + locale + "\n");
    compareLocales(locale);
  }
} else {
  // Compare specific locale
  const targetLocale = args[0];
  compareLocales(targetLocale);
}
