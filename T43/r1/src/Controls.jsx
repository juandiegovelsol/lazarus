import React from "react";
import "./Controls.css";

const Controls = ({
  pianoVolume,
  fluteVolume,
  violinVolume,
  handleVolumeChange,
  handleRecord,
  handlePlayRecording,
  isRecording,
  hasRecording,
}) => {
  return (
    <div id="controls">
      <div className="volume-control">
        <label htmlFor="piano-volume">Piano:</label>
        <input
          type="range"
          id="piano-volume"
          min="0"
          max="1"
          step="0.01"
          value={pianoVolume}
          onChange={(e) => handleVolumeChange("piano", e.target.value)}
        />
      </div>
      <div className="volume-control">
        <label htmlFor="flute-volume">Flute:</label>
        <input
          type="range"
          id="flute-volume"
          min="0"
          max="1"
          step="0.01"
          value={fluteVolume}
          onChange={(e) => handleVolumeChange("flute", e.target.value)}
        />
      </div>
      <div className="volume-control">
        <label htmlFor="violin-volume">Violin:</label>
        <input
          type="range"
          id="violin-volume"
          min="0"
          max="1"
          step="0.01"
          value={violinVolume}
          onChange={(e) => handleVolumeChange("violin", e.target.value)}
        />
      </div>
      <button id="record-btn" onClick={handleRecord}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {hasRecording && (
        <button id="play-recording-btn" onClick={handlePlayRecording}>
          Play Recording
        </button>
      )}
    </div>
  );
};

export default Controls;
