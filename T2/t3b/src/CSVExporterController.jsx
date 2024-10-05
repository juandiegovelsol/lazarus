import React from "react";
import CSVExporterView from "./CSVExporterView";

const CSVExporterController = ({ devices }) => {
  const handleExportCSV = () => {
    const csvData = devices.map((device) => {
      return [
        device.month,
        device.name,
        device.energy,
        device.hours,
        device.quantity,
        (device.energy * device.hours * device.quantity * 30) / 1000,
      ].join(",");
    });

    const csvHeader = [
      "Month,Device Name,Energy (Wh),Hours/Day,Quantity,Monthly Energy (KWh)",
    ];
    const csvContent = csvHeader.concat(csvData).join("\n");

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "energy_data.csv");
    link.click();
  };

  return <CSVExporterView handleExportCSV={handleExportCSV} />;
};

export default CSVExporterController;
