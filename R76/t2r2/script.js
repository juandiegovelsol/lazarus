/**
 * Voice Controlled Lighting System
 *
 * This script controls a light and sound system using voice commands.
 * It uses the Web Speech API to recognize voice commands.
 * The system supports four colors: white, yellow, red, and blue.
 *
 * To turn the light on and off, say "ON" or "OFF".
 * To change the color of the light, say the name of the color (e.g., "white", "yellow", etc.).
 */

let status = document.getElementById("status");
let slot = document.getElementById("slot");
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
    black: ["black", "turn off light", "off"],
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

  // Update the slot color with the initial color
  slot.style.backgroundColor = currentColor;

  /**
   * Handle speech recognition results.
   * @param {SpeechRecognitionEvent} event - The speech recognition event.
   */
  recognition.onresult = (event) => {
    // Get the transcript of the recognized speech
    let transcript = event.results[event.results.length - 1][0].transcript
      .trim()
      .toLowerCase();

    console.log(transcript);
    // Check if the transcript matches any of the color commands
    let colorFound = false;
    let colorIndex = 0;
    while (colorIndex < Object.keys(colors).length && !colorFound) {
      let color = Object.keys(colors)[colorIndex];
      if (colors[color].includes(transcript)) {
        colorFound = true;
        if (color === "black" || transcript === "off") {
          isLightOn = false;
          currentColor = "black";
          slot.style.backgroundColor = currentColor;
          status.textContent = `Light is OFF. Color: ${currentColor}`;
        } else if (isLightOn) {
          currentColor = color;
          slot.style.backgroundColor = currentColor;
          status.textContent = `Light is ON. Color: ${currentColor}`;
        }
      }
      colorIndex++;
    }

    // Check if the transcript matches the 'all colors' command
    if (transcript === "all colors") {
      let colorCycleIndex = 0;
      let colorCycleInterval = setInterval(() => {
        let color = Object.keys(colors)[colorCycleIndex];
        if (color !== "black") {
          slot.style.backgroundColor = color;
          status.textContent = `Light is ON. Color: ${color}`;
        }
        colorCycleIndex = (colorCycleIndex + 1) % Object.keys(colors).length;
      }, 1000);
      // Stop the color cycling when a specific color command is recognized
      recognition.onresult = (event) => {
        clearInterval(colorCycleInterval);
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
              colorFound = true;
              if (color === "black" || transcript === "off") {
                isLightOn = false;
                currentColor = "black";
                slot.style.backgroundColor = currentColor;
                status.textContent = `Light is OFF. Color: ${currentColor}`;
              } else if (isLightOn) {
                currentColor = color;
                slot.style.backgroundColor = currentColor;
                status.textContent = `Light is ON. Color: ${currentColor}`;
              }
            }
            colorIndex++;
          }
        };
      };
    }

    // Check if the transcript matches the 'on' command
    if (transcript === "on") {
      isLightOn = true;
      slot.style.backgroundColor = currentColor;
      status.textContent = `Light is ON. Color: ${currentColor}`;
    }

    // Check if the transcript is not a defined color
    if (
      !colorFound &&
      transcript !== "all colors" &&
      transcript !== "on" &&
      transcript !== "off"
    ) {
      alert("This color is not defined on the system.");
    }
  };

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
