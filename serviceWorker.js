const staticAssets = [
    './',
    './styles.css',
    './app.js'
];

self.addEventListener('install', async event => { // triggered first time user hits the page
    console.log(caches)
    const cache = await caches.open('static-cat'); // opens caches -- creates with this name if it doesn't exist 
    cache.addAll(staticAssets); // populate with stylesheet and js files
});

self.addEventListener('fetch', event => { // intercept request
    const { request } = event;
    const url = new URL(request.url);
    if(url.origin === location.origin) {
        event.respondWith(cacheData(request)); // gets cached version of site if fetch request url matches current location
    } else {
        event.respondWith(networkFirst(request)); // gets version from network instead
    }

});

async function cacheData(request) {
    const cachedResponse = await caches.match(request); // find specified cache
    return cachedResponse || fetch(request); // fetches if cache can't be found
}

async function networkFirst(request) {
    const cache = await caches.open('dynamic-cat');

    try {
        const response = await fetch(request);
        cache.put(request, response.clone()); // puts response in cache
        return response;
    } catch (error) {
        return await cache.match(request);

    }

}