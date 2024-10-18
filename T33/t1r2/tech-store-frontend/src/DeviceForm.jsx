// src/DeviceForm.jsx
import React, { useState, useEffect } from "react";

const DeviceForm = ({ user, setUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [devices, setDevices] = useState([]);

  const handleFetchDevices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/devices");
      const devices = await response.json();
      setDevices(devices);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          quantity,
          imageUrl,
        }),
      });
      const newDevice = await response.json();
      setDevices((prevDevices) => [...prevDevices, newDevice]);
      setTitle("");
      setDescription("");
      setPrice(0);
      setQuantity(0);
      setImageUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    handleFetchDevices();
  }, []);

  if (!user) {
    return <div>You must be logged in to view this page</div>;
  }
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleLogout}>Logout</button>
      {user.role === "admin" && (
        <div>
          <h1>Admin Panel</h1>
          <p>This is the admin panel</p>

          <h1>Device Form</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.valueAsNumber)}
              />
            </label>
            <br />
            <label>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.valueAsNumber)}
              />
            </label>
            <br />
            <label>
              Image URL:
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {user.role === "customer" && (
        <div>
          <h1>Customer Panel</h1>
          <p>This is the customer panel</p>
        </div>
      )}

      <h1>Available Devices</h1>
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
    </div>
  );
};

export default DeviceForm;
