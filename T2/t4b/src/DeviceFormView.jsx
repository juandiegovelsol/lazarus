import React from "react";

const DeviceFormView = ({
  handleAddDevice,
  deviceName,
  setDeviceName,
  energy,
  setEnergy,
  hours,
  setHours,
  quantity,
  setQuantity,
}) => {
  return (
    <form onSubmit={handleAddDevice}>
      <div>
        <label htmlFor="deviceName">Device Name:</label>
        <input
          type="text"
          id="deviceName"
          name="deviceName"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="energy">Energy Consumption (Wh):</label>
        <input
          type="number"
          id="energy"
          name="energy"
          value={energy}
          onChange={(e) => setEnergy(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="hours">Daily Hours of Use:</label>
        <input
          type="number"
          id="hours"
          name="hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Device</button>
    </form>
  );
};

export default DeviceFormView;
