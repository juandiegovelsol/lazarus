import React from "react";

const Recommendations = ({ recommendations }) => {
  return (
    <div>
      <h2>Recommended Items</h2>
      <ul>
        {recommendations.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
