export function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const cardNumber = document.getElementById('card-number').value;
    const expirationDate = document.getElementById('expiration-date').value;
    const cvv = document.getElementById('cvv').value;

    if (name.trim() === '') {
        alert('Please enter your name.');
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (address.trim() === '') {
        alert('Please enter your address.');
        return false;
    }

    const phoneRegex = /^\+?\d{9,15}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number.');
        return false;
    }

    const cardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!cardRegex.test(cardNumber)) {
        alert('Please enter a valid card number in the format: XXXX XXXX XXXX XXXX.');
        return false;
    }

    const [month, year] = expirationDate.split('/');
    const currentYear = new Date().getFullYear() % 100; 
    const currentMonth = new Date().getMonth() + 1; 
    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        alert('Card has expired');
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert('CVV must be 3 digits');
        return;
    }
    

    return true;
}
