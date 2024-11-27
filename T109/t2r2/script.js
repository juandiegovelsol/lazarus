const data = Array.from({ length: 120 }, () =>
  Math.floor(Math.random() * 200 - 100)
);

// Max number of bars allowed
const MAX_BARS = 100;
// Max height of the chart container
const MAX_HEIGHT =
  document.getElementsByClassName("chart-container")[0].offsetHeight - 40;

const chart = document.getElementById("chart");

function createChart(data) {
  // Limit the data to MAX_BARS to prevent chart overload
  if (data.length > MAX_BARS) {
    // Alerts the user that the array will be split
    alert(`Only the first ${MAX_BARS} data points will be displayed.`);
    // Splits the array according to the maximum bars number
    data = data.slice(0, MAX_BARS);
  }

  const maxValue = Math.max(...data.map(Math.abs));
  const centerLine = document.createElement("div");
  centerLine.classList.add("center-line");
  chart.appendChild(centerLine);

  data.forEach((value) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    if (value < 0) {
      bar.classList.add("negative");
    }

    // Scale the height of the bar using MAX_HEIGHT for reference
    const height = (Math.abs(value / maxValue) * MAX_HEIGHT) / 2;
    bar.style.height = `${height}px`;

    if (value < 0) {
      bar.style.top = `${height / 2}px`;
    } else {
      bar.style.bottom = `${height / 2}px`;
    }
    chart.appendChild(bar);
  });
}

createChart(data);
