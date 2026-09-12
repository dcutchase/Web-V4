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


## V7 social hub
A pixel-art social network terminal has been added to the bottom of the page with:
- Instagram @dcut.chase
- Instagram @dcut.collective
- TikTok @dcut.chase
- TikTok @dcut.collective

The cards use the existing 8-bit cursor interaction and open in a new tab.


## V8 contact form
Added an 8-bit contact terminal below the social links.

Fields:
- First name
- Last name
- Instagram handle
- Email
- Reason for reaching out / project details

Submissions are sent to:
chasefilms@icloud.com

The form uses FormSubmit's AJAX endpoint so users stay on the DCUT page and receive a coded success/error state.

IMPORTANT FIRST-TIME ACTIVATION:
The first form submission triggers a FormSubmit activation email to chasefilms@icloud.com.
Open that email and confirm the form once. After confirmation, future website inquiries are delivered to that inbox.


## V9 24-hour lockdown
After a successful contact form submission:
- The form disappears.
- The contact terminal transforms into an 8-bit lock screen.
- A live HH:MM:SS countdown shows when the next transmission is available.
- The lock survives page refreshes using browser localStorage.
- After 24 hours, the form automatically unlocks.

Important:
This V9 limit is enforced in the visitor's browser. A determined visitor can bypass it by clearing browser storage, changing browsers/devices, or using private browsing. True anti-abuse enforcement would require server-side rate limiting.


## V10 atmosphere
Added subtle coded environmental effects:
- Soft spotlight-style vignette over the entire site
- Irregular low-frequency light flicker
- Constant low-density drifting dust
- Separate randomized dust speeds, sizes, opacity, and drift
- Individual intermittent glow flickers over the colored DCUT marks on the reel
- Reel glow layer follows the reel rotation
- Reduced-motion accessibility disables animated atmosphere

All effects are CSS/JavaScript. No new rendered background image was added.


## V11 transparent reel asset
- Replaced the boxed reel crop with a transparent 2D reel sprite.
- Reel now sits cleanly inside the vignette without a black rectangle around it.
- Film mouth/reveal positions were adjusted so the strip appears to emerge from the reel itself.


## V12 reel rotation
- Reel now performs strong, visible rotations tied to film release.
- Rotation is quantized into 6-degree steps so it feels more mechanical / pixel-art instead of buttery-smooth.
- Glow overlay rotates with the reel asset.
