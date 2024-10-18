// Load the Papa Parse library
const Papa = require('papaparse');

// Function to load the CSV file
async function loadCSV(file) {
    try {
        const response = await fetch(file);
        const csv = await response.text();
        return Papa.parse(csv, { header: true });
    } catch (error) {
        console.error('Error loading CSV file:', error);
        return null;
    }
}

// Function to calculate the total cost
function calculateTotalCost(items, quantities, data) {
    let total = 0;
    items.forEach((item, index) => {
        const productIndex = data.findIndex((product) => product.name.toLowerCase() === item.toLowerCase());
        if (productIndex >= 0) {
            total += quantities[index] * data[productIndex].price;
        }
    });
    return total.toFixed(2);
}

// Function to search for a product
function searchProduct(searchInput, data) {
    const productIndex = data.findIndex((product) => product.name.toLowerCase() === searchInput.toLowerCase());
    if (productIndex >= 0) {
        return data[productIndex];
    } else {
        return null;
    }
}

// Main function to handle the form submission
async function handleSubmit(event) {
    event.preventDefault();
    const csvFile = 'grocery_list.csv';
    const data = await loadCSV(csvFile);
    if (data === null) {
        document.getElementById('error').innerHTML = 'Error loading CSV file.';
        return;
    }

    const items = Array.from(document.querySelectorAll('.item')).map((input) => input.value.toLowerCase());
    const quantities = Array.from(document.querySelectorAll('.quantity')).map((input) => parseFloat(input.value));

    const totalCost = calculateTotalCost(items, quantities, data.data);
    document.getElementById('total').innerHTML = `Your shopping list costs approximately: $${totalCost}`;

    const searchInput = document.getElementById('search').value.toLowerCase();
    const product = searchProduct(searchInput, data.data);
    if (product !== null) {
        document.getElementById('search-result').innerHTML = `Search result found, ${product.name} is a product type sold: ${product.description}`;
    } else {
        document.getElementById('search-result').innerHTML = 'No search results or product on list.';
    }
}

// Add event listener to the form
document.getElementById('form').addEventListener('submit', handleSubmit);