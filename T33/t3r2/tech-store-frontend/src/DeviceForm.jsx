import React from "react";

const DeviceForm = ({
  user,
  deviceForm,
  setDeviceForm,
  users,
  setUsers,
  handleLogout,
  handleSubmitDevice,
  handleUpdateUser,
}) => {
  const handleTitleChange = (e) => {
    setDeviceForm((prevDeviceForm) => ({
      ...prevDeviceForm,
      title: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setDeviceForm((prevDeviceForm) => ({
      ...prevDeviceForm,
      description: e.target.value,
    }));
  };

  const handlePriceChange = (e) => {
    setDeviceForm((prevDeviceForm) => ({
      ...prevDeviceForm,
      price: e.target.valueAsNumber,
    }));
  };

  const handleQuantityChange = (e) => {
    setDeviceForm((prevDeviceForm) => ({
      ...prevDeviceForm,
      quantity: e.target.valueAsNumber,
    }));
  };

  const handleImageUrlChange = (e) => {
    setDeviceForm((prevDeviceForm) => ({
      ...prevDeviceForm,
      imageUrl: e.target.value,
    }));
  };

  const handleSelectUser = (user) => {
    setUsers((prevUsers) => ({ ...prevUsers, selectedUser: user }));
  };

  const handleNewRoleChange = (e) => {
    setUsers((prevUsers) => ({ ...prevUsers, newRole: e.target.value }));
  };

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={handleLogout}>Logout</button>
      {user.role === "admin" && (
        <div>
          <h1>Admin Panel</h1>
          <p>This is the admin panel</p>

          <h1>Device Form</h1>
          <form onSubmit={handleSubmitDevice}>
            <label>
              Title:
              <input
                type="text"
                value={deviceForm.title}
                onChange={handleTitleChange}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                value={deviceForm.description}
                onChange={handleDescriptionChange}
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                value={deviceForm.price}
                onChange={handlePriceChange}
              />
            </label>
            <br />
            <label>
              Quantity:
              <input
                type="number"
                value={deviceForm.quantity}
                onChange={handleQuantityChange}
              />
            </label>
            <br />
            <label>
              Image URL:
              <input
                type="text"
                value={deviceForm.imageUrl}
                onChange={handleImageUrlChange}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>

          <h1>Manage Users</h1>
          <ul>
            {users.users.map((user) => (
              <li key={user.id}>
                <p>{user.email}</p>
                <p>Role: {user.role}</p>
                <button onClick={() => handleSelectUser(user)}>Edit</button>
              </li>
            ))}
          </ul>
          {users.selectedUser && (
            <form onSubmit={handleUpdateUser}>
              <label>
                New Role:
                <select value={users.newRole} onChange={handleNewRoleChange}>
                  <option value="">Select a role</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </label>
              <br />
              <button type="submit">Update</button>
            </form>
          )}
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
        {deviceForm.devices.map((device) => (
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
