# DCUT 16-Bit Scroll V4

This is a static, no-build replacement for the current DCUT Vercel site.

## What changed
- The entire coded environment is now a dark 16-bit/pixel-art studio/archive.
- The reel is no longer `position: fixed`, so it will not stay stuck to the top of the screen.
- The film is hidden at first and physically reveals farther down the page as you scroll.
- The reel rotates in response to the amount of film revealed.
- Every third film frame is a category thumbnail.
- Category labels alternate left/right and appear only after their frame has unspooled.
- Actual category media can stay crisp/full-resolution while the surrounding world stays pixelated.

## Replace your current site
Upload all files from this folder to the ROOT of the same GitHub repository and replace matching files. Commit the changes. Vercel should redeploy automatically.

## Add your own thumbnails later
Put the image files inside `assets/`, then edit `site-data.js`.

Example:

    image: "assets/film-thumbnail.jpg"

Leave `image: ""` for the built-in 16-bit MEDIA placeholder.
