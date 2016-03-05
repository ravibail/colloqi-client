var cacheName = 'colloqi-client',
    urlsToCache = [
        
    ],
    loginResponse;
// Set the callback for the install step
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(cacheName)
            .then(function(cache) {
                cache.addAll(urlsToCache);
                console.log('Cache opened');
            })
    )
});

self.addEventListener('fetch', function(event) {
    
});