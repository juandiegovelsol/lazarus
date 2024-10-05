import React, { useState } from "react";
import dishes from "./data";
import Carousel from "./Carousel";
import DishDetails from "./DishDetails";

function App() {
  const [selectedDishIndex, setSelectedDishIndex] = useState(null);

  const handleDishSelect = (index) => {
    setSelectedDishIndex(index);
  };

  const handleReturnHome = () => {
    setSelectedDishIndex(null);
  };

  const handlePrevDish = () => {
    setSelectedDishIndex((prevIndex) =>
      prevIndex === 0 ? dishes.length - 1 : prevIndex - 1
    );
  };

  const handleNextDish = () => {
    setSelectedDishIndex((prevIndex) => (prevIndex + 1) % dishes.length);
  };

  return (
    <div className="App">
      {selectedDishIndex !== null ? (
        <DishDetails
          dish={dishes[selectedDishIndex]}
          onReturnHome={handleReturnHome}
          onPrevDish={handlePrevDish}
          onNextDish={handleNextDish}
        />
      ) : (
        <Carousel
          dishes={dishes}
          onDishSelect={(dish) => handleDishSelect(dishes.indexOf(dish))}
        />
      )}
    </div>
  );
}

export default App;
