let status = document.getElementById('status');
let pauseResumeBtn = document.getElementById('pause-resume-btn');
let slot = document.getElementById('slot');

if (!window.webkitSpeechRecognition) {
    alert("Your browser doesn't support the Web Speech API. Please use Google Chrome.");
} else {
    let recognition = new webkitSpeechRecognition();

    recognition.continuous = true;

    let colors = {
        'white': ['white', 'turn on white light', 'white light'],
        'yellow': ['yellow', 'turn on yellow light', 'yellow light'],
        'red': ['red', 'turn on red light', 'red light'],
        'blue': ['blue', 'turn on blue light', 'blue light'],
        'black': ['black', 'turn off light', 'off'],
    };

    let currentColor = 'white';

    let isLightOn = false;

    status.textContent = `Light is OFF. Color: ${currentColor}`;

    slot.style.backgroundColor = 'black';

    recognition.onresult = event => {
        let transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

        if (transcript === 'all colors') {
            if (isLightOn) {
                let colorIndex = 0;
                let colorInterval = setInterval(() => {
                    if (colorIndex >= Object.keys(colors).length - 1) {
                        clearInterval(colorInterval);
                    } else {
                        let color = Object.keys(colors)[colorIndex];
                        if (color !== 'black') {
                            slot.style.backgroundColor = color;
                            colorIndex++;
                        } else {
                            colorIndex++;
                        }
                    }
                }, 1000);
            }
        } else {
            let colorFound = false;
            let colorIndex = 0;
            while (colorIndex < Object.keys(colors).length && !colorFound) {
                let color = Object.keys(colors)[colorIndex];
                if (colors[color].includes(transcript)) {
                    colorFound = true;
                    if (color === 'black' || transcript === 'off') {
                        isLightOn = false;
                        slot.style.backgroundColor = 'black';
                        status.textContent = `Light is OFF. Color: black`;
                    } else if (isLightOn) {
                        slot.style.backgroundColor = color;
                        status.textContent = `Light is ON. Color: ${color}`;
                    } else if (transcript === 'on') {
                        isLightOn = true;
                        slot.style.backgroundColor = currentColor;
                        status.textContent = `Light is ON. Color: ${currentColor}`;
                    }
                }
                colorIndex++;
            }
            if (!colorFound && transcript !== 'on' && transcript !== 'off') {
                alert('This color is not defined on the system.');
            }
        }
    };

    let clapCount = 0;
    let lastClapTime = 0;
    let clapTimeout;

    let isPaused = false;
    pauseResumeBtn.addEventListener('click', () => {
        if (isPaused) {
            recognition.start();
            isPaused = false;
            pauseResumeBtn.textContent = 'Pause';
        } else {
            recognition.stop();
            isPaused = true;
            pauseResumeBtn.textContent = 'Resume';
        }
    });

    recognition.start();
}