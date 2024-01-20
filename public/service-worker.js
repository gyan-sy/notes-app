const CACHE_NAME = "your-app-cache-v3";
const urlsToCache = [
  "./",
  "./index.html",
  "./notes-app.png",
  "./src/index.js",
  "./src/index.css",
  "./src/App.js",
  "./src/App.css",
  "./src/components/Note/Note.js",
  "./src/components/Note/Note.css",
  "./src/components/NoteContainer/NoteContainer.js",
  "./src/components/NoteContainer/NoteContainer.css",
  "./src/components/Sidebar/Sidebar.js",
  "./src/components/Sidebar/Sidebar.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
