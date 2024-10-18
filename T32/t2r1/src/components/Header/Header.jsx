import React from "react";
import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Logo />
        <Menu />
      </nav>
    </header>
  );
};

export default Header;
