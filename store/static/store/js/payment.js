document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Add cart items to the list
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;">
            ${item.title} - ${item.quantity} p. - $${item.price * item.quantity}
        `;
        cartList.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    // Update total price
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Handle form submission
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Prepare the order data
            const orderData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                phone: document.getElementById('phone').value,
                cart: cart
            };

            // Send order to the server
            fetch('/api/v1/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify(orderData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Successful order!');
                localStorage.removeItem('cart');
                window.location.href = '/';
            })
            .catch(error => console.error('Error while ordering:', error));
        });
    }
});
