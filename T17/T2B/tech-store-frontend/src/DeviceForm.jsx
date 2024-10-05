// src/DeviceForm.jsx
import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const DeviceForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [devices, setDevices] = useState([]);
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token-${user.id}`,
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

  const handleFetchDevices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/devices", {
        headers: {
          Authorization: `token-${user.id}`,
        },
      });
      const devices = await response.json();
      setDevices(devices);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (user) {
      handleFetchDevices();
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        <h1>Login or Register to access the devices</h1>
        <LoginForm />
        <RegisterForm />
      </div>
    );
  }

  if (user.role === "customer") {
    return (
      <div>
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
  }

  return (
    <div>
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
