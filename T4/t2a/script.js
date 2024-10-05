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

  filteredProducts.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  displayProducts(filteredProducts);
}

function addToCart(productId) {
  var product = products.find(function (p) {
    return p.id === productId;
  });

  if (product) {
    var existingProduct = cart.find(function (p) {
      return p.id === productId;
    });

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    console.log("Product added to cart:", product.name);
    updateCart();
    updateRecommendations();
  }
}

function updateCart() {
  var cartItems = document.getElementById("cartItems");
  var cartTotal = document.getElementById("cartTotal");
  cartItems.innerHTML = "";
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var li = document.createElement("li");
    li.innerHTML = `
            ${item.name}
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            x $${item.price}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  }
  cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(productId, quantity) {
  var product = cart.find(function (p) {
    return p.id === productId;
  });

  if (product) {
    product.quantity = parseInt(quantity);
    updateCart();
    updateRecommendations();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(function (p) {
    return p.id !== productId;
  });

  updateCart();
  updateRecommendations();
}

function updateRecommendations() {
  var recommendedItems = document.getElementById("recommendedItems");
  recommendedItems.innerHTML = "";
  var categories = {};

  for (var i = 0; i < cart.length; i++) {
    categories[cart[i].category] =
      (categories[cart[i].category] || 0) + cart[i].quantity;
  }

  var leastPopularCategory = Object.keys(categories).reduce(function (a, b) {
    return categories[a] < categories[b] ? a : b;
  });

  var recommendations = products.filter(function (p) {
    return (
      p.category === leastPopularCategory &&
      !cart.find(function (c) {
        return c.id === p.id;
      })
    );
  });

  for (var i = 0; i < Math.min(recommendations.length, 3); i++) {
    var li = document.createElement("li");
    li.textContent = recommendations[i].name;
    recommendedItems.appendChild(li);
  }
}
