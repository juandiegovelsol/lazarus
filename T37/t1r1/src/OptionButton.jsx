import React from "react";
import "./OptionButton.css";

const OptionButton = ({
  choice,
  next,
  makeChoice,
  previousOptions,
  firstOptionChosen,
}) => {
  const handleChoice = () => {
    makeChoice(next);
  };

  return (
    <button className="option-btn" onClick={handleChoice}>
      {choice}
    </button>
  );
};

export default OptionButton;
