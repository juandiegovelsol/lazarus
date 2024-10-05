// App.js
import React, { useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Recommendations from "./Recommendations";
import ProductForm from "./ProductForm";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Smartphone", price: 599.99, category: "electronics" },
    { id: 2, name: "Laptop", price: 999.99, category: "electronics" },
    { id: 3, name: "T-shirt", price: 19.99, category: "clothing" },
    { id: 4, name: "Jeans", price: 49.99, category: "clothing" },
    { id: 5, name: "JavaScript Book", price: 29.99, category: "books" },
    { id: 6, name: "Python Book", price: 34.99, category: "books" },
  ]);

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [formError, setFormError] = useState("");

  const applyFilters = () => {
    const filteredProducts = products.filter((product) => {
      const nameMatch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch =
        categoryFilter === "" || product.category === categoryFilter;
      return nameMatch && categoryMatch;
    });
    return filteredProducts;
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (product, quantity) => {
    const updatedCart = cart.map((p) => {
      if (p.id === product.id) {
        p.quantity = parseInt(quantity);
      }
      return p;
    });
    setCart(updatedCart);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((p) => p.id !== product.id);
    setCart(updatedCart);
  };

  const addProduct = (newProduct) => {
    const normalizedName = newProduct.name
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .sort()
      .join(" ");
    const productExists = products.some((p) => {
      const productName = p.name
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .sort()
        .join(" ");
      return productName === normalizedName;
    });
    if (productExists) {
      setFormError("Product already exists");
    } else if (newProduct.name && newProduct.price && newProduct.category) {
      setProducts([...products, newProduct]);
      setFormError("");
    } else {
      setFormError("Please fill in all fields");
    }
  };

  return (
    <div>
      <h1>E-commerce App</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>
      <ProductList products={applyFilters()} addToCart={addToCart} />
      <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      <Recommendations products={products} cart={cart} />
      <ProductForm addProduct={addProduct} formError={formError} />
    </div>
  );
}

export default App;
