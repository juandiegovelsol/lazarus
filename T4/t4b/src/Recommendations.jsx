// Recommendations.js
import React from "react";

function Recommendations({ products, cart }) {
  const categories = {};
  cart.forEach((product) => {
    categories[product.category] = (categories[product.category] || 0) + 1;
  });
  const leastPopularCategory = Object.keys(categories).length
    ? Object.keys(categories).reduce((a, b) =>
        categories[a] < categories[b] ? a : b
      )
    : "";
  const recommendations = products.filter(
    (product) =>
      product.category === leastPopularCategory &&
      !cart.find((p) => p.id === product.id)
  );
  return (
    <div>
      <h2>Recommended Items</h2>
      <ul>
        {recommendations.slice(0, 3).map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
