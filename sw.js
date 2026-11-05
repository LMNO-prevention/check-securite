// Service worker : met en cache uniquement la coquille de l'application (icône, écran de démarrage).
// L'application Apps Script elle-même est toujours chargée depuis le réseau.
const VERSION = 'v1';
const CACHE = 'check-securite-' + VERSION;
const FICHIERS = ['./', './index.html', './config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;   // on ne touche pas à Google
  e.respondWith(
    fetch(req).then(res => {
      const copie = res.clone();
      caches.open(CACHE).then(c => c.put(req, copie));
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
