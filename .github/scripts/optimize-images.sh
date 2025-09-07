#!/bin/bash

# Image optimization script for JSONResume theme
echo "Optimizing images..."

# Check for available tools
if command -v pngquant &> /dev/null; then
    echo "Using pngquant for compression..."
    pngquant --force --ext .png --quality=80-100 src/assets/*.png
elif command -v convert &> /dev/null; then
    echo "Using ImageMagick for compression..."
    for img in src/assets/*.png; do
        convert "$img" -strip -quality 85 "$img"
    done
else
    echo "No image optimization tools found. Installing pngquant..."
    # Try to install pngquant
    if command -v brew &> /dev/null; then
        brew install pngquant
        pngquant --force --ext .png --quality=80-100 src/assets/*.png
    elif command -v pacman &> /dev/null; then
        sudo pacman -S pngquant
        pngquant --force --ext .png --quality=80-100 src/assets/*.png
    else
        echo "Please install pngquant or ImageMagick for image optimization"
    fi
fi

echo "Image optimization complete!" 