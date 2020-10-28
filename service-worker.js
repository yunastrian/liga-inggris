const CACHE_NAME = "liga-inggris";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/klasemen.html",
  "/index.html",
  "/favorit.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/nav.js",
  "/js/favorit.js",
  "/js/idb.js",
  "/assets/logo.png"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  const base_url = "http://api.football-data.org/v2/competitions/2021/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
          return response || fetch (event.request);
      })
    )
  }
});