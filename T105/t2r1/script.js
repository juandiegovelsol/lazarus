// Define the files data
let files = [
  { type: "Videos", percentage: 40, color: "#4caf50" },
  { type: "Music", percentage: 25, color: "#2196f3" },
  { type: "Photos", percentage: 20, color: "#ff9800" },
  { type: "Documents", percentage: 10, color: "#f44336" },
  { type: "Other", percentage: 2, color: "#9c27b0" },
];

// Get the ring and file list elements
const ring = document.getElementById("ring");
const fileList = document.getElementById("file-list");

// Function to create a ring segment
function createRingSegment(file, index, offset) {
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
  segment.setAttribute("stroke-dashoffset", circumference - offset);
  segment.setAttribute("class", "ring-segment");
  segment.setAttribute("data-index", index);

  return segment;
}

// Function to create the ring chart
function createRingChart(files) {
  // Clear the existing ring chart
  ring.innerHTML = "";

  // Calculate the total percentage
  let totalPercentage = 0;
  let offset = 0;

  // Create a circle for each file type
  files.forEach((file, index) => {
    // Create a new ring segment
    const segment = createRingSegment(file, index, offset);

    // Add the segment to the ring
    ring.appendChild(segment);

    // Update the total percentage and offset
    offset += (file.percentage / 100) * (2 * Math.PI * 15.9);
    totalPercentage += file.percentage;
  });

  // Ensure the total percentage is 100%
  if (totalPercentage < 100) {
    // Create a new ring segment for the remaining percentage
    const remainingFile = {
      type: "Remaining",
      percentage: 100 - totalPercentage,
      color: "#ccc",
    };
    const remainingSegment = createRingSegment(remainingFile, -1, offset);

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
  // Clear the existing file list
  fileList.innerHTML = "";

  // Create a list item for each file type
  files.forEach((file, index) => {
    // Create a new list item element
    const listItem = document.createElement("li");

    // Create an input field for the percentage
    const inputField = document.createElement("input");
    inputField.type = "number";
    inputField.min = 0;
    inputField.max = 100;
    inputField.value = file.percentage;
    inputField.dataset.index = index;
    inputField.style.width = "30px";

    // Create a text nodes for the file type
    const textNodeFileType = document.createTextNode(`${file.type} - `);
    const textNodePercentage = document.createTextNode("%");

    // Add the text nodes and input field to the list item
    listItem.appendChild(textNodeFileType);
    listItem.appendChild(inputField);
    listItem.appendChild(textNodePercentage);

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

// Function to update the file percentage
function updateFilePercentage(event) {
  // Get the index and new percentage
  const index = event.target.dataset.index;
  const newPercentage = parseInt(event.target.value);

  // Check if the total percentage exceeds 100%
  let totalPercentage = 0;
  files.forEach((file, i) => {
    if (i === parseInt(index)) {
      totalPercentage += newPercentage;
    } else {
      totalPercentage += file.percentage;
    }
  });

  if (totalPercentage <= 100) {
    // Update the file percentage
    files[index].percentage = newPercentage;

    // Update the ring chart and file list
    createRingChart(files);
    createFileList(files);
  } else {
    // Reset the input field value
    event.target.value = files[index].percentage;
    alert("The total percentage cannot exceed 100%");
  }
}

// Create the chart and list
createRingChart(files);
createFileList(files);

// Add hover events
fileList.addEventListener("mouseover", (event) => {
  if (event.target.tagName === "LI") {
    const index = event.target.children[0].dataset.index;
    handleHover(Number(index));
  }
});

fileList.addEventListener("mouseleave", () => {
  handleHover(-1);
});

// Add input events
fileList.addEventListener("input", (event) => {
  if (event.target.tagName === "INPUT") {
    updateFilePercentage(event);
  }
});
