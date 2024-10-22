// src/App.js
import React, { useState } from "react";
import Track from "./Track";
import "./style.css";

const App = () => {
  const [tracks, setTracks] = useState([]);

  const addTrack = () => {
    setTracks((prevTracks) => [...prevTracks, {}]);
  };

  const playAll = () => {
    tracks.forEach((track, index) => {
      const audioElement = document.querySelectorAll("audio")[index];
      if (audioElement) {
        audioElement.play();
      }
    });
  };

  return (
    <div className="app">
      <h1>Multi-Track Audio Recorder</h1>
      <div id="tracks">
        {tracks.map((track, index) => (
          <Track key={index} />
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
