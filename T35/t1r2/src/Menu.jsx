import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import CloseButton from "./CloseButton";
import "./Menu.css";

const Menu = ({ isOpen, onClick }) => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  const fetchCharacters = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      const data = await response.json();
      setCharacters(data.results);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (characters.length === 0) {
      fetchCharacters();
    }
  }, []);

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
