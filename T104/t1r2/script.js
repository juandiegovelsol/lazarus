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
  const radius = 15.9;
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

    segment.setAttribute("cx", "18");
    segment.setAttribute("cy", "18");
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

// Initialize the currently hovered index to -1
let currentHoverIndex = -1;

function handleHover(index) {
  // Update the currently hovered index
  currentHoverIndex = index;

  const segments = document.querySelectorAll(".ring-segment");
  segments.forEach((segment, i) => {
    // Scale up the currently hovered segment and scale down the others
    segment.style.transform = i === index ? "scale(1.1)" : "scale(1)";
    // Ensure all segments are fully visible when the hover effect is active
    segment.style.zIndex = i === index ? 1 : 0;
  });
}

createRingChart(assets);
createAssetList(assets);

assetList.addEventListener("mouseover", (event) => {
  const index = event.target.dataset.index;
  if (index !== undefined) handleHover(Number(index));
});

// No need to handle mouseleave event to persist the hover effect
