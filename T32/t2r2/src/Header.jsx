import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">Logo</div>
        <div className="menu">
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
