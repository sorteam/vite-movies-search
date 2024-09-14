const cacheName = "Static_v1";

self.addEventListener("fetch", (event) => {
  if (event.request.url.endsWith("lottie.json")) {
    event.respondWith(
      caches.open(cacheName).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then(
            (networkResponse) => {
              cache.put(event.request, networkResponse.clone());

              return networkResponse;
            }
          );

          return cachedResponse || fetchedResponse;
        });
      })
    );
  } else {
    return;
  }
});
