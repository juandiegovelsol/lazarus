// src/App.jsx
import React from "react";
import DeviceForm from "./DeviceForm";
import { UserProvider } from "./UserContext";

const App = () => {
  return (
    <UserProvider>
      <DeviceForm />
    </UserProvider>
  );
};

export default App;
