// Load CSV file and parse its data
async function loadCsvData() {
    try {
        const response = await fetch('grocery_list.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvData = await response.text();
        const parsedData = parseCsv(csvData);
        return parsedData;
    } catch (error) {
        console.error('Error loading CSV file:', error);
        return [];
    }
}

function parseCsv(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const data = lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
    });
    return data;
}

// Calculate total estimate
function calculateTotal(data, items) {
    let total = 0;
    items.forEach((item) => {
        const product = data.find((product) => product.name.toLowerCase() === item.name.toLowerCase());
        if (product) {
            total += product.price * item.quantity;
        }
    });
    return total.toFixed(2);
}

// Search for a product in the list
function searchProduct(data, searchInput) {
    const product = data.find((product) => product.name.toLowerCase() === searchInput.toLowerCase());
    return product;
}

// Display the search result
function displaySearchResult(result) {
    const searchResultElement = document.getElementById('searcher');
    if (result) {
        searchResultElement.innerHTML = `Search result found, <font color="Red">${result.name}</font> is a product type sold: <font color="Red">${result.description}</font>`;
    } else {
        searchResultElement.innerHTML = 'No search results or product on list.';
    }
}

// Display the final quote
function displayQuote(total) {
    const quoteElement = document.getElementById('dollars');
    if (isNaN(total)) {
        quoteElement.innerHTML = '<font color="red">Incorrect item name - please try again.</font>';
    } else {
        quoteElement.innerHTML = `<font color="red">Your shopping list costs approximately: $${total}</font>`;
    }
}

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const items = [];
    for (const [key, value] of formData.entries()) {
        if (key.startsWith('item')) {
            const itemName = value;
            const quantity = formData.get(`quantity${key.replace('item', '')}`);
            items.push({ name: itemName, quantity: parseInt(quantity) });
        }
    }
    const data = await loadCsvData();
    const total = calculateTotal(data, items);
    displayQuote(total);
}

// Handle search form submission
async function handleSearchSubmit(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchlist').value.toLowerCase();
    const data = await loadCsvData();
    const result = searchProduct(data, searchInput);
    displaySearchResult(result);
}

// Initialize the application
async function init() {
    const data = await loadCsvData();
    const form = document.getElementById('grocery-form');
    form.addEventListener('submit', handleSubmit);
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', handleSearchSubmit);
}

init();