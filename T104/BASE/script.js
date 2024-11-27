const assets = [
  { name: "Stocks", percentage: 50, color: "#4caf50" },
  { name: "Bonds", percentage: 30, color: "#2196f3" },
  { name: "Real Estate", percentage: 15, color: "#ff9800" },
  { name: "Cash", percentage: 5, color: "#f44336" },
];

const ring = document.getElementById("ring");
const assetList = document.getElementById("asset-list");

function createRingChart(assets) {
  const radius = 15.9;
  const circumference = 2 * Math.PI * radius;
  let cumulativeAngle = 0;

  assets.forEach((asset, index) => {
    const segment = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    const strokeLength = (asset.percentage / 100) * circumference;

    const dashOffset = circumference * 0.25;
    const offset = dashOffset - (cumulativeAngle / 100) * circumference;

    segment.setAttribute("cx", "18");
    segment.setAttribute("cy", "18");
    segment.setAttribute("r", `${radius}`);
    segment.setAttribute("fill", "transparent");
    segment.setAttribute("stroke", asset.color);
    segment.setAttribute("stroke-width", "3");

    segment.setAttribute(
      "stroke-dasharray",
      `${strokeLength} ${circumference - strokeLength}`
    );

    segment.setAttribute("stroke-dashoffset", offset);
    segment.setAttribute("class", "ring-segment");
    segment.setAttribute("data-index", index);

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
  const segments = document.querySelectorAll(".ring-segment");
  segments.forEach((segment, i) => {
    segment.style.transform = i === index ? "scale(1.1)" : "scale(1)";
  });
}

createRingChart(assets);
createAssetList(assets);

assetList.addEventListener("mouseover", (event) => {
  const index = event.target.dataset.index;
  if (index !== undefined) handleHover(Number(index));
});

assetList.addEventListener("mouseleave", () => {
  handleHover(-1);
});
