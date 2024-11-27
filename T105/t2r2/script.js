// Define the files data
const files = [
  { type: "Videos", percentage: 40, color: "#4caf50" },
  { type: "Music", percentage: 25, color: "#2196f3" },
  { type: "Photos", percentage: 20, color: "#ff9800" },
  { type: "Documents", percentage: 10, color: "#f44336" },
  { type: "Other", percentage: 5, color: "#9c27b0" },
];

// Get the ring and file list elements
const ring = document.getElementById("ring");
const fileList = document.getElementById("file-list");

// Function to create a ring section
function createRingSection(file, index, offset) {
  // Create a new circle element
  const segment = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  // Set the circle attributes
  const radius = 15.9;
  const circumference = 2 * Math.PI * radius;
  const strokeLength = (file.percentage / 100) * circumference;

  segment.setAttribute("cx", "18");
  segment.setAttribute("cy", "18");
  segment.setAttribute("r", `${radius}`);
  segment.setAttribute("fill", "transparent");
  segment.setAttribute("stroke", file.color);
  segment.setAttribute("stroke-width", "3");
  segment.setAttribute(
    "stroke-dasharray",
    `${strokeLength} ${circumference - strokeLength}`
  );
  segment.setAttribute("stroke-dashoffset", offset);
  segment.setAttribute("class", "ring-segment");
  segment.setAttribute("data-index", index);

  return segment;
}

// Function to create the ring chart
function createRingChart(files) {
  // Clear the ring chart
  ring.innerHTML = "";

  // Calculate the total percentage
  let totalPercentage = 0;

  // Create a ring section for each file type
  files.forEach((file, index) => {
    // Calculate the offset based on the previous segments
    const circumference = 2 * Math.PI * 15.9;
    const offset = circumference - (totalPercentage / 100) * circumference;

    // Create the ring section
    const segment = createRingSection(file, index, offset);

    // Add the ring section to the ring chart
    ring.appendChild(segment);

    // Update the total percentage
    totalPercentage += file.percentage;
  });

  // Ensure the total percentage is 100%
  if (totalPercentage < 100) {
    // Create a new circle element for the remaining percentage
    const remainingSegment = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    // Calculate the stroke length for each segment
    const radius = 15.9;
    const circumference = 2 * Math.PI * radius;
    const strokeLength = ((100 - totalPercentage) / 100) * circumference;
    // Calculate the offset based on the previous segments
    const offset = circumference - (totalPercentage / 100) * circumference;

    // Set the circle attributes
    remainingSegment.setAttribute("cx", "18");
    remainingSegment.setAttribute("cy", "18");
    remainingSegment.setAttribute("r", `${radius}`);
    remainingSegment.setAttribute("fill", "transparent");
    remainingSegment.setAttribute("stroke", "#ccc");
    remainingSegment.setAttribute("stroke-width", "3");
    // Set the stroke-dasharray to the remaining segment length and the circumference
    remainingSegment.setAttribute(
      "stroke-dasharray",
      `${strokeLength} ${circumference - strokeLength}`
    );
    // Set the stroke-dashoffset to the offset
    remainingSegment.setAttribute("stroke-dashoffset", offset);
    remainingSegment.setAttribute("class", "ring-segment");

    // Add the remaining segment to the ring
    ring.appendChild(remainingSegment);
  }

  //Displays an alert if the total percentage exceeds the 100%
  if (totalPercentage > 100) {
    alert("The storage capacity has exceeded the 100% percent");
  }
}

// Function to create the file list
function createFileList(files) {
  // Clear the file list
  fileList.innerHTML = "";

  // Create a list item for each file type
  files.forEach((file, index) => {
    // Create a new list item element
    const listItem = document.createElement("li");

    // Set the list item text content
    listItem.innerHTML = `${file.type} - <input type="number" value="${file.percentage}" data-index="${index}"> %`;
    listItem.dataset.index = index;

    // Add the list item to the file list
    fileList.appendChild(listItem);
  });
}

// Function to handle hover events
function handleHover(index) {
  // Get all the ring segments
  const segments = document.querySelectorAll(".ring-segment");

  // Scale the segment that matches the index
  segments.forEach((segment, i) => {
    segment.style.transform = i === index ? "scale(1.1)" : "scale(1)";
  });
}

// Function to update the ring chart and file list
function updateRingChartAndFileList(files) {
  createRingChart(files);
  createFileList(files);
}

// Create the chart and list
updateRingChartAndFileList(files);

// Add event listener to the file list to update the ring chart and file list on input change
fileList.addEventListener("input", (event) => {
  if (event.target.tagName === "INPUT") {
    // Get the index of the input field
    const index = parseInt(event.target.dataset.index);

    // Update the percentage of the corresponding file type
    files[index].percentage = parseInt(event.target.value);

    // Calculate the total percentage
    const totalPercentage = files.reduce(
      (acc, file) => acc + file.percentage,
      0
    );

    // Check if the total percentage exceeds 100%
    if (totalPercentage > 100) {
      alert("The total percentage cannot exceed 100%");
      // Reset the input field value to the previous value
      event.target.value = files[index].percentage;
    } else {
      // Update the ring chart and file list
      updateRingChartAndFileList(files);
    }
  }
});

// Add hover events
fileList.addEventListener("mouseover", (event) => {
  if (event.target.tagName === "LI") {
    const index = event.target.dataset.index;
    handleHover(parseInt(index));
  }
});

fileList.addEventListener("mouseleave", () => {
  handleHover(-1);
});
