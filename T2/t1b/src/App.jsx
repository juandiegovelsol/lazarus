import React, { useState } from "react";
import DeviceFormController from "./DeviceFormController";
import DeviceTableController from "./DeviceTableController";
import TableFooter from "./TableFooter";

function App() {
  const [devices, setDevices] = useState([]);

  const handleAddDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  const totalMonthlykWh = devices.reduce((total, device) => {
    return total + (device.energy * device.hours * device.quantity * 30) / 1000;
  }, 0);

  return (
    <div>
      <h1>Home Energy Calculator</h1>
      <DeviceFormController onAddDevice={handleAddDevice} />
      <h2>Device List</h2>
      <DeviceTableController devices={devices} />
      <TableFooter totalMonthlykWh={totalMonthlykWh} />
    </div>
  );
}

export default App;
