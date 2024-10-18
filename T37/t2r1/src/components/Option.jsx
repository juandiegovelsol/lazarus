import React from "react";
import "./Option.css";
import Button from "./Button";

const Option = ({ option, makeChoice }) => {
  return (
    <Button
      text={option.choice}
      onClick={() => makeChoice(option.next)}
      className={`option-btn ${option.chosen ? "chosen" : ""}`}
    />
  );
};

export default Option;
