import React from "react";
import "./Option.css";
import Button from "./Button";

const Option = ({ option, makeChoice, chosenOptions, disabled }) => {
  const handleChoose = () => {
    if (!disabled) {
      makeChoice(option.next);
    }
  };

  if (disabled) {
    return (
      <Button
        text={option.choice}
        onClick={handleChoose}
        className={`option-btn ${
          chosenOptions.includes(option.next) ? "chosen" : "not-chosen"
        }`}
        disabled={disabled}
      />
    );
  }

  return (
    <Button
      text={option.choice}
      onClick={handleChoose}
      className={`option-btn ${
        chosenOptions.includes(option.next) ? "chosen" : ""
      }`}
      disabled={disabled}
    />
  );
};

export default Option;
