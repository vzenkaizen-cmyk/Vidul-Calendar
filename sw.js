const CACHE_NAME = "vidullanka-calendar-2027-v4";
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
    await cache.addAll(APP_FILES);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("vidullanka-calendar-") && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      if (request.mode === "navigate") return caches.match("./index.html");
      return new Response("This item is not available offline yet.", {status: 503, headers: {"Content-Type": "text/plain"}});
    }
  })());
});
