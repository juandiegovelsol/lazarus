import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import CloseButton from "./CloseButton";
import "./Menu.css";

const Menu = ({ isOpen, onClick }) => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character"
        );
        const data = await response.json();
        setCharacters(data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <ul>
        {characters.slice(0, 10).map((character) => (
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
