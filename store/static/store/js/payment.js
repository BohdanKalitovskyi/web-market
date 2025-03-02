document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;"> ${item.title} - ${item.quantity} p. - $${item.price * item.quantity}`;
        cartList.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    document.getElementById('order-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        fetch('/api/v1/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            body: JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                phone: document.getElementById('phone').value,
                cart: cart
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Successful order!');
            localStorage.removeItem('cart');
            window.location.href = '/';
        })
        .catch(error => console.error('Error while ordering:', error));
    });
});


