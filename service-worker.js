const CACHE_NAME = "pemuncak";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/tentang.html",
  "/pages/home.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/asset/logo.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
    .match(event.request, { cacheName: CACHE_NAME })
    .then(function(response) {
        if (response) {
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
        }

        console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
        );
        return fetch(event.request);
    })
  );
});