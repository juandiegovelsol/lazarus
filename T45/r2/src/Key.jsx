import React from "react";
import "./Key.css";

const Key = ({ moveTelescope }) => {
  const handleLeftClick = () => moveTelescope(-20, 0);
  const handleRightClick = () => moveTelescope(20, 0);
  const handleUpClick = () => moveTelescope(0, -20);
  const handleDownClick = () => moveTelescope(0, 20);

  return (
    <div className="controls">
      <button onClick={handleLeftClick}>&#8592;</button>
      <button onClick={handleUpClick}>&#8593;</button>
      <button onClick={handleDownClick}>&#8595;</button>
      <button onClick={handleRightClick}>&#8594;</button>
    </div>
  );
};

export default Key;
