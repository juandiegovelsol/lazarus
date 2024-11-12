const form = document.getElementById("loan-form");
const resultDiv = document.getElementById("result");

// Real-time validation for input fields
const inputs = form.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", validateField);
});

function validateField(e) {
  const field = e.target;
  let errorMessage = "";

  if (field.validity.valueMissing) {
    errorMessage = "This field is required";
  } else if (field.validity.rangeUnderflow) {
    errorMessage = "Value is too low";
  } else if (field.validity.rangeOverflow) {
    errorMessage = "Value is too high";
  } else if (field.validity.typeMismatch) {
    errorMessage = "Please enter a valid number";
  } else if (field.id === "name" && /[^a-zA-Z\s]/.test(field.value)) {
    errorMessage = "Name should only contain letters and spaces";
  }

  // Display dynamic error message
  let errorSpan = field.nextElementSibling;
  if (!errorSpan || !errorSpan.classList.contains("error-message")) {
    errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    field.after(errorSpan);
  }

  errorSpan.textContent = errorMessage;
  errorSpan.style.display = errorMessage ? "block" : "none";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const monthlyIncome = parseFloat(
    document.getElementById("monthly-income").value
  );
  const existingDebt = parseFloat(
    document.getElementById("existing-debt").value
  );
  const monthlyExpenses = parseFloat(
    document.getElementById("monthly-expenses").value
  );
  const desiredLoanAmount = parseFloat(
    document.getElementById("desired-loan-amount").value
  );
  const loanTerm = parseInt(document.getElementById("loan-term").value);
  const annualInterestRate = parseFloat(
    document.getElementById("annual-interest-rate").value
  );
  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value);
  const employmentStatus = document.getElementById("employment-status").value;
  const creditScore = parseInt(document.getElementById("credit-score").value);

  const debtToIncomeRatio = (existingDebt / monthlyIncome) * 100;
  const disposableIncome = monthlyIncome - existingDebt - monthlyExpenses;
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const loanTermInMonths = loanTerm * 12;
  const monthlyLoanPayment =
    (desiredLoanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -loanTermInMonths));

  let eligibilityDecision = "";
  let denialReason = "";

  if (debtToIncomeRatio > 35) {
    eligibilityDecision = "Denied";
    denialReason = "High debt-to-income ratio";
  } else if (loanTerm > 10) {
    eligibilityDecision = "Denied";
    denialReason = "Loan term exceeds 10 years";
  } else if (annualInterestRate > 10) {
    eligibilityDecision = "Denied";
    denialReason = "Interest rate is above 10%";
  } else if (age < 18 || age > 75) {
    eligibilityDecision = "Denied";
    denialReason = "Age is not within the eligible range";
  } else if (creditScore < 600) {
    eligibilityDecision = "Denied";
    denialReason = "Credit score is below the minimum required";
  } else if (disposableIncome < monthlyLoanPayment + 0.2 * monthlyIncome) {
    eligibilityDecision = "Denied";
    denialReason = "Insufficient disposable income to cover loan payments";
  } else {
    eligibilityDecision = "Approved";
  }

  const resultHtml = `
        <h2>Loan Eligibility Evaluation Result</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Employment Status:</strong> ${employmentStatus}</p>
        <p><strong>Credit Score:</strong> ${creditScore}</p>
        <p><strong>Monthly Income:</strong> $${monthlyIncome.toFixed(2)}</p>
        <p><strong>Existing Debt:</strong> $${existingDebt.toFixed(2)}</p>
        <p><strong>Monthly Expenses:</strong> $${monthlyExpenses.toFixed(2)}</p>
        <p><strong>Desired Loan Amount:</strong> $${desiredLoanAmount.toFixed(
          2
        )}</p>
        <p><strong>Loan Term:</strong> ${loanTerm} years</p>
        <p><strong>Annual Interest Rate:</strong> ${annualInterestRate}%</p>
        <p><strong>Debt-to-Income Ratio:</strong> ${debtToIncomeRatio.toFixed(
          2
        )}%</p>
        <p><strong>Disposable Income:</strong> $${disposableIncome.toFixed(
          2
        )}</p>
        <p><strong>Monthly Loan Payment:</strong> $${monthlyLoanPayment.toFixed(
          2
        )}</p>
        <p><strong>Eligibility Decision:</strong> ${eligibilityDecision}</p>
        ${
          eligibilityDecision === "Denied"
            ? `<p><strong>Denial Reason:</strong> ${denialReason}</p>`
            : ""
        }
    `;

  resultDiv.innerHTML = resultHtml;
});

document.getElementById("reset-button").addEventListener("click", () => {
  form.reset();
  resultDiv.innerHTML = "";
});

// Privacy protection - clear data when page is closed or refreshed
window.addEventListener("beforeunload", () => {
  form.reset();
});
