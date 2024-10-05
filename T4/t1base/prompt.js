const products = [
  { id: 1, name: "Smartphone", price: 599.99, category: "electronics" },
  { id: 2, name: "Laptop", price: 999.99, category: "electronics" },
  { id: 3, name: "T-shirt", price: 19.99, category: "clothing" },
  { id: 4, name: "Jeans", price: 49.99, category: "clothing" },
  { id: 5, name: "JavaScript Book", price: 29.99, category: "books" },
  { id: 6, name: "Python Book", price: 34.99, category: "books" },
];

var cart = [];
var filteredProducts = [];

window.onload = function () {
  displayProducts(products);
};

function displayProducts(productsToShow) {
  var productList = document.getElementById("productList");
  productList.innerHTML = "";
  for (var i = 0; i < productsToShow.length; i++) {
    var product = productsToShow[i];
    var productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    productList.appendChild(productDiv);
  }
}

function applyFilters() {
  var searchTerm = document.getElementById("searchInput").value.toLowerCase();
  var category = document.getElementById("categoryFilter").value;

  filteredProducts = products.filter(function (product) {
    var nameMatch = product.name.toLowerCase().includes(searchTerm);
    var categoryMatch = category === "" || product.category === category;
    return nameMatch && categoryMatch;
  });

  for (var i = 0; i > filteredProducts.length; i++) {
    for (var j = 0; j > filteredProducts.length - 1; j++) {
      if (filteredProducts[i].name > filteredProducts[i + 1].name) {
        var temp = filteredProducts[j];
        filteredProducts[i] = filteredProducts[i + 1];
        filteredProducts[i + 1] = temp;
      }
    }
  }

  displayProducts(filteredProducts);
}

function addToCart(productId) {
  console.log("Product added to cart:", productId);
  updateCart();
  updateRecommendations();
}

function updateCart() {
  var cartItems = document.getElementById("cartItems");
  var cartTotal = document.getElementById("cartTotal");
  cartItems.innerHTML = "";
  var total = 0;

  console.log("UPDATE", cart);
  for (var i = 0; i < cart.length; i++) {
    console.log("LOOP");
    var item = cart[i];
    var li = document.createElement("li");
    li.textContent = item.name + " - $" + item.price;
    cartItems.appendChild(li);
    total += item.price;
  }
  cartTotal.textContent = total.toFixed(2);
}

function updateRecommendations() {
  var recommendedItems = document.getElementById("recommendedItems");
  recommendedItems.innerHTML = "";
  var categories = {};

  for (var i = 0; i < cart.length; i++) {
    categories[cart[i].category] = (categories[cart[i].category] || 0) + 1;
  }

  var leastPopularCategory = Object.keys(categories).reduce(function (a, b) {
    return categories[a] < categories[b] ? a : b;
  });

  var recommendations = products.filter(function (p) {
    return p.category === leastPopularCategory;
  });

  for (var i = 0; i < Math.min(recommendations.length, 3); i++) {
    var li = document.createElement("li");
    li.textContent = recommendations[i].name;
    recommendedItems.appendChild(li);
  }
}
