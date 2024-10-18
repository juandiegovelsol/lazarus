import React from "react";
import Flower from "./Flower";

const Flowers = ({
  flowers,
  playSound,
  pianoVolume,
  fluteVolume,
  violinVolume,
}) => {
  return (
    <div id="garden">
      {flowers.map((flower) => (
        <Flower
          key={flower.name}
          flower={flower}
          playSound={playSound}
          pianoVolume={pianoVolume}
          fluteVolume={fluteVolume}
          violinVolume={violinVolume}
        />
      ))}
    </div>
  );
};

export default Flowers;
