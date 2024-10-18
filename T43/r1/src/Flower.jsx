import React, { useState, useEffect } from "react";
import "./Flower.css";

const Flower = ({ flower, volume, playSound }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySound = () => {
    playSound(flower, setIsPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      const timeoutId = setTimeout(() => {
        setIsPlaying(false);
      }, flower.sound.duration * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isPlaying, flower]);

  return (
    <div
      className={`flower ${isPlaying ? "playing" : ""}`}
      onClick={handlePlaySound}
    >
      <img src={flower.image} alt={flower.name} />
    </div>
  );
};

export default Flower;
