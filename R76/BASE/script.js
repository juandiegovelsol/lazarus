let status = document.getElementById("status");
let pauseResumeBtn = document.getElementById("pause-resume-btn");

if (!window.webkitSpeechRecognition) {
  alert(
    "Your browser doesn't support the Web Speech API. Please use Google Chrome."
  );
} else {
  let recognition = new webkitSpeechRecognition();

  recognition.continuous = true;

  let colors = {
    white: ["white", "turn on white light", "white light"],
    yellow: ["yellow", "turn on yellow light", "yellow light"],
    red: ["red", "turn on red light", "red light"],
    blue: ["blue", "turn on blue light", "blue light"],
  };

  let currentColor = "white";

  let isLightOn = false;

  status.textContent = `Light is OFF. Color: ${currentColor}`;

  recognition.onresult = (event) => {
    let transcript = event.results[event.results.length - 1][0].transcript
      .trim()
      .toLowerCase();

    let colorFound = false;
    let colorIndex = 0;
    while (colorIndex < Object.keys(colors).length && !colorFound) {
      let color = Object.keys(colors)[colorIndex];
      if (colors[color].includes(transcript)) {
        currentColor = color;
        colorFound = true;
        status.textContent = `Light is ${
          isLightOn ? "ON" : "OFF"
        }. Color: ${currentColor}`;
        let audio = new Audio(`https://example.com/${currentColor}.mp3`);
        audio.play();
      }
      colorIndex++;
    }
  };

  let clapCount = 0;
  let lastClapTime = 0;
  let clapTimeout;
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      let audioContext = new AudioContext();
      let source = audioContext.createMediaStreamSource(stream);
      let analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.fftSize = 256;
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);

      function analyseAudio() {
        requestAnimationFrame(analyseAudio);
        analyser.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += Math.abs(dataArray[i] - 128);
        }
        let average = sum / bufferLength;
        if (average > 30) {
          let currentTime = new Date().getTime();
          if (currentTime - lastClapTime < 1000) {
            clapCount++;
          } else {
            clapCount = 1;
          }
          lastClapTime = currentTime;
          clearTimeout(clapTimeout);
          clapTimeout = setTimeout(() => {
            clapCount = 0;
          }, 2000);
          if (clapCount == 1) {
            isLightOn = false;
            status.textContent = `Light is OFF. Color: ${currentColor}`;
          } else if (clapCount == 2) {
            isLightOn = true;
            status.textContent = `Light is ON. Color: ${currentColor}`;
            clapCount = 0;
          }
        }
      }
      analyseAudio();
    })
    .catch((error) => {
      console.error("Error accessing microphone:", error);
    });

  let isPaused = false;
  pauseResumeBtn.addEventListener("click", () => {
    if (isPaused) {
      recognition.start();
      isPaused = false;
      pauseResumeBtn.textContent = "Pause";
    } else {
      recognition.stop();
      isPaused = true;
      pauseResumeBtn.textContent = "Resume";
    }
  });

  recognition.start();
}
