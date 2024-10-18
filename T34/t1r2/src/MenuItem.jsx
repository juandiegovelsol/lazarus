import React from "react";
import "./MenuItem.css";

const MenuItem = ({ href, children }) => {
  return (
    <li>
      <a href={href}>{children}</a>
    </li>
  );
};

export default MenuItem;
