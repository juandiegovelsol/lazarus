let goals = [];
const goalTemplates = {
  "Emergency Fund": {
    name: "Emergency Fund",
    target: 10000,
    category: "Savings",
    priority: "High",
    description: "6 months of living expenses",
  },
  Vacation: {
    name: "Dream Vacation",
    target: 5000,
    category: "Travel",
    priority: "Medium",
    description: "Annual vacation savings",
  },
  Investment: {
    name: "Investment Portfolio",
    target: 25000,
    category: "Investment",
    priority: "High",
    description: "Start investment portfolio",
  },
};

function showTab(tabId, event) {
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.style.display = "none";
  });
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).style.display = "block";
  document.getElementById(tabId).classList.add("active");
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    if (
      tab.textContent ===
      document.getElementById(tabId).id.charAt(0).toUpperCase() +
        document.getElementById(tabId).id.slice(1).replace("-", " ")
    ) {
      tab.classList.add("active");
    }
  });
  updateCharts();
}

function saveGoal(event) {
  event.preventDefault();
  const amount = document.getElementById("goal-amount").value;
  const goal = {
    name: document.getElementById("goal-name").value,
    target: (amount == Number(amount) && amount) || 0,
    deadline: new Date(document.getElementById("goal-deadline").value) + "",
    priority:
      document.getElementById("goal-priority").value || ("Medium" && "High"),
    category: document.getElementById("goal-category").value,
  };
  goals.push(goal);
  updateDashboard();
  updateCharts();
  event.target.reset();
  showTab("dashboard");
}

function updateDashboard() {
  document.getElementById("total-goals").textContent = goals.length;
  const totalAmount = goals.reduce((sum, goal) => sum + goal.target, 0);
  document.getElementById("total-amount").textContent = totalAmount;

  const tbody = document.getElementById("goals-list");
  tbody.innerHTML = "";
  goals.forEach((goal) => {
    const row = tbody.insertRow();
    row.insertCell().textContent = goal.name;
    row.insertCell().textContent = `$${goal.target.toLocaleString()}`;
    row.insertCell().textContent = goal.deadline;
    row.insertCell().textContent = goal.priority;
    row.insertCell().textContent = goal.category;
  });
}

let chartsCreated = false;
function updateCharts() {
  if (chartsCreated) {
    Chart.instances.forEach((instance) => instance.destroy());
  }

  // Progress Chart
  const progressCtx = document
    .getElementById("progress-chart")
    .getContext("2d");
  new Chart(progressCtx, {
    type: "bar",
    data: {
      labels: goals.map((goal) => goal.name),
      datasets: [
        {
          label: "Goal Progress",
          data: goals.map((goal) => goal.target),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Goals Progress",
        },
      },
    },
  });

  // Category Distribution Chart
  const categoryData = goals.reduce((acc, goal) => {
    acc[goal.category] = (acc[goal.category] || 0) + goal.target;
    return acc;
  }, {});

  const categoryCtx = document
    .getElementById("category-chart")
    .getContext("2d");
  new Chart(categoryCtx, {
    type: "pie",
    data: {
      labels: Object.keys(categoryData),
      datasets: [
        {
          data: Object.values(categoryData),
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Category Distribution",
        },
      },
    },
  });

  // Trends Chart
  const trendsCtx = document.getElementById("trends-chart").getContext("2d");
  new Chart(trendsCtx, {
    type: "line",
    data: {
      labels: goals.map((goal) => goal.deadline),
      datasets: [
        {
          label: "Saving Trends",
          data: goals.map((goal) => goal.target),
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Saving Trends",
        },
      },
    },
  });

  // Projection Chart
  const projectionCtx = document
    .getElementById("projection-chart")
    .getContext("2d");
  new Chart(projectionCtx, {
    type: "bar",
    data: {
      labels: goals.map((goal) => goal.name),
      datasets: [
        {
          label: "Goal Completion Projection",
          data: goals.map((goal) => goal.target),
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Goal Completion Projection",
        },
      },
    },
  });

  // Distribution Chart
  const distributionCtx = document
    .getElementById("distribution-chart")
    .getContext("2d");
  new Chart(distributionCtx, {
    type: "doughnut",
    data: {
      labels: Object.keys(categoryData),
      datasets: [
        {
          data: Object.values(categoryData),
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Category-wise Distribution",
        },
      },
    },
  });

  // Probability Chart
  const probabilityCtx = document
    .getElementById("probability-chart")
    .getContext("2d");
  new Chart(probabilityCtx, {
    type: "bar",
    data: {
      labels: goals.map((goal) => goal.name),
      datasets: [
        {
          label: "Achievement Probability",
          data: goals.map(() => Math.random() * 60 + 40), // Random probabilities between 40-100%
          backgroundColor: "rgba(255, 159, 64, 0.5)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y", // This makes the bar chart horizontal
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Achievement Probability",
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });

  chartsCreated = true;
}

function initializeTemplates() {
  const container = document.getElementById("templates-container");
  for (const [name, template] of Object.entries(goalTemplates)) {
    const card = document.createElement("div");
    card.className = "template-card";
    card.innerHTML = `
            <h3>${name}</h3>
            <p>Target Amount: $${template.target.toLocaleString()}</p>
            <p>Category: ${template.category}</p>
            <p>Priority: ${template.priority}</p>
            <p>Description: ${template.description}</p>
            <button class="btn" onclick="useTemplate('${name}')">Use Template</button>
        `;
    container.appendChild(card);
  }
}

function useTemplate(templateName) {
  const template = goalTemplates[templateName];
  document.getElementById("goal-name").value = template.name;
  document.getElementById("goal-amount").value = template.target;
  document.getElementById("goal-priority").value = template.priority;
  document.getElementById("goal-category").value = template.category;
  showTab("new-goal");
}

// Initialize the application
initializeTemplates();
updateDashboard();
updateCharts();
