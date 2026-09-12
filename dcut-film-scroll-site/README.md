# DCUT Film Scroll V2

Static, Vercel-ready website.

## Replace your current version
Upload these files to the ROOT of the same GitHub repository and overwrite matching files:
- index.html
- styles.css
- app.js
- site-data.js
- vercel.json

Vercel should redeploy automatically.

## Add real thumbnails
Put images in `assets/`, then edit `site-data.js`, for example:

image: "assets/film.jpg"

The reel/UI remains pixel-styled while the category media stays crisp.


## V3 behavior
The film strip is now progressively revealed by scroll, so it visually feeds out of the reel instead of existing fully on the page from the start.
