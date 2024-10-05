import React, { useState } from "react";
import dishes from "./data";
import Carousel from "./Carousel";
import DishDetails from "./DishDetails";

function App() {
  const [selectedDishIndex, setSelectedDishIndex] = useState(null);
  const [currentDishIndex, setCurrentDishIndex] = useState(0);

  const handleDishSelect = (index) => {
    setSelectedDishIndex(index);
  };

  const handleReturnHome = () => {
    setSelectedDishIndex(null);
  };

  const handleNextDish = () => {
    setCurrentDishIndex((prevIndex) => (prevIndex + 1) % dishes.length);
  };

  const handlePrevDish = () => {
    setCurrentDishIndex((prevIndex) =>
      prevIndex === 0 ? dishes.length - 1 : prevIndex - 1
    );
  };

  const handleNextDishDetails = () => {
    setSelectedDishIndex((prevIndex) => (prevIndex + 1) % dishes.length);
  };

  const handlePrevDishDetails = () => {
    setSelectedDishIndex((prevIndex) =>
      prevIndex === 0 ? dishes.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="App">
      {selectedDishIndex !== null ? (
        <DishDetails
          dish={dishes[selectedDishIndex]}
          onReturnHome={handleReturnHome}
          onNextDish={handleNextDishDetails}
          onPrevDish={handlePrevDishDetails}
        />
      ) : (
        <Carousel
          dishes={dishes}
          currentDishIndex={currentDishIndex}
          onDishSelect={handleDishSelect}
          onNextDish={handleNextDish}
          onPrevDish={handlePrevDish}
        />
      )}
    </div>
  );
}

export default App;
