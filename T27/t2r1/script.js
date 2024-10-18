const form = document.querySelector(".calculator-form");
const resultDiv = document.querySelector(".calculator-form__result");

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

  const riskPerShare =
    stopLossPrice - entryPrice > 0
      ? stopLossPrice - entryPrice
      : entryPrice - stopLossPrice;

  const totalRisk = totalCapital * (riskPercentage / 100);

  const sharesToBuy = totalRisk / riskPerShare;

  const operationValue = sharesToBuy * entryPrice;

  resultDiv.style.display = "block";
  resultDiv.innerHTML = `Capital to invest: $${operationValue.toFixed(2)}`;
});
