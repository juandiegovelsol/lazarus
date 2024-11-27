// Get the table body element where rows will be added
const tableBody = document.querySelector("#investment-table tbody");

// Get the button element that triggers the addition of new rows
const addRowBtn = document.getElementById("add-row-btn");

/**
 * Creates a new table row with input fields for investment data.
 */
function createRow() {
  // Create a new table row element
  const row = document.createElement("tr");

  // Define the types of input fields for each column
  const columns = [
    "text",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "calculated",
    "calculated",
  ];

  columns.forEach((type, index) => {
    // Create a new table cell element
    const cell = document.createElement("td");

    if (type === "text" || type === "number") {
      // Create a new input field element
      const input = document.createElement("input");
      input.type = type;

      input.addEventListener("input", () => {
        if (type === "number" && input.value <= 0) {
          alert("Please enter a positive number.");
          input.value = "";
        } else {
          calculateRow(row);
        }
      });

      cell.appendChild(input);
    } else {
      cell.textContent = index === 11 ? "0%" : "$0.00";
    }

    row.appendChild(cell);
  });

  tableBody.appendChild(row);
}

/**
 * Calculates the signal progress and profit/loss for a given table row.
 * @param {HTMLElement} row The table row element to calculate data for.
 */
function calculateRow(row) {
  const cells = row.querySelectorAll("td"); // Get all table cells in the row
  const entryPrice = parseFloat(cells[1].querySelector("input").value) || 0; // Get the input field value for entry price
  const purchasePrice = parseFloat(cells[8].querySelector("input").value) || 0; // Get the input field value for purchase price
  const currentPrice = parseFloat(cells[10].querySelector("input").value) || 0; // Get the input field value for current price
  const investmentAmount =
    parseFloat(cells[9].querySelector("input").value) || 0; // Get the input field value for investment amount

  if (purchasePrice > 0) {
    // Calculates the progress percentage
    const progress = (currentPrice / entryPrice) * 100 - 100;
    cells[11].textContent = `${progress.toFixed(2)}%`;
  }

  if (investmentAmount > 0) {
    // Calculate the profit/loss if the investment amount is greater than 0
    const profitLoss =
      (currentPrice - purchasePrice) * (investmentAmount / purchasePrice);
    cells[12].textContent = `$${profitLoss.toFixed(2)}`;
  }
}

// Add an event listener to the 'Add Row' button to create a new table row
addRowBtn.addEventListener("click", createRow);

// Create an initial table row
createRow();
