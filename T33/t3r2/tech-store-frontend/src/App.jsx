import React from "react";
import LoginForm from "./LoginForm";
import DeviceForm from "./DeviceForm";

const App = () => {
  const [user, setUser] = React.useState(null);
  const [deviceForm, setDeviceForm] = React.useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    imageUrl: "",
    devices: [],
  });
  const [users, setUsers] = React.useState({
    users: [],
    selectedUser: null,
    newRole: "",
  });

  const handleFetchDevices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/devices");
      const devices = await response.json();
      setDeviceForm((prevDeviceForm) => ({ ...prevDeviceForm, devices }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const users = await response.json();
      setUsers((prevUsers) => ({ ...prevUsers, users }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const userData = await response.json();
      setUser(userData);
      handleFetchDevices();
      if (userData.role === "admin") {
        handleFetchUsers();
      }
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

  const handleSubmitDevice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: deviceForm.title,
          description: deviceForm.description,
          price: deviceForm.price,
          quantity: deviceForm.quantity,
          imageUrl: deviceForm.imageUrl,
        }),
      });
      const newDevice = await response.json();
      setDeviceForm((prevDeviceForm) => ({
        ...prevDeviceForm,
        devices: [...prevDeviceForm.devices, newDevice],
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        imageUrl: "",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${users.selectedUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: users.newRole,
          }),
        }
      );
      const updatedUser = await response.json();
      setUsers((prevUsers) => ({
        ...prevUsers,
        users: prevUsers.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        ),
        selectedUser: null,
        newRole: "",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  if (!user || user.message === "Invalid email or password") {
    return <LoginForm handleLogin={handleLogin} />;
  }

  return (
    <DeviceForm
      user={user}
      deviceForm={deviceForm}
      setDeviceForm={setDeviceForm}
      users={users}
      setUsers={setUsers}
      handleLogout={handleLogout}
      handleSubmitDevice={handleSubmitDevice}
      handleUpdateUser={handleUpdateUser}
    />
  );
};

export default App;
