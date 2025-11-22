#!/usr/bin/env bash

# Usage: ./normalize_audio.sh [directory]
# If no directory is provided, uses current directory

TARGET_DIR="${1:-.}"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Directory '$TARGET_DIR' does not exist"
  exit 1
fi

echo "Normalizing audio files in: $TARGET_DIR"
echo "-------------------------------------------"

find "$TARGET_DIR" -type f -name "*.mp3" | while read -r file; do
  output="${file%.mp3}.norm.mp3"
  echo "Processing: $file -> $output"

  ffmpeg -i "$file" \
    -af "loudnorm=I=-16:TP=-1.5:LRA=7,acompressor=threshold=-25dB:ratio=6:attack=5:release=200:makeup=8dB,alimiter=limit=-1.5dB:attack=5:release=50" \
    -q:a 5 \
    "$output" 2>&1 | grep -E "(error|Error)" || echo "  ✓ Done"
  
  mv "$output" "$file"
done

echo "-------------------------------------------"
echo "Normalization complete!"
