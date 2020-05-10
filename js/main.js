if ('servcieWorker in navigator') {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            //.register('../sw_cached_pages.js')
            .register('../sw_cached_site.js')
            .then(reg => console.log('Service Worker: Registered'))
            .catch(err => console.log(`Service Worker: Error: ${err}`));
    });
}