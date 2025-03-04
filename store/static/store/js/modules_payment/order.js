export function submitOrder(cart) {
    const orderData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        cart: cart
    };

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
}
