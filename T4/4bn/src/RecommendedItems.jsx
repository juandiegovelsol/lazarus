import React from "react";

const RecommendedItems = ({ recommendedItems }) => {
  return (
    <div>
      <h2>Recommended Items</h2>
      <ul>
        {recommendedItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedItems;
