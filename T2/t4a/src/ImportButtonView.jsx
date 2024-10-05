import React from "react";

const ImportButtonView = ({ handleImport }) => {
  return <input type="file" accept=".csv" onChange={handleImport} />;
};

export default ImportButtonView;
