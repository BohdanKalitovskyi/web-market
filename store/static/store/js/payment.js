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

            
            // Validation checks
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            const cardNumber = document.getElementById('card-number').value;

            // Name validation
            if (name.trim() === '') {
                alert('Please enter your name.');
                return;
            }

            // Email validation (basic check)
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Address validation
            if (address.trim() === '') {
                alert('Please enter your address.');
                return;
            }

            // Phone validation (basic phone number check)
            const phoneRegex = /^\+?\d{9,15}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Card number validation (basic check for format)
            const cardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
            if (!cardRegex.test(cardNumber)) {
                alert('Please enter a valid card number in the format: XXXX XXXX XXXX XXXX.');
                return;
            }


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
