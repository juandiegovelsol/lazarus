// DeviceForm.js
import React, { useState } from "react";
import axios from "axios";

const DeviceForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/devices", {
        title,
        description,
        price,
        quantity,
        imageUrl,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
        <textarea
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
      <button type="submit">Create Device</button>
    </form>
  );
};

export default DeviceForm;
