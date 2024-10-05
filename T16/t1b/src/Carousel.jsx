import React, { useState, useEffect } from "react";

function Carousel({ dishes, onDishSelect }) {
  const [currentDishIndex, setCurrentDishIndex] = useState(0);

  const nextDish = () => {
    setCurrentDishIndex((prevIndex) => (prevIndex + 1) % dishes.length);
  };

  const prevDish = () => {
    setCurrentDishIndex((prevIndex) =>
      prevIndex === 0 ? dishes.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextDish, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-inner">
        <img
          src={dishes[currentDishIndex].image}
          alt={dishes[currentDishIndex].name}
        />
        <h2>{dishes[currentDishIndex].name}</h2>
        <p>{dishes[currentDishIndex].shortDescription}</p>
        <button onClick={() => onDishSelect(currentDishIndex)}>See More</button>
      </div>
      <button onClick={prevDish} className="carousel-control prev">
        &lt;
      </button>
      <button onClick={nextDish} className="carousel-control next">
        &gt;
      </button>
    </div>
  );
}

export default Carousel;
