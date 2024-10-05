import React from "react";

function Carousel({
  dishes,
  currentDishIndex,
  onDishSelect,
  onNextDish,
  onPrevDish,
}) {
  useEffect(() => {
    const interval = setInterval(onNextDish, 5000);
    return () => clearInterval(interval);
  }, [onNextDish]);

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
      <button onClick={onPrevDish} className="carousel-control prev">
        &lt;
      </button>
      <button onClick={onNextDish} className="carousel-control next">
        &gt;
      </button>
    </div>
  );
}

export default Carousel;
