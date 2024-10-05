// src/App.jsx
import React from "react";
import LoginForm from "./LoginForm";
import DeviceForm from "./DeviceForm";

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div>
      <DeviceForm />
    </div>
  );
};

export default App;
