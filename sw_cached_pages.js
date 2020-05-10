const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    '/js/main.js'
];

// Call Install Event
self.addEventListener('install', (e) => {
    console.log("Service Worker: Installed");

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');;
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

//  Call Activate Event
self.addEventListener('activate', (e) => {
    console.log("Service Worker: Activated");

    //  Remove unwanted  caches (the caches in the older version Cache Stroage)
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log("Service Worker: Clearing Old Cache");
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        // if there is no connection, the cache is used
        fetch(e.request).catch(() => caches.match(e.request))
    );
});