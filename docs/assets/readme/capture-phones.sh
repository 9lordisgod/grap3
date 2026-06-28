#!/usr/bin/env bash
set -euo pipefail

"$(cd "$(dirname "$0")/../../.." && pwd)/scripts/sync-brand.sh"

ROOT="$(cd "$(dirname "$0")" && pwd)"
CAPTURE="$ROOT/capture"
OUT="$ROOT"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# phone 350+18 border x 720+18, plus 48px padding each side for shadow
W=464
H=834
SCALE=2

screens=(onboard discover match matches)

for name in "${screens[@]}"; do
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --hide-scrollbars \
    --force-device-scale-factor=$SCALE \
    --window-size=$W,$H \
    --default-background-color=00000000 \
    --screenshot="$OUT/phone-$name.png" \
    "file://$CAPTURE/$name.html" 2>/dev/null
  echo "captured phone-$name.png"
done