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
    // Create list item element
    const listItem = document.createElement("li");

    // Create checkbox input element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("check-item");

    // Create text node for item label
    const textNode = document.createTextNode(item);

    // Append checkbox and text node to list item
    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(" ")); // Add space between checkbox and text
    listItem.appendChild(textNode);

    // Append list item to checklist container
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
