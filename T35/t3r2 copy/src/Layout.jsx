import React, { useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Content from "./Content";
import { CharactersProvider } from "./CharactersContext";
import "./Layout.css";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CharactersProvider>
      <Header onClick={handleToggle} />
      <Menu isOpen={isOpen} onClick={handleToggle} />
      <Content />
    </CharactersProvider>
  );
};

export default Layout;
