// src/UserContext.js
import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    console.log("loging", email, password);
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
      const data = await response.json();
      if (data.token) {
        const response = await fetch("http://localhost:3000/api/users", {
          headers: {
            Authorization: data.token,
          },
        });
        const users = await response.json();
        const loggedInUser = users.find(
          (user) => generateToken(user) === data.token
        );
        setUser(loggedInUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email, password, role) => {
    console.log("singin", email, password, role);
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
      const data = await response.json();
      if (data.id) {
        login(email, password);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const generateToken = (user) => {
    return `token-${user.id}`;
  };

  return (
    <UserContext.Provider value={{ user, login, register }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
