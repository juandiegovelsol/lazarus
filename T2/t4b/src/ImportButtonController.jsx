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
    reader.onload = (event) => {
      const csvData = event.target.result;
      const rows = csvData.split("\n");
      const headers = rows.shift().split(",");

      const importedDevices = rows.map((row) => {
        const deviceData = row.split(",");
        return {
          month: deviceData[0],
          name: deviceData[1],
          energy: parseFloat(deviceData[2]),
          hours: parseFloat(deviceData[3]),
          quantity: parseInt(deviceData[4], 10),
        };
      });

      const updatedDevices = devices.slice();
      importedDevices.forEach((importedDevice) => {
        const existingDevice = updatedDevices.find(
          (device) =>
            device.month === importedDevice.month &&
            device.name === importedDevice.name
        );

        if (existingDevice) {
          if (importedDevice.energy && !existingDevice.energy) {
            existingDevice.energy = importedDevice.energy;
          }
          if (importedDevice.hours && !existingDevice.hours) {
            existingDevice.hours = importedDevice.hours;
          }
          if (importedDevice.quantity && !existingDevice.quantity) {
            existingDevice.quantity = importedDevice.quantity;
          }
        } else {
          updatedDevices.push(importedDevice);
        }
      });

      setDevices(updatedDevices);
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
