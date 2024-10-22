import React, { useState } from "react";
import Track from "./Track";
import "./style.css";

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  const addTrack = () => {
    setTracks((prevTracks) => [...prevTracks, {}]);
  };

  const playAll = () => {
    setIsPlayingAll(true);
    setTimeout(() => setIsPlayingAll(false), 500);
  };

  return (
    <div className="app">
      <h1>Multi-Track Audio Recorder</h1>
      <div id="tracks">
        {tracks.map((track, index) => (
          <Track key={index} isPlayingAll={isPlayingAll} />
        ))}
      </div>
      <button id="add-track" onClick={addTrack}>
        Add Track
      </button>
      <button id="play-all" onClick={playAll}>
        Play All
      </button>
    </div>
  );
};

export default App;
