export function addToCart(id, title, price, image) {
    const cart = window.globalState.cart;
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }
    window.globalFunctions.updateCartUI();
}

export function removeFromCart(id) {
    window.globalState.cart = window.globalState.cart.filter(item => item.id !== id);
    window.globalFunctions.updateCartUI();
}

export function updateCartUI() {
    const cart = window.globalState.cart;
    const cartCount = window.globalState.cartCount;
    const cartItemsContainer = document.querySelector('.cart-items');

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
            window.globalFunctions.removeFromCart(this.dataset.id);
        });
    });
}