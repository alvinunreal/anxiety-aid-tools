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
    -af "alimiter=limit=-2.5dB:attack=1:release=20,acompressor=threshold=-25dB:ratio=3:attack=5:release=400:makeup=5dB,loudnorm=I=-18:TP=-2.0:LRA=6" \
    -q:a 5 \
    "$output" 2>&1 | grep -E "(error|Error)" || echo "  ✓ Done"
  
  mv "$output" "$file"
done

echo "-------------------------------------------"
echo "Normalization complete!"
