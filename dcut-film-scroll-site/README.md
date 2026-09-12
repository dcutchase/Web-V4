# DCUT 8-bit Reference V5

This pass intentionally stops trying to fake pixel art with CSS alone.

The site now uses the exact generated DCUT pixel-art concept as the environment/background reference, with the original center covered so the live coded film/reel can sit inside the same world.

Important fixes:
- Reel is not fixed to the viewport.
- Film reveal no longer uses clip-path.
- The film-reveal container physically grows in height as you scroll.
- Scroll height is handled by a separate invisible track, making the reveal reliable.
- Reel sprite is cropped directly from the generated concept image.
- Surrounding room art is the actual generated concept.
- Actual media inserted in category frames remains crisp.

Upload every file from this folder into the root of your existing GitHub repo and replace the matching files.

To use real category thumbnails:
1. Put image files in /assets
2. Edit site-data.js
3. Set e.g. image:"assets/film.jpg"


## V6 interactions
- Custom 8-bit cursor on desktop/fine-pointer devices.
- Cursor expands and gains DCUT accent colors over interactive film frames.
- Hovering a category frame glitches the surrounding pixel-art world.
- Actual thumbnail/media stays crisp and undistorted.
- Pixel glitch bars appear around the hovered film frame.
- Labels/connectors pick up subtle RGB-style pixel offsets.
- Touch devices automatically fall back to normal cursor/hover behavior.
