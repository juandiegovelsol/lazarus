import React from "react";

const DeviceTableView = ({ devices, calculateMonthlyEnergy }) => {
  return (
    <>
      {devices.map((device, index) => (
        <tr key={index}>
          <td>{device.name}</td>
          <td>{device.energy}</td>
          <td>{device.hours}</td>
          <td>{device.quantity}</td>
          <td>{calculateMonthlyEnergy(device)}</td>
        </tr>
      ))}
    </>
  );
};

export default DeviceTableView;
