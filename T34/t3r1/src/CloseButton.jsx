import React from "react";
import "./CloseButton.css";

const CloseButton = ({ onClick }) => {
  return (
    <button className="close-button" onClick={onClick}>
      &#8597;
    </button>
  );
};

export default CloseButton;
