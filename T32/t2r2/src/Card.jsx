import React from "react";
import "./Card.css";

const Card = () => {
  return (
    <div className={`card`}>
      <img src="https://picsum.photos/200/300" alt="Client 1" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
        nulla auctor, vestibulum magna sed, convallis ex.
      </p>
    </div>
  );
};

export default Card;
