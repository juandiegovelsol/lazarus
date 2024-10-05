import React from "react";

const DeviceTableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Device Name</th>
        <th>Energy (Wh)</th>
        <th>Hours/Day</th>
        <th>Quantity</th>
        <th>Monthly Energy (KWh)</th>
      </tr>
    </thead>
  );
};

export default DeviceTableHeader;
