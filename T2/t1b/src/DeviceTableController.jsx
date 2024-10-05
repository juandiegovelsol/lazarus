import React from "react";
import DeviceTableView from "./DeviceTableView";

const DeviceTableController = ({ devices }) => {
  const calculateMonthlyEnergy = (device) => {
    const dailyWh = device.energy * device.hours * device.quantity;
    const monthlyWh = dailyWh * 30;
    const monthlykWh = monthlyWh / 1000;
    return monthlykWh.toFixed(2);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Device Name</th>
          <th>Energy (Wh)</th>
          <th>Hours/Day</th>
          <th>Quantity</th>
          <th>Monthly Energy (KWh)</th>
        </tr>
      </thead>
      <tbody>
        <DeviceTableView
          devices={devices}
          calculateMonthlyEnergy={calculateMonthlyEnergy}
        />
      </tbody>
    </table>
  );
};

export default DeviceTableController;
