// ProductForm.js
import React, { useState } from "react";

function ProductForm({ addProduct, formError }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ name, price: parseFloat(price), category });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Price:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>
      <br />
      <button type="submit">Add Product</button>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
    </form>
  );
}

export default ProductForm;
