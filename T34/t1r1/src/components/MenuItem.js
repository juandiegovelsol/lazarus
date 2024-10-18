import React from "react";
/* import "./MenuItem.css"; */

const MenuItem = ({ children, href }) => {
  return (
    <li>
      <a href={href}>{children}</a>
    </li>
  );
};

export default MenuItem;
