import React, { useState, useRef, useEffect } from "react";

const Track = ({ isPlayingAll }) => {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [visualization, setVisualization] = useState([]);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (isPlayingAll) {
      play();
    }
  }, [isPlayingAll]);

  const record = async () => {
    if (!recording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        audioRef.current.src = url;
        processAudio(blob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } else {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const play = () => {
    if (audioRef.current.src) {
      audioRef.current.play();
      setPlaying(true);
      audioRef.current.onended = () => {
        setPlaying(false);
      };
    }
  };

  const processAudio = async (blob) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const arrayBuffer = await blob.arrayBuffer();

    try {
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const channelData = audioBuffer.getChannelData(0);
      const interval = 250; // 250ms
      const samplesPerInterval = Math.floor(
        audioBuffer.sampleRate * (interval / 1000)
      );
      const totalBars = Math.floor(channelData.length / samplesPerInterval);

      const newVisualization = [];

      for (let i = 0; i < totalBars; i++) {
        const start = i * samplesPerInterval;
        const end = start + samplesPerInterval;
        const slice = channelData.slice(start, end);
        const average =
          slice.reduce((sum, val) => sum + Math.abs(val), 0) / slice.length;
        const height = Math.min(50, Math.max(1, average * 500));
        newVisualization.push(
          <div key={i} className="bar" style={{ height: `${height}px` }} />
        );
      }

      setVisualization(newVisualization);
    } catch (error) {
      console.error("Error processing audio data:", error);
    }
  };

  return (
    <div className="track">
      <button onClick={record}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      <button onClick={play} disabled={!audioUrl}>
        {playing ? "Playing..." : "Play"}
      </button>
      <div className="visualization">{visualization}</div>
    </div>
  );
};

export default Track;
