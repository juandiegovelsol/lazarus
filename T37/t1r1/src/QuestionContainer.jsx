import React from "react";
import "./QuestionContainer.css";
import OptionButton from "./OptionButton";

const QuestionContainer = ({
  text,
  options,
  makeChoice,
  previousOptions,
  firstOptionChosen,
}) => {
  return (
    <div className="question-container">
      <p className="question-text">{text}</p>
      <div className="options">
        {options.map((option, index) => (
          <OptionButton
            key={index}
            choice={option.choice}
            next={option.next}
            makeChoice={makeChoice}
            previousOptions={previousOptions}
            firstOptionChosen={firstOptionChosen}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionContainer;
