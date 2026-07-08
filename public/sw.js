const CACHE_NAME = 'aegis-cache-v1';
const STATIC_ASSETS_CACHE = 'aegis-static-v1';
const API_CACHE = 'aegis-api-v1';
const MAPS_CACHE = 'aegis-maps-v1';

const PRECACHE_ASSETS = [
  '/',
  '/dashboard',
  '/manifest.json',
  '/offline.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_ASSETS_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => {
          return name.startsWith('aegis-') && 
                 ![STATIC_ASSETS_CACHE, API_CACHE, MAPS_CACHE].includes(name);
        }).map((name) => {
          return caches.delete(name);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Cache Strategies
const cacheFirst = async (request) => {
  const cache = await caches.open(STATIC_ASSETS_CACHE);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) return cachedResponse;
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Offline fallback for navigation
    if (request.mode === 'navigate') {
      return cache.match('/offline.html');
    }
    throw error;
  }
};

const networkFirst = async (request) => {
  const cache = await caches.open(API_CACHE);
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;
    throw error;
  }
};

const staleWhileRevalidate = async (request, cacheName = MAPS_CACHE) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const networkFetch = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => null);

  return cachedResponse || networkFetch;
};

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Network Only: WebSockets, Auth, AI, Next.js hot reload
  if (
    url.protocol === 'ws:' || 
    url.protocol === 'wss:' || 
    url.pathname.startsWith('/api/v1/auth') || 
    url.pathname.startsWith('/api/v1/ai') ||
    url.pathname.includes('/_next/webpack-hmr')
  ) {
    return; // Fall through to standard network fetch
  }

  // API Requests -> Network First
  if (url.pathname.startsWith('/api/v1/')) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Maps / Venue Data -> Stale While Revalidate
  if (url.pathname.includes('/api/v1/map') || url.pathname.includes('/images/map')) {
    event.respondWith(staleWhileRevalidate(event.request));
    return;
  }

  // Static Assets (_next/static, images) -> Cache First
  if (url.pathname.startsWith('/_next/static/') || url.pathname.match(/\.(png|jpg|jpeg|svg|woff2)$/)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Default Page Navigation -> Network First (so we always get latest HTML if online)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html') || caches.match('/dashboard'))
    );
    return;
  }
});
