import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EpisodeSection.css";

const EpisodeSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState({});
  const [error, setError] = useState(null);

  const fetchEpisode = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      if (!response.ok) {
        throw new Error("Episode not found");
      }
      const data = await response.json();
      setEpisode(data);
      setError(null);
    } catch (error) {
      if (error.message === "Episode not found") {
        navigate("/1", { replace: true });
      } else {
        setError(error);
      }
    }
  };

  useEffect(() => {
    fetchEpisode();
  }, [id, navigate]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!episode.name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="episode-section">
      <h1>Episode {episode.id}</h1>
      <p>
        <b>Name:</b> {episode.name}
      </p>
      <p>
        <b>Air Date:</b> {episode.air_date}
      </p>
      <p>
        <b>Episode:</b> {episode.episode}
      </p>
    </div>
  );
};

export default EpisodeSection;
