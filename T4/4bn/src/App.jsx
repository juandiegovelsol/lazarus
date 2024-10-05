import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";
import RecommendedItems from "./RecommendedItems";
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
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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

  const addToCart = (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      const existingProduct = cart.find((p) => p.id === id);
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      setCart([...cart]);
      updateRecommendedItems();
    }
  };

  const updateQuantity = (id, quantity) => {
    const product = cart.find((p) => p.id === id);
    if (product) {
      product.quantity = parseInt(quantity);
      if (product.quantity <= 0) {
        setCart((prev) => prev.filter((p) => p.id !== id));
      }

      updateRecommendedItems();
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateRecommendedItems = () => {
    const categories = {};

    cart.forEach((item) => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });

    if (Object.keys(categories).length) {
      const leastPopularCategory = Object.keys(categories).reduce((a, b) => {
        return categories[a] < categories[b] ? a : b;
      });
      const recommendedItems = products.filter(
        (p) =>
          p.category === leastPopularCategory &&
          !cart.find((c) => c.id === p.id)
      );
      setRecommendedItems(recommendedItems.slice(0, 3));
    } else {
      setRecommendedItems([]);
    }
  };

  const addProduct = (product) => {
    const normalizeName = (name) => {
      return name
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .sort()
        .join(" ");
    };
    const normalizedName = normalizeName(product.name);
    const productExists = products.some((p) => {
      const normalizedPName = normalizeName(p.name);
      return normalizedPName === normalizedName;
    });
    if (productExists) {
      setFormError("Product already exists");
    } else if (product.name && product.price && product.category) {
      setProducts([...products, product]);
      setFormError("");
    } else {
      setFormError("Please fill in all fields");
    }
  };

  useEffect(() => {
    updateRecommendedItems();
  }, [cart]);

  return (
    <div>
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
      <RecommendedItems recommendedItems={recommendedItems} />
      <ProductForm addProduct={addProduct} error={formError} />
    </div>
  );
}

export default App;
