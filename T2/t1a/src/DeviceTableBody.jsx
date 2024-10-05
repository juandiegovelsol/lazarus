import React from "react";

const DeviceTableBody = ({ devices }) => {
  const calculateMonthlyEnergy = (device) => {
    const dailyWh = device.energy * device.hours * device.quantity;
    const monthlyWh = dailyWh * 30;
    const monthlykWh = monthlyWh / 1000;
    return monthlykWh.toFixed(2);
  };

  return (
    <tbody>
      {devices.map((device, index) => (
        <tr key={index}>
          <td>{device.name}</td>
          <td>{device.energy}</td>
          <td>{device.hours}</td>
          <td>{device.quantity}</td>
          <td>{calculateMonthlyEnergy(device)}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default DeviceTableBody;
