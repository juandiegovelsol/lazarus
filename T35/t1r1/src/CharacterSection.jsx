import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CharacterSection.css";

const CharacterSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState({});
  const [error, setError] = useState(null);

  const fetchAPI = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Character not found");
    }
    return await response.json();
  };

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await fetchAPI(
          `https://rickandmortyapi.com/api/character/${id}`
        );
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
  }, [id, navigate]);

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
