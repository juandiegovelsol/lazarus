import React from "react";
import Product from "./Product";

const ProductList = ({ products, addToCart }) => {
  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
