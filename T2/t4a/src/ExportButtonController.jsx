import React from "react";
import ExportButtonView from "./ExportButtonView";

const ExportButtonController = ({ devices, kWhCost }) => {
  const handleExport = () => {
    const csvData = devices.map((device) => {
      const deviceEnergy =
        (device.energy * device.hours * device.quantity * 30) / 1000;
      return [
        device.month,
        device.name,
        device.energy,
        device.hours,
        device.quantity,
        deviceEnergy,
        kWhCost,
        (kWhCost * deviceEnergy).toFixed(2),
      ].join(",");
    });

    const csvHeader =
      "Month,Device Name,Energy (Wh),Hours/Day,Quantity,Monthly Energy (KWh),Energy Cost($/KWh), Device Consumption Cost ($)";
    const csvContent = csvHeader + "\n" + csvData.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "energy_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return <ExportButtonView handleExport={handleExport} />;
};

export default ExportButtonController;
