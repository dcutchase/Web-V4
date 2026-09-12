# DCUT Full Master V28

This is the merged master project.

## Included
- Homepage archive/film-scroll site
- Category thumbnails and homepage interactions
- Social links hub
- Contact form with 24-hour lockdown
- Static reel + atmosphere FX
- `/film/` page with the 9-video 3x3 CRT wall and mobile stacked layout
- `/archive.html` 80s desktop OS archive page
- `/archive/index.html` redirect fallback
- Archive desktop wallpaper + VHS overlay
- `dcut_pong.exe` on the Archive desktop

## Main project files
- `index.html`
- `styles.css`
- `app.js`
- `site-data.js`
- `vercel.json`
- `assets/`
- `film/`
- `archive/`
- `archive.html`

## Notes
- Homepage ARCHIVE navigation goes directly to `/archive.html`.
- Desktop on Archive page uses double click to open icons.
- Mobile/touch on Archive page uses single tap to open icons.

Use this ZIP as your new master copy. Replace the repo contents with everything inside this folder.


## V29 Archive routing fix
- Archive now uses the exact same folder-page structure as FILM.
- `/archive/index.html` contains the full Archive desktop OS.
- Homepage links directly to `/archive/`.
- Root `archive.html` is only a redirect fallback.
- Wallpaper path is absolute so it loads correctly from inside `/archive/`.
