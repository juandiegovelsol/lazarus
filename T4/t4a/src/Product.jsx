import React from "react";

const Product = ({ product, addToCart }) => {
  return (
    <div className="product">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <button onClick={() => addToCart(product.id)}>Add to Cart</button>
    </div>
  );
};

export default Product;
