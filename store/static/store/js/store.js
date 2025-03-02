

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

    function loadProducts(page) {
        const start = (page - 1) * productsPerPage;
        fetch(`https://dummyjson.com/products?skip=${start}&limit=${productsPerPage}`)
            .then(response => response.json())
            .then(data => {
                allProducts = data.products;
                renderProducts(allProducts);
                document.getElementById('page-number').innerText = page;
                toggleButtons(page);
                addCartButtons();
            })
            .catch(error => console.error('Error loading products:', error));
    }
    
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
                <img src="${product.images[0]}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.price} $</p>
            `;
            productContainer.appendChild(productCard);
        });
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase(); // Отримуємо текст пошуку і перетворюємо його в малий регістр
        const filteredProducts = allProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm) // Фільтруємо продукти по заголовку
        );
        renderProducts(filteredProducts); // Відображаємо відфільтровані продукти
    });

    function toggleButtons(page) {
        const prevButton = document.getElementById('previous');
        const nextButton = document.getElementById('next');

        if (page === 1) {
            prevButton.style.display = 'none';
        } else {
            prevButton.style.display = 'inline-block';
        }

        fetch(`https://dummyjson.com/products?skip=${page * productsPerPage}&limit=${productsPerPage}`)
            .then(response => response.json())
            .then(data => {
                if (data.products.length < productsPerPage) {
                    nextButton.style.display = 'none';
                } else {
                    nextButton.style.display = 'inline-block';
                }
            });
    }

    /* cart --------*/


    function addToCart(id, title, price, image) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, title, price, image, quantity: 1 });
        }

        updateCartUI();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    }

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

    // cart sidebar
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


    /* ------- */
    
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
    /* -------- */

    const checkoutBtn = document.querySelector('.checkout-btn');

    checkoutBtn.addEventListener('click', function() {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Pay button clicked');
        window.location.href = '/payment/';
    });

 /*    ----------- */
 

});



