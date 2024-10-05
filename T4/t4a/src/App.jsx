import React, { useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Recommendations from "./Recommendations";
import ProductForm from "./ProductForm";

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Smartphone", price: 599.99, category: "electronics" },
    { id: 2, name: "Laptop", price: 999.99, category: "electronics" },
    { id: 3, name: "T-shirt", price: 19.99, category: "clothing" },
    { id: 4, name: "Jeans", price: 49.99, category: "clothing" },
    { id: 5, name: "JavaScript Book", price: 29.99, category: "books" },
    { id: 6, name: "Python Book", price: 34.99, category: "books" },
  ]);

  const [cart, setCart] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const existingProduct = cart.find((p) => p.id === productId);
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      setCart([...cart]);
      updateRecommendations();
    }
  };

  const updateQuantity = (productId, quantity) => {
    const product = cart.find((p) => p.id === productId);
    if (product) {
      product.quantity = parseInt(quantity);
      if (product.quantity <= 0) {
        cart = cart.filter((p) => p.id !== productId);
      }
      setCart([...cart]);
      updateRecommendations();
    }
  };

  const removeFromCart = (productId) => {
    cart = cart.filter((p) => p.id !== productId);
    setCart([...cart]);
    updateRecommendations();
  };

  const updateRecommendations = () => {
    const categories = {};
    cart.forEach((item) => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });
    const leastPopularCategory = Object.keys(categories).reduce((a, b) => {
      return categories[a] < categories[b] ? a : b;
    });
    const recommendedProducts = products.filter((p) => {
      return (
        p.category === leastPopularCategory && !cart.find((c) => c.id === p.id)
      );
    });
    setRecommendations(recommendedProducts.slice(0, 3));
  };

  const addProduct = (product) => {
    const newProduct = { id: products.length + 1, ...product };
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <h1>E-commerce App</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      <Recommendations recommendations={recommendations} />
      <ProductForm addProduct={addProduct} />
    </div>
  );
};

export default App;
