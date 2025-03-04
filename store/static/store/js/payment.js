import { updateCart } from './modules_payment/cart_payment.js';
import { validateForm } from './modules_payment/validation.js';
import { submitOrder } from './modules_payment/order.js';

document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    updateCart();

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!validateForm()) {
                return;
            }

            submitOrder(cart);
        });
    }
});
