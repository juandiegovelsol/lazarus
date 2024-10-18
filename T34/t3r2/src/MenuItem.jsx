import React from "react";
import { Link } from "react-router-dom";
import "./MenuItem.css";

const MenuItem = ({ to, children }) => {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default MenuItem;
