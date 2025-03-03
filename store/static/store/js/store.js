document.addEventListener('DOMContentLoaded', function() {

    const productContainer = document.querySelector('.product-grid');
    const searchInput = document.getElementById('search');
    const cartIcon = document.querySelector('.user-cart');
    const cartCount = document.createElement('span');
    cartCount.classList.add('cart-count');
    cartCount.innerText = '0';
    cartIcon.appendChild(cartCount);

    let currentPage = 1;
    const productsPerPage = 15;
    let cart = [];
    let allProducts = [];
    let filteredProducts = [];

    // Fetch all products from API
    async function fetchAllProducts() {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=200&select=id,title,price,images');
            const data = await response.json();
            allProducts = data.products;
            loadProducts(currentPage);
        } catch (error) {
            console.error('Error loading all products:', error);
        }
    }

    // Load products on the current page
    function loadProducts(page) {
        const start = (page - 1) * productsPerPage;
        const productsToShow = searchInput.value ? filteredProducts.slice(start, start + productsPerPage) : allProducts.slice(start, start + productsPerPage);
        renderProducts(productsToShow);
        document.getElementById('page-number').innerText = page;
        toggleButtons(page);
    }

    // Render product cards
    function renderProducts(products) {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <button 
                    class="add-to-cart" 
                    data-id="${product.id}" 
                    data-title="${product.title}" 
                    data-price="${product.price}" 
                    data-image="${product.images[0]}">
                    Add to the cart
                </button>
                <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
                <h3>${product.title}</h3>
                <p>${product.price} $</p>
            `;
            productContainer.appendChild(productCard);
        });
        addCartButtons();
    }

    // Filter products on search input
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm === '') {
            filteredProducts = [];
            loadProducts(currentPage);
        } else {
            filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(searchTerm));
            currentPage = 1;
            loadProducts(currentPage);
        }
    });

    // Toggle visibility of pagination buttons
    function toggleButtons(page) {
        const previousButton = document.getElementById('previous');
        if (page === 1) {
            previousButton.style.display = 'none'; 
        } else {
            previousButton.style.display = 'inline-block';
        }

        const productsToShow = searchInput.value ? filteredProducts : allProducts;
        if (page * productsPerPage < productsToShow.length) {
            document.getElementById('next').style.display = 'inline-block';
        } else {
            document.getElementById('next').style.display = 'none';
        }
    }

    fetchAllProducts();

    // Cart functionality

    // Add item to cart
    function addToCart(id, title, price, image) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, title, price, image, quantity: 1 });
        }
        updateCartUI();
    }

    // Remove item from cart
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    }

    // Update cart UI
    function updateCartUI() {
        cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.style.display = cart.length > 0 ? 'block' : 'none';

        cartItemsContainer.innerHTML = cart.length === 0 ? '<p>Cart is empty</p>' : '';

        const cartTotal = document.querySelector('.cart-total');
        const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotal.innerText = `Total: $${totalAmount.toFixed(2)}`;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <p>${item.title}</p>
                    <p>${item.price} $</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">×</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                removeFromCart(this.dataset.id);
            });
        });
    }

    // Add event listeners to add-to-cart buttons
    function addCartButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                const title = this.dataset.title;
                const price = this.dataset.price;
                const image = this.dataset.image;
                addToCart(id, title, price, image);
            });
        });
    }

    // Cart sidebar
    const cartSidebar = document.createElement('div');
    cartSidebar.classList.add('cart-sidebar');
    cartSidebar.innerHTML = `
    <div class="cart-header">
        <h2>The cart</h2>
        <span class="cart-total">Total: $0</span> 
        <button class="close-cart">&times;</button>
    </div>
    <div class="cart-items"></div>
    <button class="checkout-btn">Pay</button>
    `;
    document.body.appendChild(cartSidebar);

    const closeCartBtn = cartSidebar.querySelector('.close-cart');
    const cartItemsContainer = cartSidebar.querySelector('.cart-items');

    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.toggle('active');
    });

    closeCartBtn.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
    });

    // Pagination Controls
    loadProducts(currentPage);

    document.getElementById('previous').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            loadProducts(currentPage);
        }
    });

    document.getElementById('next').addEventListener('click', function() {
        currentPage++;
        loadProducts(currentPage);
    });

    // Checkout functionality
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Pay button clicked');
        window.location.href = '/payment/';
    });

});




