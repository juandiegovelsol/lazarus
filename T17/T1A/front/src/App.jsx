// App.js
import React from "react";
import DeviceForm from "./DeviceForm";
import DeviceList from "./DeviceList";

const App = () => {
  return (
    <div>
      <h1>Device Store</h1>
      <DeviceForm />
      <DeviceList />
    </div>
  );
};

export default App;
