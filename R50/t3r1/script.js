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

// Function to populate category dropdown
function populateCategoryDropdown(data) {
    const categoryDropdown = document.getElementById('category');
    const categories = [...new Set(data.map(item => item.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
}

// Function to populate item dropdown based on category
function populateItemDropdown(data, category) {
    const itemDropdown = document.getElementById('item');
    itemDropdown.innerHTML = '';
    const items = data.filter(item => item.category === category);
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = `${item.name} ($${item.price})`;
        itemDropdown.appendChild(option);
    });
}

// Function to add new item fields
function addItemField() {
    const itemFields = document.getElementById('item-fields');
    const newItemField = document.createElement('div');
    newItemField.innerHTML = `
        <label for="category${itemFields.children.length + 1}">Category:</label>
        <select id="category${itemFields.children.length + 1}" name="category${itemFields.children.length + 1}"></select>
        <label for="item${itemFields.children.length + 1}">Item:</label>
        <select id="item${itemFields.children.length + 1}" name="item${itemFields.children.length + 1}"></select>
        <label for="quantity${itemFields.children.length + 1}">Quantity:</label>
        <input type="number" id="quantity${itemFields.children.length + 1}" name="quantity${itemFields.children.length + 1}">
    `;
    itemFields.appendChild(newItemField);
    const categoryDropdown = document.getElementById(`category${itemFields.children.length}`);
    const itemDropdown = document.getElementById(`item${itemFields.children.length}`);
    const data = JSON.parse(localStorage.getItem('groceryList'));
    populateCategoryDropdown(data);
    categoryDropdown.addEventListener('change', (e) => {
        populateItemDropdown(data, e.target.value);
    });
    populateItemDropdown(data, categoryDropdown.value);
}

// Calculate total estimate
function calculateTotal(data, items) {
    let total = 0;
    items.forEach((item) => {
        const product = data.find((product) => product.name === item.name);
        if (product) {
            total += product.price * item.quantity;
        }
    });
    return total.toFixed(2);
}

// Display the final quote
function displayQuote(total) {
    const quoteElement = document.getElementById('dollars');
    quoteElement.innerHTML = `<font color="red">Your shopping list costs approximately: $${total}</font>`;
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
    const data = JSON.parse(localStorage.getItem('groceryList'));
    const total = calculateTotal(data, items);
    displayQuote(total);
}

// Initialize the application
async function init() {
    const data = await loadCsvData();
    localStorage.setItem('groceryList', JSON.stringify(data));
    const categoryDropdown = document.getElementById('category');
    const itemDropdown = document.getElementById('item');
    populateCategoryDropdown(data);
    categoryDropdown.addEventListener('change', (e) => {
        populateItemDropdown(data, e.target.value);
    });
    populateItemDropdown(data, categoryDropdown.value);
    const form = document.getElementById('grocery-form');
    form.addEventListener('submit', handleSubmit);
    const addItemButton = document.getElementById('add-item-btn');
    addItemButton.addEventListener('click', addItemField);
}

init();