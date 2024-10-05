const json = {
  programming_language: ["JavaScript", "HTML"],
  install_commands: ["n/a"],
  run_commands: ["n/a"],
  output: "web app",
  output_expected: "no",
  output_mime_type: "application/octet-stream",
  stream_source: "stdout/stderr",
  code: [
    {
      name: "index.html",
      content: `<!DOCTYPE html>
                <html>
                <head>
                    <title>E-commerce App</title>
                    <style>
                    .product {
                        border: 1px solid #ccc;
                        padding: 10px;
                        margin-bottom: 10px;
                    }
                    </style>
                </head>
                <body>
                    <h1>Products</h1>
                    <input id="searchInput" type="text" placeholder="Search products..." />
                    <select id="categoryFilter">
                    <option value="">All categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                    </select>
                    <button onclick="applyFilters()">Apply filters</button>
                    <div id="productList"></div>
                    <h1>Cart</h1>
                    <ul id="cartItems"></ul>
                    <p>Total: $<span id="cartTotal">0.00</span></p>
                    <h1>Recommended products</h1>
                    <ul id="recommendedItems"></ul>

                    <script src="script.js"></script>
                </body>
                </html>`,
    },
    {
        name: "script.js",
        content: `const products = [
                    { id: 1, name: "Smartphone", price: 599.99, category: "electronics" },
                    { id: 2, name: "Laptop", price: 999.99, category: "electronics" },
                    { id: 3, name: "T-shirt", price: 19.99, category: "clothing" },
                    { id: 4, name: "Jeans", price: 49.99, category: "clothing" },
                    { id: 5, name: "JavaScript Book", price: 29.99, category: "books" },
                    { id: 6, name: "Python Book", price: 34.99, category: "books" },
                    ];

                    var cart = []; // Initialize cart as an empty array
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

                    // Sort the filtered products by name
                    filteredProducts.sort(function (a, b) {
                        if (a.name < b.name) {
                        return -1;
                        } else if (a.name > b.name) {
                        return 1;
                        } else {
                        return 0;
                        }
                    });

                    displayProducts(filteredProducts);
                    }

                    function addToCart(productId) {
                    // Find the product with the given ID and add it to the cart
                    var product = products.find(function (p) {
                        return p.id === productId;
                    });
                    if (product) {
                        // Check if the product is already in the cart
                        var existingProduct = cart.find(function (p) {
                        return p.id === productId;
                        });
                        if (existingProduct) {
                        // If the product is already in the cart, increment its quantity
                        existingProduct.quantity++;
                        } else {
                        // If the product is not in the cart, add it with a quantity of 1
                        product.quantity = 1;
                        cart.push(product);
                        }
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
                        li.textContent =
                        item.name +
                        " x " +
                        item.quantity +
                        " - $" +
                        (item.price * item.quantity).toFixed(2);
                        cartItems.appendChild(li);
                        total += item.price * item.quantity;
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
                        return p.category === leastPopularCategory && !cart.includes(p);
                    });

                    for (var i = 0; i < Math.min(recommendations.length, 3); i++) {
                        var li = document.createElement("li");
                        li.textContent = recommendations[i].name;
                        recommendedItems.appendChild(li);
                    }
                    }`
    }
  ],
};