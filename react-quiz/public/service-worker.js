const CACHE_NAME = "quiz-app-cache-v3";


const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/vite.svg",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/assets/index-BVUvczfX.css",
  "/assets/index-Dz7c6dcl.js",
  "/assets/rainbow-DezXENOj.png"
];


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});


self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.map(n => {
          if (n !== CACHE_NAME) return caches.delete(n);
        })
      )
    )
  );
  self.clients.claim();
});


self.addEventListener("fetch", event => {
  const request = event.request;

  
  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then(cached => cached || fetch(request))
    );
    return;
  }

  
  const apiHost = "quiz-api-kqm9.onrender.com";
  if (request.url.includes(apiHost)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request)) 
    );
    return;
  }

  
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request)
        .then(response => {
          
          if (
            request.method === "GET" &&
            response.status === 200 &&
            response.type === "basic"
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          
          if (request.destination === "document") {
            return caches.match("/index.html");
          }
        });
    })
  );
});
