find . -type f -name "*.mp3" | while read -r file; do
  output="${file%.mp3}.norm.mp3"
  echo "Processing: $file -> $output"

  ffmpeg -i "$file" \
    -af "loudnorm=I=-16:TP=-1.5:LRA=7,acompressor=threshold=-25dB:ratio=6:attack=5:release=200:makeup=8dB,alimiter=limit=-1.5dB:attack=5:release=50" \
    -q:a 5 \
    "$output" 2>&1 | grep -E "(error|Error)" || echo "  ✓ Done"
  
  mv "$output" "$file"
done
