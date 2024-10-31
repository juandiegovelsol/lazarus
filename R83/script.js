// script.js

// Get the incident chart canvas
const incidentChartCanvas = document.getElementById("incident-chart");

// Create a new chart
const incidentChart = new Chart(incidentChartCanvas, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Incidents",
        data: [10, 15, 7, 12, 20],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Toggle sections
const sections = document.querySelectorAll("section");

sections.forEach((section) => {
  section.addEventListener("click", () => {
    section.classList.toggle("expanded");
  });
});
