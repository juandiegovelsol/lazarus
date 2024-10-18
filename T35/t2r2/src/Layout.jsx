import React, { useState, useEffect } from "react";
import Header from "./Header";
import Menu from "./Menu";
import Content from "./Content";
import "./Layout.css";

const CharactersContext = React.createContext();

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CharactersContext.Provider value={{ characters, error }}>
      <div>
        <Header onClick={handleToggle} />
        <Menu isOpen={isOpen} onClick={handleToggle} />
        <Content />
      </div>
    </CharactersContext.Provider>
  );
};

export default Layout;
