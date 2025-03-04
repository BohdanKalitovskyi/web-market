export function setupPagination(currentPage, loadProducts) {
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
}