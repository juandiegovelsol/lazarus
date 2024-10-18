import React from "react";
/* import "./MenuButton.css"; */

const MenuButton = ({ onClick }) => {
  return (
    <button className="menu-button" onClick={onClick}>
      Menu
    </button>
  );
};

export default MenuButton;
