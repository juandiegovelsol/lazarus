import React from "react";
import "./QuestionContainer.css";
import Option from "./Option";

const QuestionContainer = ({
  storyText,
  options,
  makeChoice,
  previousOptions,
}) => {
  return (
    <div className="question-container">
      <p className="question-text">{storyText}</p>
      <div className="options">
        {options.map((option, index) => (
          <Option
            key={index}
            option={option}
            makeChoice={makeChoice}
            previousOptions={previousOptions}
          />
        ))}
        {options.length === 0 && (
          <button className="option-btn" onClick={() => makeChoice(1)}>
            Restart story
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionContainer;
