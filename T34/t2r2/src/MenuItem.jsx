import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuItem.css";

const MenuItem = ({ href, children }) => {
  return (
    <li>
      <NavLink to={href}>{children}</NavLink>
    </li>
  );
};

export default MenuItem;
