const totalSections = 10;
const sectionWidth = 10;
const animationDuration = 100;
const loadingBar = document.getElementById("loadingBar");

let progress = 0;
let currentIndex = 0;
let sections = [];

// Create sections
for (let i = 0; i < totalSections; i++) {
  const section = document.createElement("div");
  section.className = "section";
  section.style.left = `${i * sectionWidth}%`;
  loadingBar.appendChild(section);
  sections.push(section);
}

function animateLoading() {
  const visibleSections = Math.ceil(progress / sectionWidth);

  // Reset all sections after the current index to transparent
  sections.forEach((section, index) => {
    if (index > currentIndex) {
      section.style.backgroundColor = "transparent";
    }
  });

  // Highlight the current section
  if (currentIndex < visibleSections) {
    sections[currentIndex].style.backgroundColor = "#2e7d32";
    currentIndex++;
  }

  // Keep all sections before the current index highlighted
  for (let i = 0; i < currentIndex; i++) {
    sections[i].style.backgroundColor = "#4caf50";
  }
}

function updateProgress() {
  if (progress < 100) {
    progress += 5;
  } else {
    progress = 0;
    currentIndex = 0;
  }
}

// Start animations
setInterval(animateLoading, animationDuration);
setInterval(updateProgress, 1000);
