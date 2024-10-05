import React, { useState } from "react";
import DeviceForm from "./DeviceForm";
import DeviceTable from "./DeviceTable";

function App() {
  const [devices, setDevices] = useState([]);
  const [kWhCost, setKWhCost] = useState(0);

  const handleAddDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  const handleKWhCostChange = (e) => {
    setKWhCost(parseFloat(e.target.value));
  };

  return (
    <div>
      <h1>Home Energy Calculator</h1>
      <DeviceForm onAddDevice={handleAddDevice} />
      <h2>Device List</h2>
      <DeviceTable
        devices={devices}
        kWhCost={kWhCost}
        onKWhCostChange={handleKWhCostChange}
      />
    </div>
  );
}

export default App;
