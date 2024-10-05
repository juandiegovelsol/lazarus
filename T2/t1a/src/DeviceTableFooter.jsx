import React from "react";

const DeviceTableFooter = ({ devices, kWhCost, onKWhCostChange }) => {
  const totalMonthlykWh = devices.reduce((total, device) => {
    return total + (device.energy * device.hours * device.quantity * 30) / 1000;
  }, 0);

  return (
    <tfoot>
      <tr>
        <td colSpan="4">Total Monthly Energy Consumption:</td>
        <td>{totalMonthlykWh.toFixed(2)} kWh</td>
      </tr>
      <tr>
        <td colSpan="4">kWh Cost:</td>
        <td>
          <input type="number" value={kWhCost} onChange={onKWhCostChange} />
        </td>
      </tr>
      <tr>
        <td colSpan="4">Estimated Total Monthly Cost:</td>
        <td>${(totalMonthlykWh * kWhCost).toFixed(2)}</td>
      </tr>
    </tfoot>
  );
};

export default DeviceTableFooter;
