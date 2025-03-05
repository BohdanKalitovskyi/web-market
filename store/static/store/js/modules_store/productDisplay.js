export function loadProducts(page, allProducts = window.globalState.allProducts, searchInput = window.globalState.searchInput, productContainer = window.globalState.productContainer) {
    const productsPerPage = window.globalState.productsPerPage;
    const start = (page - 1) * productsPerPage;

    let filtered = allProducts.filter(product => {
        return product.price <= document.getElementById('price-filter').value && product.rating >= document.getElementById('rating-filter').value;
    });

    if (searchInput.value) {
        const searchTerm = searchInput.value.toLowerCase();
        filtered = filtered.filter(product => product.title.toLowerCase().includes(searchTerm));
    }

    const productsToShow = filtered.slice(start, start + productsPerPage);

    renderProducts(productsToShow, productContainer);
    document.getElementById('page-number').innerText = page;
    window.globalFunctions.toggleButtons(page);
}

export function renderProducts(products, productContainer) {
    productContainer.innerHTML = '';
    products.forEach((product,index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.style.setProperty('--order', index);
        productCard.innerHTML = `
            <button 
                class="add-to-cart" 
                data-id="${product.id}" 
                data-title="${product.title}" 
                data-price="${product.price}" 
                data-image="${product.images[0]}">
                Add to the cart
            </button>
            ${window.showImages ? `<img src="${product.images[0]}" alt="${product.title}" loading="lazy">` : ''}
            <h3>${product.title}</h3>
            <p>${product.price} $</p>
            <p>Rating: ${product.rating} ★</p>
        `;
        productContainer.appendChild(productCard);
    });
    window.globalFunctions.addCartButtons();
}