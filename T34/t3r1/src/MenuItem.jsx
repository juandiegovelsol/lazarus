import React from "react";
import { Link } from "react-router-dom";
import "./MenuItem.css";

const MenuItem = ({ to, children }) => {
  return (
    <li>
      <Link to={`/1`}>{children}</Link>
    </li>
  );
};

export const MenuItem2 = ({ to, children }) => {
  return (
    <li>
      <Link to={`/2`}>{children}</Link>
    </li>
  );
};

export const MenuItem3 = ({ to, children }) => {
  return (
    <li>
      <Link to={`/3`}>{children}</Link>
    </li>
  );
};

export default MenuItem;
