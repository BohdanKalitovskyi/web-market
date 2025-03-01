document.addEventListener('DOMContentLoaded', function() {

    const productContainer = document.querySelector('.product-grid');
    let currentPage = 1;
    const productsPerPage = 15;

    function loadProducts(page) {
        const start = (page - 1) * productsPerPage
        fetch(`https://dummyjson.com/products?skip=${start}&limit=${productsPerPage}`)
            .then(response => response.json())
            .then(data => {
                console.log('Loaded Data:', data);
                productContainer.innerHTML = '';

                data.products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <img src="${product.images[0]}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>${product.price} $</p>
                    `;
                    productContainer.appendChild(productCard);
                });

                document.getElementById('page-number').innerText = page;

                toggleButtons(page);
            })
            .catch(error => console.error('Error loading products:', error));
    }

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
});