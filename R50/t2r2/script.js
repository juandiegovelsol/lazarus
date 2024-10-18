// Load CSV file and parse its data
async function loadCsvData() {
    try {
        const cachedData = localStorage.getItem('groceryList');
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        const response = await fetch('grocery_list.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvData = await response.text();
        const parsedData = parseCsv(csvData);
        localStorage.setItem('groceryList', JSON.stringify(parsedData));
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

// Function to add new item fields
function addItemField() {
    const itemFields = document.getElementById('item-fields');
    const newItemField = document.createElement('div');
    newItemField.innerHTML = `
        <label for="item${itemFields.children.length + 1}">Item ${itemFields.children.length + 1}:</label>
        <input type="text" id="item${itemFields.children.length + 1}" name="item${itemFields.children.length + 1}">
        <label for="quantity${itemFields.children.length + 1}">Quantity:</label>
        <input type="number" id="quantity${itemFields.children.length + 1}" name="quantity${itemFields.children.length + 1}">
        <span id="error${itemFields.children.length + 1}" class="error"></span>
    `;
    itemFields.appendChild(newItemField);
}

// Update calculateTotal function to iterate through all items
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

// Update handleSubmit function to get all item fields
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
    // Display error messages for invalid items
    items.forEach((item, index) => {
        const errorSpan = document.getElementById(`error${index + 1}`);
        const product = data.find((product) => product.name.toLowerCase() === item.name.toLowerCase());
        if (!product) {
            errorSpan.textContent = 'Invalid item name';
        } else {
            errorSpan.textContent = '';
        }
    });
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