import React, { useState } from "react";

const TableFooter = ({ totalMonthlykWh, selectedMonth }) => {
  const [kWhCost, setKWhCost] = useState(0);

  return (
    <tfoot>
      <tr>
        <td colSpan="4">
          Total Monthly Energy Consumption for {selectedMonth}:
        </td>
        <td>{totalMonthlykWh.toFixed(2)} kWh</td>
      </tr>
      <tr>
        <td colSpan="4">kWh Cost:</td>
        <td>
          <input
            type="number"
            value={kWhCost}
            onChange={(e) => setKWhCost(parseFloat(e.target.value))}
          />
        </td>
      </tr>
      <tr>
        <td colSpan="4">Estimated Total Monthly Cost for {selectedMonth}:</td>
        <td>${(totalMonthlykWh * kWhCost).toFixed(2)}</td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
