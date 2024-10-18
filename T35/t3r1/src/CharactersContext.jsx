import React, { createContext, useState, useEffect } from "react";

const CharactersContext = createContext();

const CharactersProvider = ({ children }) => {
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

  return (
    <CharactersContext.Provider value={{ characters, error }}>
      {children}
    </CharactersContext.Provider>
  );
};

export { CharactersProvider, CharactersContext };
