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

// Cache the grocery list in local storage
async function cacheGroceryList() {
    const cachedList = localStorage.getItem('groceryList');
    if (!cachedList) {
        const groceryList = await loadCsvData();
        localStorage.setItem('groceryList', JSON.stringify(groceryList));
        return groceryList;
    }
    return JSON.parse(cachedList);
}

// Function to add new input fields for items and quantities dynamically
function addNewItem() {
    const itemInput = document.createElement('input');
    itemInput.type = 'text';
    itemInput.placeholder = 'Enter item name';
    itemInput.name = `item${document.querySelectorAll('input[type="text"]').length}`;

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.placeholder = 'Enter quantity';
    quantityInput.name = `quantity${document.querySelectorAll('input[type="number"]').length}`;

    const errorSpan = document.createElement('span');
    errorSpan.style.color = 'red';

    const itemContainer = document.createElement('div');
    itemContainer.appendChild(itemInput);
    itemContainer.appendChild(quantityInput);
    itemContainer.appendChild(errorSpan);

    document.getElementById('item-list').appendChild(itemContainer);
}

// Calculate total estimate
async function calculateTotal() {
    const groceryList = await cacheGroceryList();
    const items = document.querySelectorAll('input[type="text"]');
    const quantities = document.querySelectorAll('input[type="number"]');
    let total = 0;
    let hasError = false;

    items.forEach((item, index) => {
        const itemName = item.value;
        const quantity = parseInt(quantities[index].value);
        const product = groceryList.find((product) => product.name.toLowerCase() === itemName.toLowerCase());
        if (product) {
            total += product.price * quantity;
        } else {
            const errorSpan = item.parentNode.querySelector('span');
            errorSpan.textContent = 'Item not found';
            hasError = true;
        }
    });

    if (hasError) {
        document.getElementById('total').style.color = 'red';
        document.getElementById('total').textContent = 'Error calculating total';
    } else {
        document.getElementById('total').style.color = 'black';
        document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
    }
}

// Search for a product in the list
async function searchProduct() {
    const groceryList = await cacheGroceryList();
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const product = groceryList.find((product) => product.name.toLowerCase() === searchInput);
    if (product) {
        document.getElementById('search-result').textContent = `Product found: ${product.name}`;
    } else {
        document.getElementById('search-result').textContent = 'Product not found';
    }
}

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();
    await calculateTotal();
}

// Handle search form submission
async function handleSearchSubmit(event) {
    event.preventDefault();
    await searchProduct();
}

// Initialize the application
async function init() {
    const form = document.getElementById('grocery-form');
    form.addEventListener('submit', handleSubmit);
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', handleSearchSubmit);
    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', addNewItem);
    await cacheGroceryList();
}

init();