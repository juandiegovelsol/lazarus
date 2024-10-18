import React, { useState, useEffect } from "react";

const Flower = ({
  flower,
  playSound,
  pianoVolume,
  fluteVolume,
  violinVolume,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySound = () => {
    playSound(flower, setIsPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      const sound = flower.sound;
      sound.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
  }, [isPlaying, flower]);

  return (
    <div className="flower" onClick={handlePlaySound}>
      <img src={flower.image} alt={flower.name} />
      {isPlaying && <div className="playing" />}
    </div>
  );
};

export default Flower;
