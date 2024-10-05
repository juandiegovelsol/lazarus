import React, { useState } from "react";
import DeviceFormView from "./DeviceFormView";

const DeviceFormController = ({ onAddDevice, selectedMonth }) => {
  const [deviceName, setDeviceName] = useState("");
  const [energy, setEnergy] = useState("");
  const [hours, setHours] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddDevice = (event) => {
    event.preventDefault();

    const newDevice = {
      name: deviceName,
      energy: parseFloat(energy),
      hours: parseFloat(hours),
      quantity: parseInt(quantity, 10),
      month: selectedMonth,
    };

    onAddDevice(newDevice);

    setDeviceName("");
    setEnergy("");
    setHours("");
    setQuantity("");
  };

  return (
    <DeviceFormView
      handleAddDevice={handleAddDevice}
      deviceName={deviceName}
      setDeviceName={setDeviceName}
      energy={energy}
      setEnergy={setEnergy}
      hours={hours}
      setHours={setHours}
      quantity={quantity}
      setQuantity={setQuantity}
    />
  );
};

export default DeviceFormController;
