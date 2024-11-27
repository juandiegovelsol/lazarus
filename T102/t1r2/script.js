// Get the table body and add row button elements
const tableBody = document.querySelector("#investment-table tbody");
const addRowBtn = document.getElementById("add-row-btn");

/**
 * Creates a new table row with input fields and calculated columns.
 */
function createRow() {
  const row = document.createElement("tr");
  // Define the column types for the row
  const columns = [
    "text", // Symbol
    "number", // Entry Price
    "number", // Stop Loss
    "number", // Take Profit 1
    "number", // Take Profit 2
    "number", // Take Profit 3
    "number", // Take Profit 4
    "number", // Take Profit 5
    "number", // Purchase Price
    "number", // Investment Amount
    "number", // Current Price
    "calculated", // Signal Progress (%)
    "calculated", // Profit/Loss
  ];

  columns.forEach((type, index) => {
    const cell = document.createElement("td");

    if (type === "text" || type === "number") {
      const input = document.createElement("input");
      input.type = type;
      // Add event listener to input field to recalculate row on input
      input.addEventListener("input", () => calculateRow(row));
      cell.appendChild(input);
    } else {
      // Set default text for calculated columns
      cell.textContent = index === 11 ? "0%" : "$0.00";
    }

    row.appendChild(cell);
  });

  // Add the new row to the table body
  tableBody.appendChild(row);
}

/**
 * Calculates the signal progress and profit/loss for a given table row.
 * @param {HTMLElement} row The table row to calculate.
 */
function calculateRow(row) {
  const cells = row.querySelectorAll("td");
  // Get the input values for the row
  const entryPrice = parseFloat(cells[1].querySelector("input").value) || 0;
  const purchasePrice = parseFloat(cells[8].querySelector("input").value) || 0;
  const currentPrice = parseFloat(cells[10].querySelector("input").value) || 0;
  const investmentAmount =
    parseFloat(cells[9].querySelector("input").value) || 0;

  // Validate input values to prevent NaN calculations
  if (
    entryPrice < 0 ||
    purchasePrice < 0 ||
    currentPrice < 0 ||
    investmentAmount < 0
  ) {
    console.error("Invalid input value. Please enter a non-negative number.");
    return;
  }

  // Calculate signal progress
  if (purchasePrice > 0) {
    const progress = (currentPrice / entryPrice) * 100 - 100;
    cells[11].textContent = `${progress.toFixed(2)}%`;
  }

  // Calculate profit/loss
  if (investmentAmount > 0) {
    const profitLoss =
      (currentPrice - purchasePrice) * (investmentAmount / purchasePrice);
    cells[12].textContent = `$${profitLoss.toFixed(2)}`;
  }
}

// Add event listener to add row button
addRowBtn.addEventListener("click", createRow);

// Create an initial row
createRow();
