import React from "react";
import "./Option.css";
import Button from "./Button";

const Option = ({ option, makeChoice, previousOptions, chosenOptions }) => {
  const handleChoose = () => {
    makeChoice(option.next);
  };

  return (
    <Button
      text={option.choice}
      onClick={handleChoose}
      className={`option-btn ${
        chosenOptions.includes(option.next) ? "chosen" : ""
      } ${previousOptions.includes(option.next) ? "not-chosen" : ""}`}
    />
  );
};

export default Option;
