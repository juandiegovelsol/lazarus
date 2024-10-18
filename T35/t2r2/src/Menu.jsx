import React from "react";
import MenuItem from "./MenuItem";
import CloseButton from "./CloseButton";
import { useContext } from "react";
import { CharactersContext } from "./Layout";
import "./Menu.css";

const Menu = ({ isOpen, onClick }) => {
  const { characters, error } = useContext(CharactersContext);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <ul className="menu-list">
        {characters.map((character) => (
          <MenuItem key={character.id} to={`/${character.id}`}>
            {character.name}
          </MenuItem>
        ))}
      </ul>
      <CloseButton onClick={onClick} />
    </div>
  );
};

export default Menu;
