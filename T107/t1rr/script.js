const totalSections = 20; // Total sections in the ring
const sectionPercentage = 100 / totalSections; // Percentage per section
const colors = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0"]; // Segment colors
const ring = document.getElementById("ring");

// Create the ring chart with sections
function createRingChart() {
  const radius = 15.9; // Radius of the ring
  const circumference = 2 * Math.PI * radius; // Total circumference
  let cumulativeAngle = 0;

  for (let i = 0; i < totalSections; i++) {
    const segment = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    const strokeLength = (sectionPercentage / 100) * circumference; // Calculate segment size
    // Rotate the ring to align the first section at 12 o'clock by removing the dashOffset variable
    const offset = circumference - (cumulativeAngle / 100) * circumference;

    segment.setAttribute("cx", "18");
    segment.setAttribute("cy", "18");
    segment.setAttribute("r", `${radius}`);
    segment.setAttribute("fill", "transparent");
    segment.setAttribute("stroke", colors[i % colors.length]); // Cycle through colors
    segment.setAttribute("stroke-width", "3");

    segment.setAttribute(
      "stroke-dasharray",
      `${strokeLength} ${circumference - strokeLength}`
    );

    segment.setAttribute("stroke-dashoffset", offset);
    segment.setAttribute("class", "ring-segment");
    ring.appendChild(segment);

    cumulativeAngle += sectionPercentage; // Increment angle
  }
}

// Simulate progress by showing each section one by one
function simulateProgress() {
  const segments = document.querySelectorAll(".ring-segment");
  let currentIndex = 0;

  // Hide all segments initially
  segments.forEach((segment) => {
    segment.style.opacity = 0;
  });

  setInterval(() => {
    // Show the current segment and hide the rest
    segments.forEach((segment, index) => {
      segment.style.opacity = index <= currentIndex ? 1 : 0;
    });

    currentIndex = (currentIndex + 1) % totalSections; // Loop through segments
  }, 1000); // 1 second per step
}

createRingChart();
simulateProgress();
