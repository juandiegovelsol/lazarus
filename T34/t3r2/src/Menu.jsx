import React from "react";
import MenuItem from "./MenuItem";
import CloseButton from "./CloseButton";
import "./Menu.css";

const Menu = ({ isOpen, onClick }) => {
  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <ul>
        <MenuItem to="/1">Character 1</MenuItem>
        <MenuItem to="/2">Character 2</MenuItem>
        <MenuItem to="/3">Character 3</MenuItem>
      </ul>
      <CloseButton onClick={onClick} />
    </div>
  );
};

export default Menu;
