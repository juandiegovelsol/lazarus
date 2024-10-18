import React from "react";
import MenuButton from "./MenuButton";
import "./Header.css";

const Header = ({ onClick }) => {
  return (
    <div className="header">
      <MenuButton onClick={onClick} />
    </div>
  );
};

export default Header;
