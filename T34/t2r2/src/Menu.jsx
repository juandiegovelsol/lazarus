import React from "react";
import MenuItem from "./MenuItem";
import CloseButton from "./CloseButton";
import { NavLink } from "react-router-dom";
import "./Menu.css";

const Menu = ({ isOpen, onClick }) => {
  const sections = [
    { id: "section1", title: "Section 1" },
    { id: "section2", title: "Section 2" },
    { id: "section3", title: "Section 3" },
  ];

  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <ul>
        {sections.map((section, index) => (
          <MenuItem key={index} href={`/${section.id}`}>
            {section.title}
          </MenuItem>
        ))}
      </ul>
      <CloseButton onClick={onClick} />
    </div>
  );
};

export default Menu;
