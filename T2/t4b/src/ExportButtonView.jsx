import React from "react";

const ExportButtonView = ({ handleExport }) => {
  return <button onClick={handleExport}>Export to CSV</button>;
};

export default ExportButtonView;
