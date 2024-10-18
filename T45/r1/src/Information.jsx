import React from "react";
import "./Information.css";

const Information = ({ objectName, objectInfo }) => {
  return (
    <div className="info-panel">
      <h2 className="object-name">{objectName}</h2>
      <p className="object-info">{objectInfo}</p>
    </div>
  );
};

export default Information;
