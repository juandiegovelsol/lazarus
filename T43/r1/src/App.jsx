import React, { useState, useEffect } from "react";
import Flower from "./Flower";
import Controls from "./Controls";
import "./App.css";
import pianoSound from "./assets/piano_c.mp3";
import fluteSound from "./assets/flute_c.mp3";
import violinSound from "./assets/violin_c.mp3";
import rose from "./assets/rose.svg";
import tulip from "./assets/tulip.svg";
import lily from "./assets/lily.svg";

const flowers = [
  { name: "Rose", sound: new Audio(pianoSound), image: rose },
  { name: "Tulip", sound: new Audio(fluteSound), image: tulip },
  { name: "Lily", sound: new Audio(violinSound), image: lily },
];

const App = () => {
  const [pianoVolume, setPianoVolume] = useState(1);
  const [fluteVolume, setFluteVolume] = useState(1);
  const [violinVolume, setViolinVolume] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [audioCtx, setAudioCtx] = useState(null);
  const [destination, setDestination] = useState(null);
  const [shouldDownload, setShouldDownload] = useState(false);

  const playSound = (flower, setIsPlaying) => {
    flower.sound.currentTime = 0;

    if (flower.name === "Rose") {
      flower.sound.volume = pianoVolume;
    } else if (flower.name === "Tulip") {
      flower.sound.volume = fluteVolume;
    } else if (flower.name === "Lily") {
      flower.sound.volume = violinVolume;
    }

    flower.sound.play();
    setIsPlaying(true);
  };

  const handleVolumeChange = (instrument, volume) => {
    if (instrument === "piano") {
      setPianoVolume(volume);
    } else if (instrument === "flute") {
      setFluteVolume(volume);
    } else if (instrument === "violin") {
      setViolinVolume(volume);
    }
  };

  const handleRecord = async () => {
    if (!isRecording) {
      try {
        const audioContext = new AudioContext();
        const dest = audioContext.createMediaStreamDestination();

        const stream = dest.stream;

        flowers.forEach((flower) => {
          const source = audioContext.createMediaElementSource(flower.sound);
          source.connect(dest);
          source.connect(audioContext.destination);
        });

        const mediaRec = new MediaRecorder(stream);
        mediaRec.ondataavailable = (e) => {
          if (e.data.size > 0) {
            setRecordedBlob(e.data);
          }
        };
        mediaRec.onstop = () => {
          setHasRecording(true);
          setShouldDownload(true);
        };
        mediaRec.start();
        setMediaRecorder(mediaRec);
        setAudioCtx(audioContext);
        setDestination(dest);
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing audio stream:", err);
      }
    } else {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handlePlayRecording = () => {
    if (recordedBlob) {
      const audio = new Audio(URL.createObjectURL(recordedBlob));
      audio.play();
    }
  };

  useEffect(() => {
    flowers[0].sound.volume = pianoVolume;
    flowers[1].sound.volume = fluteVolume;
    flowers[2].sound.volume = violinVolume;
  }, [pianoVolume, fluteVolume, violinVolume]);

  useEffect(() => {
    flowers.forEach((flower) => {
      flower.sound.loop = false;
    });
  }, []);

  useEffect(() => {
    if (shouldDownload && recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "recorded-melody.ogg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setShouldDownload(false);
    }
  }, [shouldDownload, recordedBlob]);

  return (
    <div className="app">
      <h1>Interactive Musical Garden</h1>
      <div id="garden">
        {flowers.map((flower) => (
          <Flower
            key={flower.name}
            flower={flower}
            volume={
              flower.name === "Rose"
                ? pianoVolume
                : flower.name === "Tulip"
                ? fluteVolume
                : violinVolume
            }
            playSound={playSound}
          />
        ))}
      </div>
      <Controls
        pianoVolume={pianoVolume}
        fluteVolume={fluteVolume}
        violinVolume={violinVolume}
        handleVolumeChange={handleVolumeChange}
        handleRecord={handleRecord}
        handlePlayRecording={handlePlayRecording}
        isRecording={isRecording}
        hasRecording={hasRecording}
      />
    </div>
  );
};

export default App;
