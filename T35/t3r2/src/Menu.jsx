import React, { useContext, useState } from "react";
import MenuItem from "./MenuItem";
import CloseButton from "./CloseButton";
import { CharactersContext } from "./CharactersContext";
import "./Menu.css";

const Menu = ({ isOpen, onClick }) => {
  const { characters, error } = useContext(CharactersContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [newCharacters, setNewCharacters] = useState([]);

  const fetchMoreCharacters = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNumber + 1}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      const data = await response.json();
      setNewCharacters((prevCharacters) => [
        ...prevCharacters,
        ...data.results,
      ]);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <ul className="menu-list">
        {[...characters, ...newCharacters].map((character) => (
          <MenuItem
            key={character.id}
            to={`/${character.id}`}
            onClick={onClick}
          >
            {character.name}
          </MenuItem>
        ))}
      </ul>
      <button onClick={fetchMoreCharacters}>Load More Characters</button>
      <CloseButton onClick={onClick} />
    </div>
  );
};

export default Menu;
