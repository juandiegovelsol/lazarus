// DeviceList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const DeviceList = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/devices");
        setDevices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDevices();
  }, []);

  return (
    <ul>
      {devices.map((device) => (
        <li key={device.id}>
          <h2>{device.title}</h2>
          <p>{device.description}</p>
          <p>Price: ${device.price}</p>
          <p>Quantity: {device.quantity}</p>
          <img src={device.imageUrl} alt={device.title} />
        </li>
      ))}
    </ul>
  );
};

export default DeviceList;
