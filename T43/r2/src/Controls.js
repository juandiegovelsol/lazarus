import React from "react";

const Controls = ({
  pianoVolume,
  setPianoVolume,
  fluteVolume,
  setFluteVolume,
  violinVolume,
  setViolinVolume,
  recordBtnText,
  handleRecord,
  playRecording,
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
          onChange={(e) => setPianoVolume(e.target.value)}
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
          onChange={(e) => setFluteVolume(e.target.value)}
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
          onChange={(e) => setViolinVolume(e.target.value)}
        />
      </div>
      <button id="record-btn" onClick={handleRecord}>
        {recordBtnText}
      </button>
      {playRecording && (
        <button id="play-recording-btn" onClick={playRecording}>
          Play Recording
        </button>
      )}
    </div>
  );
};

export default Controls;
