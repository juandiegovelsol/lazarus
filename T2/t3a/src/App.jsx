import React, { useState } from "react";
import MonthSelectorController from "./MonthSelectorController";
import DeviceFormController from "./DeviceFormController";
import DeviceTableController from "./DeviceTableController";
import TableFooter from "./TableFooter";
import ExportButtonController from "./ExportButtonController";

function App() {
  const [devices, setDevices] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [kWhCost, setKWhCost] = useState(0);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleAddDevice = (newDevice) => {
    setDevices([...devices, newDevice]);
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
      <MonthSelectorController
        months={months}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <DeviceFormController
        onAddDevice={handleAddDevice}
        selectedMonth={selectedMonth}
      />
      <h2>{selectedMonth} Device List</h2>
      <DeviceTableController devices={devices} selectedMonth={selectedMonth} />
      <TableFooter
        totalMonthlykWh={totalMonthlykWh}
        kWhCost={kWhCost}
        setKWhCost={setKWhCost}
      />
      <ExportButtonController devices={devices} kWhCost={kWhCost} />
    </div>
  );
}

export default App;
