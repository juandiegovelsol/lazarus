import React from "react";
import "./QuestionContainer.css";
import Option from "./Option";

const QuestionContainer = ({
  storyText,
  options,
  makeChoice,
  restartStory,
}) => {
  return (
    <div className="question-container">
      <p className="question-text">{storyText}</p>
      <div className="options">
        {options.map((option, index) => (
          <Option key={index} option={option} makeChoice={makeChoice} />
        ))}
        {options.length === 0 && (
          <button className="option-btn" onClick={restartStory}>
            Restart story
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionContainer;
