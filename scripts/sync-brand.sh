#!/usr/bin/env bash
# Single source of truth: app/assets/logo.png
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/app/assets/logo.png"

if [[ ! -f "$SRC" ]]; then
  echo "missing canonical logo: $SRC" >&2
  exit 1
fi

mkdir -p "$ROOT/docs/assets/brand" \
         "$ROOT/docs/mockup/assets" \
         "$ROOT/docs/assets/readme/capture/assets"

cp "$SRC" "$ROOT/docs/assets/brand/logo.png"
cp "$SRC" "$ROOT/docs/mockup/assets/logo.png"
cp "$SRC" "$ROOT/docs/assets/readme/capture/assets/logo.png"

# Expo + dApp Store icon (512×512)
sips -z 512 512 "$SRC" --out "$ROOT/app/assets/icon.png" >/dev/null

# Drop legacy duplicates
rm -f "$ROOT/app/assets/logo.jpg" \
      "$ROOT/docs/mockup/assets/logo.jpg"

chmod +x "$ROOT/docs/assets/brand/export-icon-box.sh"
"$ROOT/docs/assets/brand/export-icon-box.sh"

echo "synced brand assets from app/assets/logo.png"