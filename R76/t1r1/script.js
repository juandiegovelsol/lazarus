/**
 * Voice Controlled Lighting System
 *
 * This script controls a light and sound system using voice commands and clapping sounds.
 * It uses the Web Speech API to recognize voice commands and the Web Audio API to analyze clapping sounds.
 * The system supports four colors: white, yellow, red, and blue.
 *
 * To turn the light on and off, clap twice within a 2-second interval.
 * To change the color of the light, say the name of the color (e.g., "white", "yellow", etc.).
 */

let status = document.getElementById("status");
let pauseResumeBtn = document.getElementById("pause-resume-btn");

if (!window.webkitSpeechRecognition) {
  alert(
    "Your browser doesn't support the Web Speech API. Please use Google Chrome."
  );
} else {
  /**
   * Initialize the speech recognition engine.
   */
  let recognition = new webkitSpeechRecognition();

  // Set the recognition engine to continuous mode
  recognition.continuous = true;

  /**
   * Define a dictionary of colors and their corresponding voice commands.
   * @type {Object<string, string[]>}
   */
  let colors = {
    white: ["white", "turn on white light", "white light"],
    yellow: ["yellow", "turn on yellow light", "yellow light"],
    red: ["red", "turn on red light", "red light"],
    blue: ["blue", "turn on blue light", "blue light"],
  };

  /**
   * Store the current color of the light.
   * @type {string}
   */
  let currentColor = "white";

  /**
   * Store the current state of the light (on or off).
   * @type {boolean}
   */
  let isLightOn = false;

  // Update the status display with the initial state of the light
  status.textContent = `Light is OFF. Color: ${currentColor}`;

  /**
   * Handle speech recognition results.
   * @param {SpeechRecognitionEvent} event - The speech recognition event.
   */
  recognition.onresult = (event) => {
    // Get the transcript of the recognized speech
    let transcript = event.results[event.results.length - 1][0].transcript
      .trim()
      .toLowerCase();

    // Check if the transcript matches any of the color commands
    let colorFound = false;
    let colorIndex = 0;
    while (colorIndex < Object.keys(colors).length && !colorFound) {
      let color = Object.keys(colors)[colorIndex];
      if (colors[color].includes(transcript)) {
        // Update the current color and status display
        currentColor = color;
        colorFound = true;
        status.textContent = `Light is ${
          isLightOn ? "ON" : "OFF"
        }. Color: ${currentColor}`;
        // Play a sound effect corresponding to the new color
        let audio = new Audio(`https://example.com/${currentColor}.mp3`);
        audio.play();
      }
      colorIndex++;
    }
  };

  /**
   * Initialize variables for clap detection.
   */
  let clapCount = 0;
  let lastClapTime = 0;
  let clapTimeout;

  // Request access to the user's microphone
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // Create an audio context and analyser to process the microphone input
      let audioContext = new AudioContext();
      let source = audioContext.createMediaStreamSource(stream);
      let analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.fftSize = 256;
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);

      /**
       * Analyze the microphone input to detect clapping sounds.
       */
      function analyseAudio() {
        // Schedule the next frame of audio analysis
        requestAnimationFrame(analyseAudio);
        analyser.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += Math.abs(dataArray[i] - 128);
        }
        let average = sum / bufferLength;
        // Check if the average amplitude exceeds a threshold (30)
        if (average > 30) {
          // Get the current time in milliseconds
          let currentTime = new Date().getTime();
          // Check if the time since the last clap is less than 1 second
          if (currentTime - lastClapTime < 1000) {
            // Increment the clap count
            clapCount++;
          } else {
            // Reset the clap count
            clapCount = 1;
          }
          // Update the last clap time
          lastClapTime = currentTime;
          // Clear the clap timeout
          clearTimeout(clapTimeout);
          // Set a timeout to reset the clap count after 2 seconds
          clapTimeout = setTimeout(() => {
            clapCount = 0;
          }, 2000);
          // Check the clap count to toggle the light on or off
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
      // Start the audio analysis loop
      analyseAudio();
    })
    .catch((error) => {
      console.error("Error accessing microphone:", error);
    });

  /**
   * Initialize the pause/resume button.
   */
  let isPaused = false;
  pauseResumeBtn.addEventListener("click", () => {
    if (isPaused) {
      // Resume speech recognition
      recognition.start();
      isPaused = false;
      pauseResumeBtn.textContent = "Pause";
    } else {
      // Pause speech recognition
      recognition.stop();
      isPaused = true;
      pauseResumeBtn.textContent = "Resume";
    }
  });

  // Start speech recognition
  recognition.start();
}
