export async function fetchAllProducts(allProducts, loadProducts, currentPage) {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=200&select=id,title,price,images,rating,category,tags');
        const data = await response.json();
        allProducts.length = 0;
        allProducts.push(...data.products);
        loadProducts(currentPage);
    } catch (error) {
        console.error('Error loading all products:', error);
    }
}