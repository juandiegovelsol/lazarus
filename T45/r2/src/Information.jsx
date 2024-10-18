import React from "react";
import "./Information.css";

const Information = ({ objectName, objectInfo }) => {
  return (
    <div className="info-panel">
      <h2>{objectName}</h2>
      <p>{objectInfo}</p>
    </div>
  );
};

export default Information;
