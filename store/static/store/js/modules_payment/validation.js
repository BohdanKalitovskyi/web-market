export function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expirationDate = document.getElementById('expiration-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    const regexPatterns = {
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        phone: /^\+?\d{9,15}$/,
        cardNumber: /^\d{4} \d{4} \d{4} \d{4}$/,
        cvv: /^\d{3}$/,
        expDate: /^(0[1-9]|1[0-2])\/\d{2}$/
    };

    if (!name) {
        alert('Please enter your name.');
        return false;
    }

    if (!regexPatterns.email.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (!address) {
        alert('Please enter your address.');
        return false;
    }

    if (!regexPatterns.phone.test(phone)) {
        alert('Please enter a valid phone number.');
        return false;
    }

    if (!regexPatterns.cardNumber.test(cardNumber)) {
        alert('Please enter a valid card number in the format: XXXX XXXX XXXX XXXX.');
        return false;
    }

    if (!regexPatterns.expDate.test(expirationDate)) {
        alert('Expiration date must be in MM/YY format (e.g., 03/25) with a valid month (01-12).');
        return false;
    }

    const [month, year] = expirationDate.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        alert('Card has expired');
        return false;
    }

    if (!regexPatterns.cvv.test(cvv)) {
        alert('CVV must be 3 digits');
        return false;
    }

    return true;
}

const cardNumberInput = document.getElementById('card-number');
cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 16);

    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }

    e.target.value = formattedValue;
});

const expirationDateInput = document.getElementById('expiration-date');
expirationDateInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 4);

    if (value.length > 2) {
        e.target.value = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else {
        e.target.value = value;
    }
});
