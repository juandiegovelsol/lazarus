const files = [
  { type: "Videos", percentage: 40, color: "#4caf50" },
  { type: "Music", percentage: 25, color: "#2196f3" },
  { type: "Photos", percentage: 20, color: "#ff9800" },
  { type: "Documents", percentage: 10, color: "#f44336" },
  { type: "Other", percentage: 5, color: "#9c27b0" },
];

const ring = document.getElementById("ring");
const fileList = document.getElementById("file-list");

function createRingChart(files) {
  let totalPercentage = 0;

  files.forEach((file, index) => {
    const segment = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    const radius = 15.9;
    const circumference = 2 * Math.PI * radius;
    const offset = (totalPercentage / 100) * circumference;

    segment.setAttribute("cx", "18");
    segment.setAttribute("cy", "18");
    segment.setAttribute("r", `${radius}`);
    segment.setAttribute("fill", "transparent");
    segment.setAttribute("stroke", file.color);
    segment.setAttribute("stroke-width", "3");
    segment.setAttribute(
      "stroke-dasharray",
      `${(file.percentage / 100) * circumference} ${circumference}`
    );
    segment.setAttribute("stroke-dashoffset", offset);
    segment.setAttribute("class", "ring-segment");
    segment.setAttribute("data-index", index);

    totalPercentage += file.percentage;
    ring.appendChild(segment);
  });
}

function createFileList(files) {
  files.forEach((file, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${file.type} - ${file.percentage}%`;
    listItem.dataset.index = index;
    fileList.appendChild(listItem);
  });
}

function handleHover(index) {
  const segments = document.querySelectorAll(".ring-segment");
  segments.forEach((segment, i) => {
    segment.style.transform = i === index ? "scale(1.1)" : "scale(1)";
  });
}

// Create the chart and list
createRingChart(files);
createFileList(files);

// Add hover events
fileList.addEventListener("mouseover", (event) => {
  const index = event.target.dataset.index;
  if (index !== undefined) handleHover(Number(index));
});

fileList.addEventListener("mouseleave", () => {
  handleHover(-1);
});
