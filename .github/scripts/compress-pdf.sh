#!/bin/bash

# PDF compression script for JSONResume theme
# Usage: bash compress-pdf.sh <input.pdf>
# If no argument is given, defaults to out/private.pdf

set -euo pipefail

IN="${1:-out/private.pdf}"
OUT="${IN%.pdf}-tmp.pdf"

if command -v gs &> /dev/null; then
    echo "Compressing PDF with Ghostscript..."
    gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -dCompatibilityLevel=1.6 \
       -dPDFSETTINGS=/ebook -dColorImageDownsampleType=/Bicubic \
       -dColorImageResolution=150 -dGrayImageResolution=150 \
       -dMonoImageResolution=300 -sOutputFile="$OUT" "$IN"
    mv "$OUT" "$IN"
elif command -v qpdf &> /dev/null; then
    echo "Compressing PDF with qpdf..."
    qpdf --linearize "$IN" "$OUT"
    mv "$OUT" "$IN"
else
    echo "No PDF compression tool (ghostscript or qpdf) found, skipping."
    exit 0
fi

echo "PDF optimization complete!" 