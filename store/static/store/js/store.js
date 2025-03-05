import { fetchAllProducts } from './modules_store/productFetch.js';
import { loadProducts, renderProducts } from './modules_store/productDisplay.js';
import { toggleButtons, addCartButtons } from './modules_store/uiControls.js';
import { addToCart, removeFromCart, updateCartUI } from './modules_store/cart.js';
import { setupCartSidebar } from './modules_store/cartSidebar.js';
import { setupPagination } from './modules_store/pagination.js';
import { setupFilters } from './modules_store/filters.js';



document.addEventListener('DOMContentLoaded', function() {

    const productContainer = document.querySelector('.product-grid');
    const searchInput = document.getElementById('search');
    const cartIcon = document.querySelector('.user-cart');
    const cartCount = document.createElement('span');
    cartCount.classList.add('cart-count');
    cartCount.innerText = '0';
    cartIcon.appendChild(cartCount);

    let currentPage = 1;
    const productsPerPage = 24;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let allProducts = [];
    let filteredProducts = [];


    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            cart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log('Cart reloaded from pageshow:', cart);
            updateCartUI();
        }
    });


    fetchAllProducts(allProducts, loadProducts, currentPage);

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm === '') {
            filteredProducts = [];
            loadProducts(currentPage, allProducts, searchInput, productContainer);
        } else {
            filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(searchTerm));
            currentPage = 1;
            loadProducts(currentPage, allProducts, searchInput, productContainer);
        }
    });

    setupCartSidebar(cartIcon, cart, updateCartUI);
    setupPagination(currentPage, loadProducts);
    setupFilters(currentPage, loadProducts);

    window.globalState = { currentPage, productsPerPage, cart, allProducts, filteredProducts, productContainer, searchInput, cartCount };
    window.globalFunctions = { loadProducts, renderProducts, toggleButtons, addCartButtons, addToCart, removeFromCart, updateCartUI };

    updateCartUI();
});
