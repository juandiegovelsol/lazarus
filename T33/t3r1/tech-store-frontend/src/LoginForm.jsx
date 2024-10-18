import React from "react";

const LoginForm = ({
  loginState,
  setLoginState,
  handleLogin,
  handleRegister,
}) => {
  return (
    <div>
      {loginState.isLogin ? (
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <label>
            Email:
            <input
              type="email"
              value={loginState.email}
              onChange={(e) =>
                setLoginState((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={loginState.password}
              onChange={(e) =>
                setLoginState((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </label>
          <br />
          <button type="submit">Login</button>
          <button
            type="button"
            onClick={() =>
              setLoginState((prev) => ({ ...prev, isLogin: false }))
            }
          >
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
              value={loginState.email}
              onChange={(e) =>
                setLoginState((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={loginState.password}
              onChange={(e) =>
                setLoginState((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
          </label>
          <br />
          <label>
            Role:
            <select
              value={loginState.role}
              onChange={(e) =>
                setLoginState((prev) => ({ ...prev, role: e.target.value }))
              }
              required
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </label>
          <br />
          <button type="submit">Register</button>
          <button
            type="button"
            onClick={() =>
              setLoginState((prev) => ({ ...prev, isLogin: true }))
            }
          >
            Back to Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
