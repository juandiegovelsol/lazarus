// src/LoginForm.jsx
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
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
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
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
      localStorage.removeItem("user");
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.email}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      {isLogin ? (
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
          <button type="button" onClick={() => setIsLogin(false)}>
            Register
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </label>
          <br />
          <button type="submit">Register</button>
          <button type="button" onClick={() => setIsLogin(true)}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
