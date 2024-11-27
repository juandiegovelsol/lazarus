// Configuration
const totalSections = 10; // Total number of sections
const sectionWidth = 10; // Width in percentage for each section
const animationDuration = 100; // Blinking duration in ms

// Containers
const loadingSectionContainer = document.querySelector(
  ".loading-section-container"
);
const backgroundSectionContainer = document.querySelector(
  ".background-section-container"
);

let progress = 0; // Progress in percentage

// Initialize bar with sections
for (let i = 0; i < totalSections; i++) {
  const backgroundSection = document.createElement("div");
  backgroundSection.className = "section";
  backgroundSectionContainer.appendChild(backgroundSection);

  const loadingSection = document.createElement("div");
  loadingSection.className = "section";
  loadingSectionContainer.appendChild(loadingSection);
}

// Animate loading bar
let currentIndex = 0;

function animateLoading() {
  const sections = loadingSectionContainer.querySelectorAll(".section");

  // Reset all sections to transparent
  sections.forEach((section, index) => {
    if (index < Math.ceil(progress / sectionWidth)) {
      section.style.backgroundColor = "transparent";
    }
  });

  // Blink the current section
  const maxLoadingIndex = Math.ceil(progress / sectionWidth) - 1;
  if (maxLoadingIndex >= 0) {
    sections[currentIndex].style.backgroundColor = "#4caf50"; // Green
    currentIndex = currentIndex + 1 > maxLoadingIndex ? 0 : currentIndex + 1;
  }
}

// Simulate progress
function simulateProgress() {
  if (progress < 100) {
    progress += 5; // Increment progress
    const sections = loadingSectionContainer.querySelectorAll(".section");

    // Set completed sections to green
    for (let i = 0; i < Math.ceil(progress / sectionWidth); i++) {
      sections[i].style.backgroundColor = "#4caf50";
    }
  } else {
    progress = 0; // Reset progress when 100% is reached
    currentIndex = 0;
  }
}

// Start the animation
setInterval(animateLoading, animationDuration);
setInterval(simulateProgress, 1000);
