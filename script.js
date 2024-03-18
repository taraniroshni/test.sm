document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'YOUR_API_KEY';
    const nasdaqUrl = `https://cloud.iexapis.com/stable/stock/market/list/mostactive?listLimit=10&token=${apiKey}`;
    const stockList = document.getElementById('stock-list');
    const searchInput = document.getElementById('search-input');

    fetch(nasdaqUrl)
        .then(response => response.json())
        .then(data => {
            displayStocks(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayStocks(stocks) {
        stockList.innerHTML = '';
        stocks.forEach(stock => {
            const listItem = document.createElement('li');
            listItem.textContent = `${stock.companyName} (${stock.symbol}): $${stock.latestPrice}`;
            stockList.appendChild(listItem);
        });
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') {
            // If search input is empty, display all stocks again
            fetch(nasdaqUrl)
                .then(response => response.json())
                .then(data => {
                    displayStocks(data);
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            // Filter stocks based on search term
            fetch(nasdaqUrl)
                .then(response => response.json())
                .then(data => {
                    const filteredStocks = data.filter(stock => {
                        return stock.symbol.toLowerCase().includes(searchTerm) || stock.companyName.toLowerCase().includes(searchTerm);
                    });
                    displayStocks(filteredStocks);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    });
});
