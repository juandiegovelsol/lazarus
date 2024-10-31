// Get HTML elements
let status = document.getElementById("status");
let pauseResumeBtn = document.getElementById("pause-resume-btn");

/**
 * Check if the browser supports the Web Speech API.
 */
if (!window.webkitSpeechRecognition) {
  alert(
    "Your browser doesn't support the Web Speech API. Please use Google Chrome."
  );
} else {
  // Initialize speech recognition
  let recognition = new webkitSpeechRecognition();

  // Set recognition to continuous
  recognition.continuous = true;

  /**
   * Define color mappings for voice commands.
   * @type {Object}
   */
  let colors = {
    white: ["white", "turn on white light", "white light"],
    yellow: ["yellow", "turn on yellow light", "yellow light"],
    red: ["red", "turn on red light", "red light"],
    blue: ["blue", "turn on blue light", "blue light"],
  };

  // Initialize current color and light status
  let currentColor = "white";
  let isLightOn = false;

  // Update status text
  status.textContent = `Light is OFF. Color: ${currentColor}`;

  /**
   * Handle speech recognition results.
   * @param {SpeechRecognitionEvent} event
   */
  recognition.onresult = (event) => {
    // Get the transcript of the recognized speech
    let transcript = event.results[event.results.length - 1][0].transcript
      .trim()
      .toLowerCase();

    // Check if the transcript matches a color command
    let colorFound = false;
    let colorIndex = 0;
    while (colorIndex < Object.keys(colors).length && !colorFound) {
      let color = Object.keys(colors)[colorIndex];
      if (colors[color].includes(transcript)) {
        // Update current color and status text
        currentColor = color;
        colorFound = true;
        status.textContent = `Light is ${
          isLightOn ? "ON" : "OFF"
        }. Color: ${currentColor}`;

        // Play audio for the selected color
        let audio = new Audio(`https://example.com/${currentColor}.mp3`);
        audio.play();
      }
      colorIndex++;
    }
  };

  // Initialize clap detection variables
  let clapCount = 0;
  let lastClapTime = 0;
  let clapTimeout;

  /**
   * Request access to the user's microphone.
   */
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // Create an AudioContext and MediaStreamSource
      let audioContext = new AudioContext();
      let source = audioContext.createMediaStreamSource(stream);
      let analyser = audioContext.createAnalyser();
      source.connect(analyser);
      analyser.fftSize = 256;
      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);

      /**
       * Analyze audio data for clapping sounds.
       */
      function analyseAudio() {
        // Request the next frame of audio data
        requestAnimationFrame(analyseAudio);
        analyser.getByteTimeDomainData(dataArray);

        // Calculate the average volume of the audio data
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += Math.abs(dataArray[i] - 128);
        }
        let average = sum / bufferLength;

        // Check if the average volume exceeds the threshold (30)
        if (average > 30) {
          // Get the current time
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

          // Check the clap count and update the light status
          if (clapCount == 1) {
            // Turn the light off
            isLightOn = false;
            status.textContent = `Light is OFF. Color: ${currentColor}`;
          } else if (clapCount == 2) {
            // Turn the light on
            isLightOn = true;
            status.textContent = `Light is ON. Color: ${currentColor}`;
            // Reset the clap count
            clapCount = 0;
          }
        }
      }

      // Start analyzing audio data
      analyseAudio();
    })
    .catch((error) => {
      console.error("Error accessing microphone:", error);
    });

  // Initialize pause/resume button
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

/**
 * To turn the light on and off, you can use the following voice commands:
 *  - "Turn on [color] light"
 *  - "Turn off [color] light"
 *
 * You can also use clapping sounds to control the light:
 *  - One clap turns the light off
 *  - Two claps turn the light on
 *
 * To change the color of the light, use the following voice commands:
 *  - "[Color]"
 *  - "Turn on [color] light"
 *
 * Replace [color] with one of the supported colors: white, yellow, red, blue.
 */
