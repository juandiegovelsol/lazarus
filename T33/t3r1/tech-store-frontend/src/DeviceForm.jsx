import React from "react";

const DeviceForm = ({
  user,
  deviceState,
  setDeviceState,
  handleLogout,
  handleSubmit,
  handleUpdateUser,
}) => {
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
                value={deviceState.title}
                onChange={(e) =>
                  setDeviceState((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                value={deviceState.description}
                onChange={(e) =>
                  setDeviceState((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="number"
                value={deviceState.price}
                onChange={(e) =>
                  setDeviceState((prev) => ({
                    ...prev,
                    price: e.target.valueAsNumber,
                  }))
                }
              />
            </label>
            <br />
            <label>
              Quantity:
              <input
                type="number"
                value={deviceState.quantity}
                onChange={(e) =>
                  setDeviceState((prev) => ({
                    ...prev,
                    quantity: e.target.valueAsNumber,
                  }))
                }
              />
            </label>
            <br />
            <label>
              Image URL:
              <input
                type="text"
                value={deviceState.imageUrl}
                onChange={(e) =>
                  setDeviceState((prev) => ({
                    ...prev,
                    imageUrl: e.target.value,
                  }))
                }
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>

          <h1>Manage Users</h1>
          <ul>
            {deviceState.users.map((user) => (
              <li key={user.id}>
                <p>{user.email}</p>
                <p>Role: {user.role}</p>
                <button
                  onClick={() =>
                    setDeviceState((prev) => ({ ...prev, selectedUser: user }))
                  }
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
          {deviceState.selectedUser && (
            <form onSubmit={handleUpdateUser}>
              <label>
                New Role:
                <select
                  value={deviceState.newRole}
                  onChange={(e) =>
                    setDeviceState((prev) => ({
                      ...prev,
                      newRole: e.target.value,
                    }))
                  }
                >
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
        {deviceState.devices.map((device) => (
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
