// Define the products array
const products = [
  { id: 1, name: "Smartphone", price: 599.99, category: "electronics" },
  { id: 2, name: "Laptop", price: 999.99, category: "electronics" },
  { id: 3, name: "T-shirt", price: 19.99, category: "clothing" },
  { id: 4, name: "Jeans", price: 49.99, category: "clothing" },
  { id: 5, name: "JavaScript Book", price: 29.99, category: "books" },
  { id: 6, name: "Python Book", price: 34.99, category: "books" },
];

// Initialize the cart and filteredProducts arrays
let cart = []; // Cart is an array of items
let filteredProducts = [];

// Function to display products
function displayProducts(productsToShow) {
  // Get the productList element
  const productList = document.getElementById("productList");
  // Clear the productList content
  productList.innerHTML = "";
  // Loop through the productsToShow array
  productsToShow.forEach((product) => {
    // Create a new div element for each product
    const productDiv = document.createElement("div");
    // Set the className to "product"
    productDiv.className = "product";
    // Set the innerHTML of the productDiv
    productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    // Append the productDiv to the productList
    productList.appendChild(productDiv);
  });
}

// Function to apply filters
function applyFilters() {
  // Get the searchInput and categoryFilter values
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;

  // Filter the products array based on the search term and category
  filteredProducts = products.filter((product) => {
    // Check if the product name includes the search term
    const nameMatch = product.name.toLowerCase().includes(searchTerm);
    // Check if the product category matches the selected category
    const categoryMatch = category === "" || product.category === category;
    // Return true if both conditions are met
    return nameMatch && categoryMatch;
  });

  // Sort the filteredProducts array alphabetically by name
  filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  // Display the filteredProducts array
  displayProducts(filteredProducts);
}

// Function to add a product to the cart
function addToCart(productId) {
  // Find the product in the products array
  const product = products.find((p) => p.id === productId);
  // Check if the product is already in the cart
  const existingProduct = cart.find((p) => p.id === productId);
  if (existingProduct) {
    // If the product is already in the cart, increment its quantity
    existingProduct.quantity++;
  } else {
    // If the product is not in the cart, add it with a quantity of 1
    cart.push({ ...product, quantity: 1 });
  }
  // Update the cart and recommendations
  updateCart();
  updateRecommendations();
}

// Function to update the cart display
function updateCart() {
  // Get the cartItems and cartTotal elements
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  // Clear the cartItems content
  cartItems.innerHTML = "";
  // Initialize the total cost
  let total = 0;
  // Loop through the cart array
  cart.forEach((item) => {
    // Create a new li element for each item
    const li = document.createElement("li");
    // Set the textContent of the li element
    li.textContent = `${item.name} x ${item.quantity} - $${(
      item.price * item.quantity
    ).toFixed(2)}`;
    // Append the li element to the cartItems
    cartItems.appendChild(li);
    // Add the item's cost to the total
    total += item.price * item.quantity;
  });
  // Set the textContent of the cartTotal element
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to update the recommendations based on cart items
function updateRecommendations() {
  // Get the recommendedItems element
  const recommendedItems = document.getElementById("recommendedItems");
  // Clear the recommendedItems content
  recommendedItems.innerHTML = "";

  // If the cart is empty, no recommendations can be made
  if (cart.length === 0) {
    recommendedItems.innerHTML = "<li>No recommendations available.</li>";
    return;
  }

  // Collect categories of items in the cart
  const cartCategories = cart.map((item) => item.category);

  // Find categories not present in the cart
  const recommendedCategories = products
    .map((product) => product.category)
    .filter((category) => !cartCategories.includes(category))
    .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

  // Get recommendations from the categories not in the cart
  let recommendations = products.filter((product) =>
    recommendedCategories.includes(product.category)
  );

  // If all categories are in the cart, recommend items from the least represented category
  if (recommendations.length === 0) {
    // Count occurrences of each category in the cart
    const categoryCounts = {};
    cart.forEach((item) => {
      categoryCounts[item.category] =
        (categoryCounts[item.category] || 0) + item.quantity;
    });
    // Find the category with the least items
    const leastRepresentedCategory = Object.keys(categoryCounts).reduce(
      (a, b) => (categoryCounts[a] < categoryCounts[b] ? a : b)
    );
    // Get recommendations from the least represented category
    recommendations = products.filter(
      (product) => product.category === leastRepresentedCategory
    );
  }

  // Limit recommendations to 3 items and exclude items already in the cart
  recommendations = recommendations
    .filter((product) => !cart.some((cartItem) => cartItem.id === product.id))
    .slice(0, 3);

  // Display the recommendations
  recommendations.forEach((recommendation) => {
    // Create a new li element for each recommendation
    const li = document.createElement("li");
    // Set the textContent of the li element
    li.textContent = recommendation.name;
    // Append the li element to the recommendedItems
    recommendedItems.appendChild(li);
  });

  // If no recommendations are available
  if (recommendedItems.innerHTML === "") {
    recommendedItems.innerHTML =
      "<li>No further recommendations available.</li>";
  }
}

// Call the displayProducts function when the page loads
window.onload = function () {
  displayProducts(products);
};
