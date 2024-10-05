import React from "react";

const ImportButtonView = ({ handleFileChange, handleImport }) => {
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleImport}>Import from CSV</button>
    </div>
  );
};

export default ImportButtonView;
