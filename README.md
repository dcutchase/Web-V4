# DCUT Full Website Project — V21

This ZIP is the complete current project intended for transfer to a new computer / GitHub update.

## Included
- Homepage / 8-bit film-reel archive experience
- Current category thumbnails
- Static transparent reel
- Spotlight vignette + dust atmosphere
- Custom pixel cursor + film hover effects
- Social hub
- Contact form sending to chasefilms@icloud.com
- 24-hour browser-side contact lockdown
- `/film/` page with 9 YouTube videos in a 3×3 CRT wall on desktop and stacked CRTs on mobile
- `/archive/` page with the 80s desktop-computer OS scaffold
- Homepage ARCHIVE frame linked to `/archive/`

## Archive files
- file_1 // who_is_dcutchase
- file_2 // dcut_orgins
- file_3 // archive_mp4
- file_4 // archive_jpg

## Deployment
Upload **everything inside this folder** to the root of your GitHub repo, replacing matching files, then commit. Vercel should redeploy automatically.

This should be treated as the new master copy of the website on your new desktop.


## V22 Archive navigation fix
- Homepage ARCHIVE category now links directly to `/archive/`.
- FILM link was also normalized to `/film/`.
- Full project bundle includes homepage, assets, FILM page, and ARCHIVE OS page.


## V23 Archive route fix
- Added root-level `archive.html`.
- Homepage ARCHIVE tile now links to `/archive`.
- Kept `/archive/index.html` as a fallback copy.
- This avoids the nested-folder + cleanUrls routing issue on Vercel.


## V24 Vercel routing fix
- `/archive` explicitly rewrites to `/archive/index.html`.
- `/film` explicitly rewrites to `/film/index.html`.
- Disabled dependency on Vercel cleanUrls for category routing.
- Kept `archive.html` as an extra direct fallback.
- Homepage FILM and ARCHIVE tiles use canonical `/film` and `/archive` paths.


## V25 direct Archive route fix
- Archive homepage tile now links directly to `/archive.html`.
- This avoids all Vercel cleanUrls/rewrite inference.
- `archive.html` is the canonical Archive OS page at the project root.
- `/archive/index.html` is retained only as a fallback redirect to `/archive.html`.


## V26 Archive click fix
- Entire FILM and ARCHIVE category rows are now navigation targets.
- Clicking the Archive thumbnail, text label, connector, or surrounding row navigates directly to `/archive.html`.
- Keyboard Enter/Space navigation is included.
- This is a full-project package.
