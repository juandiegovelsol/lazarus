import React from "react";
import MenuItem from "./MenuItem";
import CloseButton from "./CloseButton";
import "./Menu.css";

const Menu = ({ isOpen, onClick }) => {
  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <ul>
        <MenuItem href="#section1">Section 1</MenuItem>
        <MenuItem href="#section2">Section 2</MenuItem>
        <MenuItem href="#section3">Section 3</MenuItem>
      </ul>
      <CloseButton onClick={onClick} />
    </div>
  );
};

export default Menu;
