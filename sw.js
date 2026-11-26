const CACHE_NAME = "vidullanka-calendar-2027-v7";

const APP_FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.webmanifest",
  "./assets/vidullanka-logo.svg",
  "./assets/cover-nature-artwork.jpg",
  "./assets/app-icon-192.png",
  "./assets/app-icon-512.png",

  // Monthly artwork used on both the artwork pages and calendar backgrounds.
  "./assets/artworks/january.jpg",
  "./assets/artworks/february.jpg",
  "./assets/artworks/march.jpg",
  "./assets/artworks/april.jpg",
  "./assets/artworks/may.jpg",
  "./assets/artworks/june.jpg",
  "./assets/artworks/july.jpg",
  "./assets/artworks/august.jpg",
  "./assets/artworks/september.jpg",
  "./assets/artworks/october.jpg",
  "./assets/artworks/november.jpg",
  "./assets/artworks/december.jpg",

  // Monthly instrumental audio.
  "./assets/audio/january.wav",
  "./assets/audio/february.wav",
  "./assets/audio/march.wav",
  "./assets/audio/april.wav",
  "./assets/audio/may.wav",
  "./assets/audio/june.wav",
  "./assets/audio/july.wav",
  "./assets/audio/august.wav",
  "./assets/audio/september.wav",
  "./assets/audio/october.wav",
  "./assets/audio/november.wav",
  "./assets/audio/december.wav"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Cache files individually so one optional/missing media file does not
    // prevent the calendar app itself from being installed.
    const results = await Promise.allSettled(
      APP_FILES.map(path => cache.add(path))
    );

    const failedFiles = results
      .map((result, index) => result.status === "rejected" ? APP_FILES[index] : null)
      .filter(Boolean);

    if (failedFiles.length) {
      console.warn("Some calendar resources were not precached:", failedFiles);
    }

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(key =>
          key.startsWith("vidullanka-calendar-") && key !== CACHE_NAME
        )
        .map(key => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Only handle requests belonging to this calendar's own website.
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // For page navigation, prefer the latest deployed page and fall back
    // to the cached page when the device is offline.
    if (request.mode === "navigate") {
      try {
        const response = await fetch(request);

        if (response && response.ok) {
          event.waitUntil(cache.put("./index.html", response.clone()));
        }

        return response;
      } catch (error) {
        return (await cache.match("./index.html")) ||
          new Response("The calendar page is not available offline.", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" }
          });
      }
    }

    // For same-origin static resources, use the app cache first.
    const cached = await cache.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);

      // Cache only successful same-origin responses.
      if (response && response.ok && response.type !== "opaque") {
        event.waitUntil(cache.put(request, response.clone()));
      }

      return response;
    } catch (error) {
      return new Response("This item is not available offline yet.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  })());
});
