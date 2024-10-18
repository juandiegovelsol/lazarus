import React from "react";
import "./Button.css";
import Button from "./Button";

const Option = ({ option, makeChoice, previousOptions }) => {
  const handleChoose = () => {
    makeChoice(option.next);
  };

  return (
    <Button
      text={option.choice}
      onClick={handleChoose}
      className={`option-btn ${
        previousOptions.includes(option.next) ? "chosen" : ""
      }`}
    />
  );
};

export default Option;
