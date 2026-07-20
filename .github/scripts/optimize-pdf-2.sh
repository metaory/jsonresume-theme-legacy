#!/bin/bash

# PDF optimization (quality-first)
# Avoids Ghostscript /ebook downsampling that softens/blurs output.
# Usage: bash optimize-pdf-2.sh <input.pdf>
# Defaults to out/private.pdf

set -euo pipefail

IN="${1:-out/private.pdf}"
OUT="${IN%.pdf}-tmp.pdf"

VERSION=$(node -p "require('./package.json').version")
USER="${USER:-unknown}"

FIRST_WORD=${IN##*/}
FIRST_WORD=${FIRST_WORD%.pdf}
FIRST_WORD=${FIRST_WORD%%.*}
FINAL_NAME="${FIRST_WORD}.${USER}.v${VERSION}.pdf"

if command -v qpdf &> /dev/null; then
  echo "Optimizing PDF with qpdf (lossless)..."
  qpdf --linearize --object-streams=generate --compress-streams=y \
    --recompress-flate --compression-level=9 \
    "$IN" "$OUT"
  mv "$OUT" "out/$FINAL_NAME"
elif command -v gs &> /dev/null; then
  echo "Optimizing PDF with Ghostscript (no downsample)..."
  gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite \
    -dCompatibilityLevel=1.7 \
    -dDetectDuplicateImages=true \
    -dCompressFonts=true \
    -dSubsetFonts=true \
    -dDownsampleColorImages=false \
    -dDownsampleGrayImages=false \
    -dDownsampleMonoImages=false \
    -dColorImageFilter=/FlateEncode \
    -dGrayImageFilter=/FlateEncode \
    -dAutoFilterColorImages=false \
    -dAutoFilterGrayImages=false \
    -sOutputFile="$OUT" "$IN"
  mv "$OUT" "out/$FINAL_NAME"
else
  echo "No PDF tool (qpdf or ghostscript) found, copying to final name."
  cp "$IN" "out/$FINAL_NAME"
fi

rm -f "$IN"
echo "PDF saved as: out/$FINAL_NAME"
