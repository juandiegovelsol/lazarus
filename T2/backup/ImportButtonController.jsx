import React, { useState } from "react";
import ImportButtonView from "./ImportButtonView";

const ImportButtonController = ({ devices, setDevices }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImport = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result.split("\n");
      const importedDevices = [];

      csvData.forEach((row, index) => {
        if (index === 0) return; // Skip header row

        const [month, name, energy, hours, quantity] = row.split(",");
        const existingDevice = devices.find(
          (device) => device.month === month && device.name === name
        );

        if (!existingDevice) {
          importedDevices.push({
            month,
            name,
            energy: parseFloat(energy),
            hours: parseFloat(hours),
            quantity: parseInt(quantity, 10),
          });
        }
      });

      setDevices([...devices, ...importedDevices]);
    };

    reader.readAsText(selectedFile);
  };

  return (
    <ImportButtonView
      handleFileChange={handleFileChange}
      handleImport={handleImport}
    />
  );
};

export default ImportButtonController;
