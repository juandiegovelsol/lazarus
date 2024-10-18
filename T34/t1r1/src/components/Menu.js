import React from "react";
/* import "./Menu.css"; */
import MenuItem from "./MenuItem";
import CloseButton from "./CloseButton";

const Menu = ({ isOpen, onClose, children }) => {
  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <ul>{children}</ul>
      <CloseButton onClick={onClose} />
    </div>
  );
};

export default Menu;
