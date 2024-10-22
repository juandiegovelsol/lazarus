import React, { useState, useRef, useEffect } from "react";

const Track = ({ isPlayingAll }) => {
  // Flag to indicate if the track is currently recording
  const [recording, setRecording] = useState(false);
  // Flag to indicate if the track is currently playing
  const [playing, setPlaying] = useState(false);
  // URL of the recorded audio
  const [audioUrl, setAudioUrl] = useState(null);
  // Visualization data for the audio track
  const [visualization, setVisualization] = useState([]);
  // Reference to the MediaRecorder instance
  const mediaRecorderRef = useRef(null);
  // Reference to the recorded audio chunks
  const chunksRef = useRef([]);
  // Reference to the Audio instance
  const audioRef = useRef(new Audio());

  // Clean up function to revoke the audio URL when the component unmounts or the dependency is updated
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Effect to play the track when the 'Play All' button is clicked
  useEffect(() => {
    if (isPlayingAll) {
      // The audio is played
      play();
    }
  }, [isPlayingAll]);

  // Function to start or stop recording the audio track
  const record = async () => {
    if (!recording) {
      // Get access to the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      // Event handler for when new audio data is available
      mediaRecorderRef.current.ondataavailable = (e) => {
        // Add the new audio data to the chunks array
        chunksRef.current.push(e.data);
      };

      // Event handler for when the recording is stopped
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        // Create a URL for the recorded audio
        const url = URL.createObjectURL(blob);
        // Set the audio URL state
        setAudioUrl(url);
        audioRef.current.src = url;
        // Process the recorded audio
        processAudio(blob);
      };

      // Start the recording
      mediaRecorderRef.current.start();
      // Set the recording state to true
      setRecording(true);
    } else {
      // Stop the recording
      mediaRecorderRef.current.stop();
      // Set the recording state to false
      setRecording(false);
    }
  };

  // Function to play the recorded audio track
  const play = () => {
    if (audioRef.current.src) {
      // Play the audio
      audioRef.current.play();
      // Set the playing state to true
      setPlaying(true);
      // Event handler for when the audio finishes playing
      audioRef.current.onended = () => {
        // Set the playing state to false
        setPlaying(false);
      };
    }
  };

  // Function to process the recorded audio data
  const processAudio = async (blob) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    // Get the array buffer from the recorded audio blob
    const arrayBuffer = await blob.arrayBuffer();

    try {
      // Decode the audio data
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      // Get the channel data from the audio buffer
      const channelData = audioBuffer.getChannelData(0);
      const interval = 250; // 250ms
      // Calculate the number of samples per interval
      const samplesPerInterval = Math.floor(
        audioBuffer.sampleRate * (interval / 1000)
      );
      // Calculate the total number of bars for the visualization
      const totalBars = Math.floor(channelData.length / samplesPerInterval);

      const newVisualization = [];

      for (let i = 0; i < totalBars; i++) {
        const start = i * samplesPerInterval;
        const end = start + samplesPerInterval;
        // Get the slice of channel data for the current bar
        const slice = channelData.slice(start, end);
        // Calculate the average value for the current bar
        const average =
          slice.reduce((sum, val) => sum + Math.abs(val), 0) / slice.length;
        // Calculate the height for the current bar
        const height = Math.min(50, Math.max(1, average * 500));
        // Add the current bar to the visualization data array
        newVisualization.push(
          <div key={i} className="bar" style={{ height: `${height}px` }} />
        );
      }

      // Set the visualization state
      setVisualization(newVisualization);
    } catch (error) {
      // Log any errors that occur during processing
      console.error("Error processing audio data:", error);
    }
  };

  return (
    <div className="track">
      <div className="button-group">
        <button onClick={record}>
          {recording ? "Stop Recording" : "Start Recording"}
        </button>
        <button onClick={play} disabled={!audioUrl}>
          {playing ? "Playing..." : "Play"}
        </button>
      </div>
      <div className="visualization">{visualization}</div>
    </div>
  );
};

export default Track;
