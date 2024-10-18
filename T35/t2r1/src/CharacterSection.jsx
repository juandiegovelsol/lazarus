import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CharactersContext } from "./CharactersContext";
import "./CharacterSection.css";

const CharacterSection = () => {
  const { characters } = useContext(CharactersContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const findCharacter = characters.find((c) => c.id === parseInt(id));
    if (findCharacter) {
      setCharacter(findCharacter);
      setError(null);
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
          setError(null);
        } catch (error) {
          if (error.message === "Character not found" && id !== "1") {
            navigate("/1", { replace: true });
          } else {
            setError(error);
          }
        }
      };
      fetchCharacter();
    }
  }, [id, navigate, characters]);

  if (error) {
    return <div>Error: {error.message}</div>;
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
