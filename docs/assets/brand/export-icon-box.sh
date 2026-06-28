#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="$ROOT/../readme/app-icon-box.png"

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=2 \
  --window-size=176,176 \
  --default-background-color=00000000 \
  --screenshot="$OUT" \
  "file://$ROOT/export-icon-box.html" 2>/dev/null

echo "exported $OUT"