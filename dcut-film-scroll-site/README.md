# DCUT Film Scroll Site

Static, zero-build website made for direct GitHub -> Vercel deployment.

## Deploy
Upload these files to the repository root:
- index.html
- styles.css
- app.js
- site-data.js
- vercel.json
- assets/

Vercel settings:
- Framework preset: Other
- Build command: blank
- Output directory: blank

## Customize categories
Edit `site-data.js`.

## Replace thumbnails later
The current thumbnails are CSS placeholders. Replace each `.thumb-... .thumb-media::before` background in `styles.css` with `background-image: url(...)` or extend `site-data.js` with image paths.
