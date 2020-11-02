importScripts('/js/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

const CACHE_NAME = "liga-inggris";

workbox.precaching.precacheAndRoute([
  { url: '/manifest.json', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/klasemen.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/tentang.html', revision: '1' },
  { url: '/favorit.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/notification.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/favorit.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/assets/logo.png', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.staleWhileRevalidate({
	  cacheName: CACHE_NAME
  })
);

self.addEventListener("fetch", function(event) {
  const base_url = "http://api.football-data.org";
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

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});