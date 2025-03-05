export function setupCartSidebar(cartIcon, cart, updateCartUI) {
    const cartSidebar = document.createElement('div');
    cartSidebar.classList.add('cart-sidebar');
    cartSidebar.innerHTML = `
        <div class="cart-header">
            <h2>The cart</h2>
            <span class="cart-total">Total: $0</span> 
            <button class="close-cart">×</button>
        </div>
        <div class="cart-items"></div>
        <button class="checkout-btn">Pay</button>
    `;
    document.body.appendChild(cartSidebar);

    const closeCartBtn = cartSidebar.querySelector('.close-cart');

    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.toggle('active');
    });

    closeCartBtn.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) return;
        localStorage.setItem('cart', JSON.stringify(window.globalState.cart));
        window.location.href = '/payment/';
    });
}