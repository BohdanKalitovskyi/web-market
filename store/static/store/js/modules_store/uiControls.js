export function toggleButtons(page) {
    const previousButton = document.getElementById('previous');
    if (page === 1) {
        previousButton.style.display = 'none';
    } else {
        previousButton.style.display = 'inline-block';
    }

    let filtered = window.globalState.allProducts.filter(product => {
        return product.price <= document.getElementById('price-filter').value && product.rating >= document.getElementById('rating-filter').value;
    });

    if (window.globalState.searchInput.value) {
        const searchTerm = window.globalState.searchInput.value.toLowerCase();
        filtered = filtered.filter(product => product.title.toLowerCase().includes(searchTerm));
    }

    const productsToShow = filtered;

    if (page * window.globalState.productsPerPage < productsToShow.length) {
        document.getElementById('next').style.display = 'inline-block';
    } else {
        document.getElementById('next').style.display = 'none';
    }
}

export function addCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.dataset.id;
            const title = this.dataset.title;
            const price = this.dataset.price;
            const image = this.dataset.image;
            window.globalFunctions.addToCart(id, title, price, image);
        });
    });
}