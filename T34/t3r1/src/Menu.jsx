import React from "react";
import MenuItem, { MenuItem2, MenuItem3 } from "./MenuItem";
import CloseButton from "./CloseButton";
import "./Menu.css";

const Menu = ({ isOpen, onClick }) => {
  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <ul>
        <MenuItem>Section 1 (Character 1)</MenuItem>
        <MenuItem2>Section 2 (Character 2)</MenuItem2>
        <MenuItem3>Section 3 (Character 3)</MenuItem3>
      </ul>
      <CloseButton onClick={onClick} />
    </div>
  );
};

export default Menu;
