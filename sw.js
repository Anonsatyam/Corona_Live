const assets = [
    '/',
    'index.html',
    'js/app.js',
    'js/main.js',
    'js/bootstrap.min.js',
    'js/cloud-animation.js',
    'js/jquery.min.js',
    'js/slick.min.js',
    'css/style.css',
    'css/styles-modified.css',
    'images/favicon.png',
    'images/breath.png',
    'images/cough.png',
    'images/fatigue.png',
    'images/fever.png',
];

const staticCacheName = 'static-site-v2';
const dynamicCache = 'dynamic-site-v1';


self.addEventListener('install', evt => {
    //console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            console.log('caching shell assets');
            return cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});