import React, { useState } from "react";

const ProductForm = ({ addProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price && category) {
      addProduct({ name, price, category });
      setName("");
      setPrice("");
      setCategory("");
      setError(null);
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <br />
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
      </label>
      <br />
      <button type="submit">Add Product</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ProductForm;
