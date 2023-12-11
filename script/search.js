let isSearchResultsVisible = false;

document.addEventListener('click', function (event) {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    const isClickInsideSearchInput = searchInput.contains(event.target);
    const isClickInsideSearchResults = searchResults.contains(event.target);

    if (!isClickInsideSearchInput && !isClickInsideSearchResults && isSearchResultsVisible) {
        searchResults.classList.remove('show');
        isSearchResultsVisible = false;
    }
});

document.addEventListener('click', function (event) {
    const searchResults = document.getElementById('searchResults');

    const isClickInsideSearch = searchResults.contains(event.target);

    if (!isClickInsideSearch) {
        searchResults.classList.remove('show');
    }
});

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const productsList = document.getElementById('productsList');

    const searchTerm = searchInput.value.toLowerCase();

    searchResults.innerHTML = '';

    for (const option of productsList.options) {
        const productValue = option.value.toLowerCase();

        if (productValue.includes(searchTerm)) {
            const resultItem = document.createElement('div');
            resultItem.textContent = option.value;

            if (option.dataset.img) {
                const img = document.createElement('img');
                img.src = option.dataset.img;
                resultItem.appendChild(img);
            }

            resultItem.addEventListener('click', function () {
                const productUrl = option.dataset.url;
                if (productUrl) {
                    window.location.href = productUrl;
                }
            });

            searchResults.appendChild(resultItem);
        }
    }

    if (searchResults.children.length > 0) {
        searchResults.classList.add('show');
    } else {
        searchResults.classList.remove('show');
    }
    isSearchResultsVisible = searchTerm.length > 0;
    searchResults.classList.toggle('show', isSearchResultsVisible);
}

document.getElementById('searchInput').addEventListener('click', function () {
    const searchResults = document.getElementById('searchResults');
    searchResults.classList.add('show');
    isSearchResultsVisible = true;
});

document.addEventListener('DOMContentLoaded', function () {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', searchProducts);
});
