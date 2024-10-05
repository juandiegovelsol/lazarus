// src/RegisterForm.jsx
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { register } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password, role);
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default RegisterForm;
