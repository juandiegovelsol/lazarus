import React, { useState, useEffect } from "react";
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

  const handleNextDish = (setFunction) => {
    setFunction((prevIndex) => (prevIndex + 1) % dishes.length);
  };

  const handlePrevDish = (setFunction) => {
    setFunction((prevIndex) =>
      prevIndex === 0 ? dishes.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    console.log(currentDishIndex);
    const interval = setInterval(() => {
      handleNextDish(setCurrentDishIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentDishIndex, handleNextDish]);
  return (
    <div className="App">
      {selectedDishIndex !== null ? (
        <DishDetails
          dish={dishes[selectedDishIndex]}
          onReturnHome={handleReturnHome}
          onNextDish={() => handleNextDish(setSelectedDishIndex)}
          onPrevDish={() => handlePrevDish(setSelectedDishIndex)}
        />
      ) : (
        <Carousel
          dishes={dishes}
          currentDishIndex={currentDishIndex}
          onDishSelect={handleDishSelect}
          onNextDish={() => handleNextDish(setCurrentDishIndex)}
          onPrevDish={() => handlePrevDish(setCurrentDishIndex)}
        />
      )}
    </div>
  );
}

export default App;
