import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CharactersContext } from "./Layout";
import "./CharacterSection.css";

const CharacterSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { characters, error } = useContext(CharactersContext);
  const [character, setCharacter] = useState({});

  useEffect(() => {
    const characterData = characters.find(
      (character) => character.id === parseInt(id)
    );
    if (characterData) {
      setCharacter(characterData);
    } else {
      const fetchCharacter = async () => {
        try {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/${id}`
          );
          if (!response.ok) {
            throw new Error("Character not found");
          }
          const data = await response.json();
          setCharacter(data);
        } catch (error) {
          if (error.message === "Character not found" && id !== "1") {
            navigate("/1", { replace: true });
          } else {
            setCharacter({ error: error.message });
          }
        }
      };
      fetchCharacter();
    }
  }, [id, navigate, characters]);

  if (character.error) {
    return <div>Error: {character.error}</div>;
  }

  if (!character.name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="character-section">
      <h1>Character {character.id}</h1>
      <p>
        <b>Name:</b> {character.name}
      </p>
      <p>
        <b>Status:</b> {character.status}
      </p>
      <p>
        <b>Species:</b> {character.species}
      </p>
      <p>
        <b>Gender:</b> {character.gender}
      </p>
      <img src={character.image} alt={character.name} />
      <p>
        <b>Episodes:</b> {character.episode?.length || 0}
      </p>
      <ul>
        {character.episode?.map((episode, index) => (
          <li key={index}>{episode}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterSection;
