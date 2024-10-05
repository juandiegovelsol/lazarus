import React, { useState } from "react";
import MonthlySelectorController from "./MonthlySelectorController";
import DeviceFormController from "./DeviceFormController";
import DeviceTableController from "./DeviceTableController";
import TableFooter from "./TableFooter";

function App() {
  const [devices, setDevices] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("January");

  const handleAddDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const totalMonthlykWh = devices
    .filter((device) => device.month === selectedMonth)
    .reduce((total, device) => {
      return (
        total + (device.energy * device.hours * device.quantity * 30) / 1000
      );
    }, 0);

  return (
    <div>
      <h1>Home Energy Calculator</h1>
      <MonthlySelectorController
        onMonthChange={(month) => handleMonthChange(month)}
      />
      <DeviceFormController
        selectedMonth={selectedMonth}
        onAddDevice={handleAddDevice}
      />
      <h2>Device List for {selectedMonth}</h2>
      <DeviceTableController devices={devices} selectedMonth={selectedMonth} />
      <TableFooter
        totalMonthlykWh={totalMonthlykWh}
        selectedMonth={selectedMonth}
      />
    </div>
  );
}

export default App;
