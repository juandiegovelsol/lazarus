// Define the assets data
const assets = [
  { name: "Stocks", percentage: 50, color: "#4caf50" },
  { name: "Bonds", percentage: 30, color: "#2196f3" },
  { name: "Real Estate", percentage: 15, color: "#ff9800" },
  { name: "Cash", percentage: 5, color: "#f44336" },
];

// Get references to the ring chart and asset list elements
const ring = document.getElementById("ring");
const assetList = document.getElementById("asset-list");

function createRingChart(assets) {
  // The radius of the circles is reduced to ensure all the rings are fully visible
  const radius = 14;
  // Define the circumference and cumulative angle of the ring chart
  const circumference = 2 * Math.PI * radius;
  let cumulativeAngle = 0;

  // Iterate over the assets data
  assets.forEach((asset, index) => {
    // Create a new circle element for each asset
    const segment = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    // Calculate the stroke length and dash offset for each segment
    const strokeLength = (asset.percentage / 100) * circumference;
    const dashOffset = circumference * 0.25;
    // Calculate the offset to align the initial border of each segment with the final border of the previous segment
    const offset = dashOffset - (cumulativeAngle / 100) * circumference;

    segment.setAttribute("cx", "18.5");
    segment.setAttribute("cy", "17.5");
    segment.setAttribute("r", `${radius}`);
    segment.setAttribute("fill", "transparent");
    segment.setAttribute("stroke", asset.color);
    segment.setAttribute("stroke-width", "3");

    // Set the stroke dash array and offset to create the ring effect
    segment.setAttribute(
      "stroke-dasharray",
      `${strokeLength} ${circumference - strokeLength}`
    );
    // Set the stroke dash offset to align the initial border of each segment with the final border of the previous segment
    segment.setAttribute("stroke-dashoffset", offset);
    segment.setAttribute("class", "ring-segment");
    segment.setAttribute("data-index", index);

    // Update the cumulative angle for the next segment
    cumulativeAngle += asset.percentage;

    ring.appendChild(segment);
  });
}

function createAssetList(assets) {
  assets.forEach((asset, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${asset.name} - ${asset.percentage}%`;
    listItem.style.borderLeft = `4px solid ${asset.color}`;
    listItem.style.paddingLeft = "12px";
    listItem.dataset.index = index;
    assetList.appendChild(listItem);
  });
}

function handleHover(index) {
  // Reset the transform for all segments before applying the new hover effect
  const segments = document.querySelectorAll(".ring-segment");
  segments.forEach((segment) => {
    segment.style.transform = "scale(1)";
  });

  if (index !== -1) {
    // Apply the hover effect to the specified segment
    const hoveredSegment = document.querySelector(
      `.ring-segment[data-index="${index}"]`
    );
    hoveredSegment.style.transform = "scale(1.1)";
  }
}

createRingChart(assets);
createAssetList(assets);

assetList.addEventListener("mouseover", (event) => {
  const index = event.target.dataset.index;
  if (index !== undefined) handleHover(Number(index));
});

// Removed the mouseleave event listener to persist the hover effect
