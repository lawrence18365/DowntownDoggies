// loader.js
(function() {
    const loaderContainer = document.querySelector('.loader-container');
    if (loaderContainer) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                loaderContainer.style.opacity = '0';
                loaderContainer.style.visibility = 'hidden';
                document.body.classList.add('loaded');
            }, 2000); // 2 second delay
        });
    }
})();
