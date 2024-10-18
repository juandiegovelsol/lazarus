let groceryList = [];
let categories = [];
let itemFields = 1;

// Function to parse CSV data into an array of objects
function parseCSV(data) {
  const lines = data.split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((object, header, index) => {
      object[header] = values[index].trim();
      return object;
    }, {});
  });
}

// Load the CSV file using fetch
fetch('grocery_list.csv')
  .then(response => response.text())
  .then(data => {
    groceryList = parseCSV(data);
    categories = [...new Set(groceryList.map(item => item.category))];
    populateCategorySelects();
  })
  .catch(error => console.error('Error loading data:', error));

// Function to populate category selects
function populateCategorySelects() {
  const categorySelects = document.querySelectorAll('.category-select');
  categorySelects.forEach(select => {
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.text = category;
      select.appendChild(option);
    });
  });
  populateItemSelects();
}

// Function to populate item selects based on category
function populateItemSelects() {
  const categorySelects = document.querySelectorAll('.category-select');
  const itemSelects = document.querySelectorAll('.item-select');
  categorySelects.forEach((categorySelect, index) => {
    categorySelect.addEventListener('change', () => {
      const selectedCategory = categorySelect.value;
      const itemsInCategory = groceryList.filter(item => item.category === selectedCategory);
      const itemSelect = itemSelects[index];
      itemSelect.innerHTML = '';
      itemsInCategory.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.text = `${item.name} ($${item.price})`;
        itemSelect.appendChild(option);
      });
    });
  });
  categorySelects.forEach(categorySelect => {
    categorySelect.dispatchEvent(new Event('change'));
  });
}

// Function to add new item fields
document.getElementById('add-item-btn').addEventListener('click', () => {
  itemFields++;
  const itemFieldsContainer = document.getElementById('item-fields');
  const newItemField = document.createElement('div');
  newItemField.innerHTML = `
    <label for="category${itemFields}">Category:</label>
    <select id="category${itemFields}" class="category-select">
    </select>
    <label for="item${itemFields}">Item:</label>
    <select id="item${itemFields}" class="item-select">
    </select>
    <label for="quantity${itemFields}">Quantity:</label>
    <input type="number" id="quantity${itemFields}" name="quantity">
  `;
  itemFieldsContainer.appendChild(newItemField);
  populateCategorySelects();
});

// Function to retrieve an item by linking HTML input with JavaScript
function getItem(index) {
  return document.getElementById(`item${index}`).value;
}

// Function to retrieve the quantity by linking HTML input with JavaScript
function getQuantity(index) {
  return document.getElementById(`quantity${index}`).value;
}

// Function to calculate price based on item and quantity
function calculatePrice(index) {
  const item = getItem(index);
  const groceryItem = groceryList.find(groceryItem => groceryItem.name === item);

  // If item is found in the list, calculate price
  if (groceryItem) {
    const price = (getQuantity(index) * parseFloat(groceryItem.price)).toFixed(2);
    return parseFloat(price);
  }
  return 0;
}

// Function to calculate total cost from multiple items
function calculateTotal() {
  let totalCost = 0;
  for (let i = 1; i <= itemFields; i++) {
    totalCost += calculatePrice(i);
  }
  return totalCost.toFixed(2);
}

// Function to display the total cost in HTML
function displayTotal() {
  const totalCost = calculateTotal();

  if (totalCost > 0) {
    document.getElementById('dollars').innerHTML = `<font color="red">Your shopping list costs approximately: $${totalCost}</font>`;
  } else {
    document.getElementById('dollars').innerHTML = '<font color="red">Item not found, please check the input</font>';
  }
}

// Add an event listener to the form submit event to calculate the total cost
document.getElementById('grocery-form').addEventListener('submit', (event) => {
  event.preventDefault();
  displayTotal();
});