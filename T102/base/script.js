const tableBody = document.querySelector("#investment-table tbody");
const addRowBtn = document.getElementById("add-row-btn");

function createRow() {
  const row = document.createElement("tr");
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
    const cell = document.createElement("td");

    if (type === "text" || type === "number") {
      const input = document.createElement("input");
      input.type = type;
      input.addEventListener("input", () => calculateRow(row));
      cell.appendChild(input);
    } else {
      cell.textContent = index === 11 ? "0%" : "$0.00";
    }

    row.appendChild(cell);
  });

  tableBody.appendChild(row);
}

function calculateRow(row) {
  const cells = row.querySelectorAll("td");
  const entryPrice = parseFloat(cells[1].querySelector("input").value) || 0;
  const purchasePrice = parseFloat(cells[8].querySelector("input").value) || 0;
  const currentPrice = parseFloat(cells[10].querySelector("input").value) || 0;
  const investmentAmount =
    parseFloat(cells[9].querySelector("input").value) || 0;

  if (purchasePrice > 0) {
    const progress = (currentPrice / entryPrice) * 100 - 100;
    cells[11].textContent = `${progress.toFixed(2)}%`;
  }

  if (investmentAmount > 0) {
    const profitLoss =
      (currentPrice - purchasePrice) * (investmentAmount / purchasePrice);
    cells[12].textContent = `$${profitLoss.toFixed(2)}`;
  }
}

addRowBtn.addEventListener("click", createRow);

createRow();
