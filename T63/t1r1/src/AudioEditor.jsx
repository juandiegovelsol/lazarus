import React, { useState, useRef, useEffect } from "react";

const AudioEditor = () => {
  const [tracks, setTracks] = useState([]);
  const [recording, setRecording] = useState(false);
  const tracksContainerRef = useRef(null);

  const addTrack = () => {
    const newTrack = {
      id: Date.now(),
      recordBtnText: "Start Recording",
      playBtnText: "Play",
      audio: null,
      mediaRecorder: null,
      chunks: [],
      visualization: [],
      intensityData: [],
    };
    setTracks([...tracks, newTrack]);
  };

  const handleRecordClick = (trackId) => {
    const track = tracks.find((t) => t.id === trackId);
    if (track.recordBtnText === "Start Recording") {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => {
          track.chunks.push(e.data);
        };
        mediaRecorder.onstop = () => {
          const blob = new Blob(track.chunks, {
            type: "audio/ogg; codecs=opus",
          });
          track.audio = new Audio(URL.createObjectURL(blob));
          track.playBtnText = "Play";
          processAudio(blob, track);
          track.chunks = [];
        };
        mediaRecorder.start();
        setRecording(true);
        track.recordBtnText = "Stop Recording";
      });
    } else {
      track.mediaRecorder.stop();
      setRecording(false);
      track.recordBtnText = "Start Recording";
    }
  };

  const handlePlayClick = (trackId) => {
    const track = tracks.find((t) => t.id === trackId);
    if (track.audio) {
      track.audio.play();
    }
  };

  const processAudio = (blob, track) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onloadend = () => {
      audioContext.decodeAudioData(reader.result, (buffer) => {
        const sampleRate = buffer.sampleRate;
        const duration = buffer.duration;
        const interval = 0.25;
        const totalBars = Math.floor(duration / interval);
        const channelData = buffer.getChannelData(0);

        for (let i = 0; i < totalBars; i++) {
          const start = Math.floor(i * interval * sampleRate);
          const end = Math.floor((i + 1) * interval * sampleRate);
          let sum = 0;
          for (let j = start; j < end; j++) {
            sum += Math.abs(channelData[j]);
          }
          const intensity = sum / (end - start);
          track.intensityData.push(intensity);
          track.visualization.push(
            <div
              key={i}
              className="bar"
              style={{ height: `${intensity * 100}px` }}
            />
          );
        }
      });
    };
  };

  const handlePlayAllClick = () => {
    tracks.forEach((track) => {
      if (track.audio) {
        track.audio.play();
      }
    });
  };

  return (
    <div className="audio-editor">
      <h1>Multi-Track Audio Recorder</h1>
      <div ref={tracksContainerRef} className="tracks">
        {tracks.map((track) => (
          <div key={track.id} className="track">
            <button onClick={() => handleRecordClick(track.id)}>
              {track.recordBtnText}
            </button>
            <button onClick={() => handlePlayClick(track.id)}>
              {track.playBtnText}
            </button>
            <div className="visualization">{track.visualization}</div>
          </div>
        ))}
      </div>
      <button onClick={addTrack}>Add Track</button>
      <button onClick={handlePlayAllClick}>Play All</button>
    </div>
  );
};

export default AudioEditor;
