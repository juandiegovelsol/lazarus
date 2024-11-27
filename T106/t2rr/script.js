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

  // Reset all sections to base color or transparent
  sections.forEach((section, index) => {
    if (index < visibleSections) {
      if (index <= currentIndex) {
        section.style.backgroundColor = "#2e7d32"; // Green for completed sections
      } else {
        section.style.backgroundColor = "transparent"; // Transparent for sections not yet highlighted
      }
    } else {
      section.style.backgroundColor = "transparent"; // Transparent for sections beyond progress
    }
  });

  // Highlight current section if there are visible sections
  if (visibleSections > 0) {
    if (currentIndex < visibleSections) {
      sections[currentIndex].style.backgroundColor = "#2e7d32"; // Green for highlighted section
    }
    currentIndex = (currentIndex + 1) % visibleSections;
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
