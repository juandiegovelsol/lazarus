import React, { useState, useEffect } from "react";
import Flowers from "./Flowers";
import Controls from "./Controls";

const App = () => {
  const [flowers, setFlowers] = useState([
    { name: "Rose", sound: new Audio("piano_c.mp3"), image: "rose.svg" },
    { name: "Tulip", sound: new Audio("flute_c.mp3"), image: "tulip.svg" },
    { name: "Lily", sound: new Audio("violin_c.mp3"), image: "lily.svg" },
  ]);

  const [pianoVolume, setPianoVolume] = useState(1);
  const [fluteVolume, setFluteVolume] = useState(1);
  const [violinVolume, setViolinVolume] = useState(1);
  const [recordBtnText, setRecordBtnText] = useState("Start Recording");
  const [playRecording, setPlayRecording] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [audioCtx, setAudioCtx] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    flowers.forEach((flower) => {
      flower.sound.loop = false;
    });
  }, [flowers]);

  const playSound = (flower, setIsPlaying) => {
    const sound = flower.sound;
    sound.currentTime = 0;

    if (flower.name === "Rose") {
      sound.volume = pianoVolume;
    } else if (flower.name === "Tulip") {
      sound.volume = fluteVolume;
    } else if (flower.name === "Lily") {
      sound.volume = violinVolume;
    }

    sound.play();
    setIsPlaying(true);
  };

  const handleRecord = async () => {
    if (recordBtnText === "Start Recording") {
      try {
        const audioContext = new AudioContext();
        const dest = audioContext.createMediaStreamDestination();

        const stream = dest.stream;

        flowers.forEach((flower) => {
          const source = audioContext.createMediaElementSource(flower.sound);
          source.connect(dest);
          source.connect(audioContext.destination);
        });

        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) =>
          setChunks((prevChunks) => [...prevChunks, e.data]);
        recorder.onstop = (e) => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          setRecordedBlob(blob);
          const audioURL = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = audioURL;
          link.download = "recorded-melody.ogg";
          link.click();
          setPlayRecording(() => () => {
            const audio = new Audio(audioURL);
            audio.play();
          });
          setChunks([]);
        };
        recorder.start();
        setMediaRecorder(recorder);
        setRecordBtnText("Stop Recording");
        setAudioCtx(audioContext);
        setDestination(dest);
      } catch (err) {
        console.error("Error accessing audio stream:", err);
      }
    } else {
      mediaRecorder.stop();
      setRecordBtnText("Start Recording");
    }
  };

  return (
    <div className="app">
      <h1>Interactive Musical Garden</h1>
      <Flowers
        flowers={flowers}
        playSound={playSound}
        pianoVolume={pianoVolume}
        fluteVolume={fluteVolume}
        violinVolume={violinVolume}
      />
      <Controls
        pianoVolume={pianoVolume}
        setPianoVolume={setPianoVolume}
        fluteVolume={fluteVolume}
        setFluteVolume={setFluteVolume}
        violinVolume={violinVolume}
        setViolinVolume={setViolinVolume}
        recordBtnText={recordBtnText}
        handleRecord={handleRecord}
        playRecording={playRecording}
      />
    </div>
  );
};

export default App;
