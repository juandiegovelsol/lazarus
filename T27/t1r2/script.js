const form = document.getElementById("calculator-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const totalCapital = parseFloat(
    document.getElementById("totalCapital").value
  );
  const entryPrice = parseFloat(document.getElementById("entryPrice").value);
  const stopLossPrice = parseFloat(
    document.getElementById("stopLossPrice").value
  );
  const riskPercentage = parseFloat(
    document.getElementById("riskPercentage").value
  );

  if (
    isNaN(totalCapital) ||
    isNaN(entryPrice) ||
    isNaN(stopLossPrice) ||
    isNaN(riskPercentage) ||
    totalCapital <= 0 ||
    entryPrice <= 0 ||
    stopLossPrice <= 0 ||
    riskPercentage <= 0
  ) {
    alert("Enter valid inputs in all fields.");
    return;
  }

  const isShortPosition = document.getElementById("position-type").checked;

  const riskPerShare = isShortPosition
    ? stopLossPrice - entryPrice
    : entryPrice - stopLossPrice;

  if (riskPerShare <= 0) {
    alert(
      "The Stop Loss price must be lower than the entry price for a long position or higher for a short position."
    );
    return;
  }

  const totalRisk = totalCapital * (riskPercentage / 100);

  const sharesToBuy = totalRisk / riskPerShare;

  const operationValue = sharesToBuy * entryPrice;

  resultDiv.style.display = "block";
  resultDiv.innerHTML = `Capital to invest: $${operationValue.toFixed(2)}`;
});
