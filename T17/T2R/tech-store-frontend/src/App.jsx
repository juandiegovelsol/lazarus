// src/App.jsx
import React from "react";
import LoginForm from "./LoginForm";
import DeviceForm from "./DeviceForm";

const App = () => {
  const [user, setUser] = React.useState(null);

  if (!user || user.message === "Invalid email or password") {
    return <LoginForm setUser={setUser} />;
  }

  return <DeviceForm user={user} setUser={setUser} />;
};

export default App;
