var cacheName = 'koushik-meenakshisundaram';
var filesToCache = [
  '/',
  '/index.html',
  '/css/resume.min.css',
  '/vendor/font-awesome/css/font-awesome.min.css',
  '/vendor/devicons/css/devicons.min.css',
  '/vendor/simple-line-icons/css/simple-line-icons.css'
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
