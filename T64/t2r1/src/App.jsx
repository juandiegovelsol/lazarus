import React, { useState } from "react";
import Track from "./Track";
import "./style.css";

const App = () => {
  const [tracks, setTracks] = useState([]); // Stores the list of audio tracks
  const [isPlayingAll, setIsPlayingAll] = useState(false); // Flag to play all tracks simultaneously

  // Function to add a new audio track
  const addTrack = () => {
    // Updates the tracks state with a new audio track
    setTracks((prevTracks) => [...prevTracks, {}]);
  };

  // Function to play all audio tracks at the same time
  const playAll = () => {
    // Set the isPlayingAll state to true to cause all the tracks to be played
    setIsPlayingAll(true);
    // After 500 milliseconds, the isPlayingAll state is set to false again
    setTimeout(() => setIsPlayingAll(false), 500);
  };

  return (
    <div className="app">
      <h1 className="title">Multi-Track Audio Recorder</h1>
      <div className="tracks-container">
        <div id="tracks">
          {/* Render a Track component for each track in the list */}
          {tracks.map((track, index) => (
            <Track key={index} isPlayingAll={isPlayingAll} />
          ))}
        </div>
      </div>
      <div className="button-container">
        <button id="add-track" onClick={addTrack}>
          Add Track
        </button>
        <button id="play-all" onClick={playAll}>
          Play All
        </button>
      </div>
    </div>
  );
};

export default App;
