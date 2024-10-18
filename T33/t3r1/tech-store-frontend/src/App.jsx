import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import DeviceForm from "./DeviceForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    role: "",
    isLogin: true,
  });
  const [deviceState, setDeviceState] = useState({
    devices: [],
    users: [],
    selectedUser: null,
    newRole: "",
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    imageUrl: "",
  });

  const handleFetchDevices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/devices");
      const devices = await response.json();
      setDeviceState((prev) => ({ ...prev, devices }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const users = await response.json();
      setDeviceState((prev) => ({ ...prev, users }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginState.email,
          password: loginState.password,
        }),
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(loginState);
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginState.email,
          password: loginState.password,
          role: loginState.role,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const userData = await response.json();
      setUser(userData);
      setLoginState({
        email: "",
        password: "",
        role: "",
        isLogin: true,
      });
    } catch (error) {
      console.error("Registration error:", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: deviceState.title,
          description: deviceState.description,
          price: deviceState.price,
          quantity: deviceState.quantity,
          imageUrl: deviceState.imageUrl,
        }),
      });
      const newDevice = await response.json();
      setDeviceState((prev) => ({
        ...prev,
        devices: [...prev.devices, newDevice],
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
        `http://localhost:3000/api/users/${deviceState.selectedUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: deviceState.newRole,
          }),
        }
      );
      const updatedUser = await response.json();
      setDeviceState((prev) => ({
        ...prev,
        users: prev.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        ),
        selectedUser: null,
        newRole: "",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      handleFetchDevices();
      if (user.role === "admin") {
        handleFetchUsers();
      }
    }
  }, [user]);

  if (!user || user.message === "Invalid email or password") {
    return (
      <LoginForm
        loginState={loginState}
        setLoginState={setLoginState}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
    );
  }

  return (
    <DeviceForm
      user={user}
      deviceState={deviceState}
      setDeviceState={setDeviceState}
      handleLogout={handleLogout}
      handleSubmit={handleSubmit}
      handleUpdateUser={handleUpdateUser}
    />
  );
};

export default App;
