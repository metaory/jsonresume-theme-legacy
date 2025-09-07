#!/bin/bash

# PDF optimization script for JSONResume theme
# Compresses and versions PDF files
# Usage: bash optimize-pdf.sh <input.pdf>
# If no argument is given, defaults to out/private.pdf

set -euo pipefail

IN="${1:-out/private.pdf}"
OUT="${IN%.pdf}-tmp.pdf"

# Get version from package.json and user from env
VERSION=$(node -p "require('./package.json').version")
USER="${USER:-unknown}"

# Extract first word from input filename
FIRST_WORD=${IN##*/}
FIRST_WORD=${FIRST_WORD%.pdf}
FIRST_WORD=${FIRST_WORD%%.*}
FINAL_NAME="${FIRST_WORD}.${USER}.v${VERSION}.pdf"

if command -v gs &> /dev/null; then
    echo "Compressing PDF with Ghostscript..."
    gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dCompatibilityLevel=1.6 \
       -dPDFSETTINGS=/ebook -dColorImageDownsampleType=/Bicubic \
       -dColorImageResolution=150 -dGrayImageResolution=150 \
       -dMonoImageResolution=300 -sOutputFile="$OUT" "$IN"
    mv "$OUT" "out/$FINAL_NAME"
elif command -v qpdf &> /dev/null; then
    echo "Compressing PDF with qpdf..."
    qpdf --linearize "$IN" "$OUT"
    mv "$OUT" "out/$FINAL_NAME"
else
    echo "No PDF compression tool (ghostscript or qpdf) found, copying to final name."
    cp "$IN" "out/$FINAL_NAME"
fi

rm -f "$IN"
echo "PDF saved as: out/$FINAL_NAME" 