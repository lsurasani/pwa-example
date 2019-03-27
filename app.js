async function fetchCats() {
    const response = await fetch('https://api.thecatapi.com/v1/images/search')
    const json = await response.json()
    const container = document.getElementById("container")
    container.innerHTML = `<img src=${json[0].url}>`
}

window.addEventListener('load', async e => {
    await fetchCats();

    if ('serviceWorker' in navigator) { // checks if browser supports service workers
        try {
            navigator.serviceWorker.register('serviceWorker.js'); // register service worker
            console.log('SW registered');

        } catch (error) {
            console.log('SW failed');

        }
    }
});

