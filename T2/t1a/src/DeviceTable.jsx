import React from "react";
import DeviceTableHeader from "./DeviceTableHeader";
import DeviceTableBody from "./DeviceTableBody";
import DeviceTableFooter from "./DeviceTableFooter";

const DeviceTable = ({ devices, kWhCost, onKWhCostChange }) => {
  return (
    <table>
      <DeviceTableHeader />
      <DeviceTableBody devices={devices} />
      <DeviceTableFooter
        devices={devices}
        kWhCost={kWhCost}
        onKWhCostChange={onKWhCostChange}
      />
    </table>
  );
};

export default DeviceTable;
