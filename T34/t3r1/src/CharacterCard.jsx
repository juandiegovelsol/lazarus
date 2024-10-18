import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CharacterCard.css";

const CharacterCard = () => {
  const { id } = useParams();
  const [character, setCharacter] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="character-card">
      <h1>Character {id}</h1>
      <img src={character.image} alt={character.name} />
      <p>
        <strong>Name:</strong> {character.name}
      </p>
      <p>
        <strong>Status:</strong> {character.status}
      </p>
      <p>
        <strong>Species:</strong> {character.species}
      </p>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Episodes:</strong> {character.episode?.length}
      </p>
      <ul>
        {character.episode?.map((episode, index) => (
          <li key={index}>{episode}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterCard;
