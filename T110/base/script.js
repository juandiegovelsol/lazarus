// Checklist data array
const checklistData = [
  "Add Profile Picture",
  "Fill in Bio",
  "Add Social Links",
  "Choose Username",
  "Verify Email",
  "Other",
];

// Select the checklist container and progress elements
const checklistContainer = document.getElementById("checklist");
const circle = document.querySelector(".circle");
const percentageText = document.querySelector(".percentage");

// Function to create the checklist dynamically
function createChecklist(data) {
  data.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <input type="checkbox" class="check-item"> ${item}
    `;
    checklistContainer.appendChild(listItem);
  });
}

// Function to update progress
function updateProgress() {
  const checklistItems = document.querySelectorAll(".check-item");
  const totalItems = checklistItems.length;
  const checkedItems = Array.from(checklistItems).filter(
    (item) => item.checked
  ).length;

  const percentage = Math.round((checkedItems / totalItems) * 100);
  const dashOffset = 100 - percentage;

  // Update circular progress and text
  circle.style.strokeDashoffset = dashOffset;
  percentageText.textContent = `${percentage}%`;
}

// Initialize checklist
createChecklist(checklistData);

// Add event listeners to update progress
document.addEventListener("change", (event) => {
  if (event.target.classList.contains("check-item")) {
    updateProgress();
  }
});
