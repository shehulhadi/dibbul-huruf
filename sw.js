const CACHE = 'dibbul-huruf-v1';
const ASSETS = [
  '/dibbul-huruf/',
  '/dibbul-huruf/index.html',
  '/dibbul-huruf/manifest.json',
  '/dibbul-huruf/icon.svg',
  '/dibbul-huruf/pages/alif.html',
  '/dibbul-huruf/pages/ayn.html',
  '/dibbul-huruf/pages/ba.html',
  '/dibbul-huruf/pages/dad.html',
  '/dibbul-huruf/pages/dal.html',
  '/dibbul-huruf/pages/dhal.html',
  '/dibbul-huruf/pages/fa.html',
  '/dibbul-huruf/pages/ghayn.html',
  '/dibbul-huruf/pages/ha.html',
  '/dibbul-huruf/pages/ha2.html',
  '/dibbul-huruf/pages/jim.html',
  '/dibbul-huruf/pages/kaf.html',
  '/dibbul-huruf/pages/kha.html',
  '/dibbul-huruf/pages/lam.html',
  '/dibbul-huruf/pages/mim.html',
  '/dibbul-huruf/pages/nun.html',
  '/dibbul-huruf/pages/qaf.html',
  '/dibbul-huruf/pages/ra.html',
  '/dibbul-huruf/pages/sad.html',
  '/dibbul-huruf/pages/shin.html',
  '/dibbul-huruf/pages/sin.html',
  '/dibbul-huruf/pages/ta.html',
  '/dibbul-huruf/pages/ta2.html',
  '/dibbul-huruf/pages/tha.html',
  '/dibbul-huruf/pages/waw.html',
  '/dibbul-huruf/pages/ya.html',
  '/dibbul-huruf/pages/zal.html',
  '/dibbul-huruf/pages/zha.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('/dibbul-huruf/index.html'));
    })
  );
});
