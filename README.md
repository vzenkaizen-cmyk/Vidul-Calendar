# Vidullanka Digital Calendar 2027

## Updated features
- Cover page followed by a separate artwork page and a full calendar page for each month.
- All 12 months remain visible in the month navigation without an inner scroll area.
- Saturdays and Sundays do not display the bank-holiday marker. Public, mercantile and Poya markers remain shown when applicable.
- Date numbers and holiday markers use separate fixed rows inside each date cell to prevent overlap.
- Artwork page uses a large artwork-only presentation with a compact artist, age-category and quote strip below it.
- Artwork has a gentle movement animation (automatically reduced for users who prefer reduced motion).
- Each month has its own soft instrumental audio file. Use the music-note button in the top bar to play or pause the selected month's track. Browsers require a user click before audio can start.
- PWA install support, offline caching and the original Vidullanka branding are retained.

## Project files
- `index.html` — page structure
- `styles.css` — responsive layout and styling
- `script.js` — calendar, holiday markers, navigation and monthly music
- `sw.js` — offline cache and service worker
- `manifest.webmanifest` — installable PWA metadata
- `assets/audio/` — separate monthly instrumental WAV files
- `assets/artworks/` — add the approved monthly competition artwork files here

## Add the approved monthly artwork
Place the approved artwork images in `assets/artworks/` using these exact filenames:
`january.jpg`, `february.jpg`, `march.jpg`, `april.jpg`, `may.jpg`, `june.jpg`, `july.jpg`, `august.jpg`, `september.jpg`, `october.jpg`, `november.jpg`, `december.jpg`.

Artist names, age categories, quotes and artwork titles can be edited in the `MONTHS` array at the top of `script.js`.

## Run locally
Run a local web server from this folder, for example:
`python -m http.server 8000`
Then open `http://localhost:8000`.

For PWA installation and service-worker caching, deploy over HTTPS (or use localhost for local testing).
