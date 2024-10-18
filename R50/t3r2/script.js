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

// Parse CSV data
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

// Populate category drop-down box
async function populateCategories() {
    const data = await loadCsvData();
    const categories = [...new Set(data.map(item => item.category))];
    const categorySelect = document.getElementById('category');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Populate item drop-down box based on selected category
async function populateItems() {
    const category = document.getElementById('category').value;
    const data = await loadCsvData();
    const items = data.filter(item => item.category === category);
    const itemSelect = document.getElementById('item');
    itemSelect.innerHTML = '';
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = `${item.name} ($${item.price})`;
        itemSelect.appendChild(option);
    });
}

// Add event listener to category drop-down box
document.getElementById('category').addEventListener('change', populateItems);

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
    const itemNames = formData.getAll('item');
    const quantities = formData.getAll('quantity');
    itemNames.forEach((itemName, index) => {
        items.push({ name: itemName, quantity: parseInt(quantities[index]) });
    });
    const data = await loadCsvData();
    const total = calculateTotal(data, items);
    displayQuote(total);
}

// Initialize the application
async function init() {
    await populateCategories();
    await populateItems();
    const form = document.getElementById('grocery-form');
    form.addEventListener('submit', handleSubmit);
}

init();