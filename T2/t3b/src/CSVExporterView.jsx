import React from "react";

const CSVExporterView = ({ handleExportCSV }) => {
  return <button onClick={handleExportCSV}>Export to CSV</button>;
};

export default CSVExporterView;
