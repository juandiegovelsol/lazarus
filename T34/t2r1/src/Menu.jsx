import React from "react";
import MenuItem from "./MenuItem";
import CloseButton from "./CloseButton";
import "./Menu.css";

const Menu = ({ isOpen, onClick }) => {
  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <ul>
        <MenuItem to="/">Section 1</MenuItem>
        <MenuItem to="/section2">Section 2</MenuItem>
        <MenuItem to="/section3">Section 3</MenuItem>
      </ul>
      <CloseButton onClick={onClick} />
    </div>
  );
};

export default Menu;
