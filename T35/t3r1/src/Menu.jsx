import React, { useContext, useState } from "react";
import MenuItem from "./MenuItem";
import CloseButton from "./CloseButton";
import { CharactersContext } from "./CharactersContext";
import "./Menu.css";

const Menu = ({ isOpen, onClick }) => {
  const { characters, error } = useContext(CharactersContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMoreCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNumber + 1}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      const data = await response.json();
      characters.push(...data.results);
      setPageNumber(pageNumber + 1);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <ul className="menu-list">
        {characters.map((character) => (
          <MenuItem
            key={character.id}
            to={`/${character.id}`}
            onClick={onClick}
          >
            {character.name}
          </MenuItem>
        ))}
      </ul>
      <button onClick={fetchMoreCharacters} disabled={loading}>
        {loading ? "Loading..." : "Load More Characters"}
      </button>
      <CloseButton onClick={onClick} />
    </div>
  );
};

export default Menu;
