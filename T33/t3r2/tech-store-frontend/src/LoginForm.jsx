import React, { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Register logic here
  };

  return (
    <div>
      {isLogin ? (
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
          <button type="button" onClick={() => setIsLogin(false)}>
            Register
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit}>
          <h1>Register</h1>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <label>
            Role:
            <select value={role} onChange={handleRoleChange}>
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
