export function setupFilters(currentPage, loadProducts) {
    const priceFilter = document.getElementById('price-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const priceRange = document.getElementById('price-range');
    const ratingRange = document.getElementById('rating-range');
    const toggleImagesBtn = document.getElementById('toggle-images');

    window.showImages = true;

    priceFilter.addEventListener('input', function() {
        priceRange.innerText = `$${priceFilter.value}`;
        loadProducts(currentPage);
    });

    ratingFilter.addEventListener('input', function() {
        ratingRange.innerText = `${ratingFilter.value} ★`;
        loadProducts(currentPage);
    });

    toggleImagesBtn.addEventListener('click', function() {
        window.showImages = !window.showImages;
        loadProducts(currentPage);
    });
}