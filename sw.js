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
    'css/bootstrap.min.css',
    'css/custom.css',
    'css/fontawesome-all.min.css',
    'css/slick.css',
    'css/styles-modified.css',
    'images/bitcoin-300x114.png',
    'images/BITRDP Logo.jpg',
    'images/BITRDP_Logo_2.png',
    'images/btn-search.svg',
    'images/cc.png',
    'images/chat.svg',
    'images/cloud-bg-df.png',
    'images/cloud-bg-sm.png',
    'images/cloud-bg.svg',
    'images/cloud-bg2.svg',
    'images/custom-bg.svg',
    'images/FAVICON 2.png',
    'images/FAVICON.png',
    'images/FAVICON2.png',
    'images/feature1.png',
    'images/feature2.png',
    'images/feature3.png',
    'images/feature4.png',
    'images/feature5.png',
    'images/feature6.png',
    'images/info.svg',
    'images/lock.svg',
    'images/logo-dark.svg',
    'images/logo.svg',
    'images/office.png',
    'images/paytm-300x100.png',
    'images/Payza-300x188.png', 
    'images/perfectmoney-300x62.png',
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/post-img1.png',
    'images/post-img2.png',
    'images/post-img3.png',
    'images/post-photo1.jpg',
    'images/post-photo2.jpg',
    'images/pp.png',
    'images/server1.svg',
    'images/server2.svg',
    'images/server3.svg',
    'images/server4.svg',
    'images/server5.svg',
    'images/server6.svg',
    'images/servervirtualization_build-servers_08.png',
    'images/skrill-300x131.png',
    'images/skype-seeklogo.com.svg',
    'images/Skype.svg',
    'images/slide-img1.png',
    'images/slide-img2.png',
    'images/slide-img3.png',
    'images/slide-img4.png',
    'images/tlds.jpg',
    'images/What-is-A-Hybrid-Server.jpg',
    'acceptable-usage-policy.html',
    'blog.html',
    'bottingrdp.html',
    'cheaprdp.html',
    'contact.html',
    'dedicated-server.html',
    'encodingrdp.html',
    'faq.html',
    'login.html',
    'northamericardp.html',
    'refund.html',
    'register.html',
    'usawindowsvps.html',
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