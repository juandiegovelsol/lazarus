// src/Track.js
import React, { useState, useEffect } from "react";

const Track = () => {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [intensityData, setIntensityData] = useState([]);
  const [visualization, setVisualization] = useState([]);

  const record = async () => {
    if (!recording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);
      mediaRecorder.ondataavailable = (e) => {
        setChunks((prevChunks) => [...prevChunks, e.data]);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, {
          type: "audio/ogg; codecs=opus",
        });
        const audio = new Audio(URL.createObjectURL(blob));
        setAudio(audio);
        processAudio(blob);
        setChunks([]);
      };
      mediaRecorder.start();
      setRecording(true);
    } else {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const play = () => {
    if (audio) {
      audio.play();
      setPlaying(true);
      audio.onended = () => {
        setPlaying(false);
      };
    }
  };

  const processAudio = async (blob) => {
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

        const intensityData = [];
        const visualization = [];

        for (let i = 0; i < totalBars; i++) {
          const start = Math.floor(i * interval * sampleRate);
          const end = Math.floor((i + 1) * interval * sampleRate);
          let sum = 0;
          for (let j = start; j < end; j++) {
            sum += Math.abs(channelData[j]);
          }
          const intensity = sum / (end - start);
          intensityData.push(intensity);
          visualization.push(
            <div
              key={i}
              className="bar"
              style={{ height: `${intensity * 100}px` }}
            />
          );
        }

        setIntensityData(intensityData);
        setVisualization(visualization);
      });
    };
  };

  return (
    <div className="track">
      <button onClick={record}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      <button onClick={play} disabled={!audio}>
        {playing ? "Playing..." : "Play"}
      </button>
      <div className="visualization">{visualization}</div>
    </div>
  );
};

export default Track;
