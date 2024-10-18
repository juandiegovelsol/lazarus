import React, { useState } from "react";
import "./App.css";
import MenuButton from "./components/MenuButton";
import Menu from "./components/Menu";
import MenuItem from "./components/MenuItem";
import Content from "./components/Content";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <MenuButton onClick={handleMenuClick} />
      <Menu isOpen={isOpen} onClose={handleCloseClick}>
        <MenuItem href="#section1">Section 1</MenuItem>
        <MenuItem href="#section2">Section 2</MenuItem>
        <MenuItem href="#section3">Section 3</MenuItem>
      </Menu>
      <Content shift={isOpen}>
        <div id="section1">
          <h1>Section 1</h1>
          <p>Content for section 1.</p>
          <p>Content for section 1.</p>
          <p>Content for section 1.</p>
          <p>Content for section 1.</p>
          <p>Content for section 1.</p>
        </div>
        <div id="section2">
          <h1>Section 2</h1>
          <p>Content for section 2.</p>
          <p>Content for section 2.</p>
          <p>Content for section 2.</p>
          <p>Content for section 2.</p>
          <p>Content for section 2.</p>
        </div>
        <div id="section3">
          <h1>Section 3</h1>
          <p>Content for section 3.</p>
          <p>Content for section 3.</p>
          <p>Content for section 3.</p>
          <p>Content for section 3.</p>
          <p>Content for section 3.</p>
        </div>
      </Content>
    </div>
  );
}

export default App;
