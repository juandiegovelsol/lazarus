import React from "react";
import "./Card.css";

const Card = ({ image, text }) => {
  return (
    <div className="card">
      <img src={image} alt="" />
      <p>{text}</p>
    </div>
  );
};

export default Card;
