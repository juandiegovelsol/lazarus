function validateTransaction(tx) {
  if (typeof tx !== "object") return false;
  if (!("id" in tx) || !("type" in tx) || !("amount" in tx)) return false;
  if (typeof tx.id !== "string" && typeof tx.id !== "number") return false;
  if (typeof tx.type !== "string") return false;
  if (typeof tx.amount !== "number" || tx.amount <= 0) return false;
  if (tx.type !== "credit" && tx.type !== "debit") return false;
  return true;
}

function filterTransactions(transactions) {
  const validTransactions = [];
  for (const tx of transactions) {
    if (validateTransaction(tx)) {
      validTransactions.push({
        id: tx.id,
        type: tx.type,
        amount: tx.amount,
      });
    }
  }
  return validTransactions;
}

function calculateSummary(transactions) {
  let totalAmount = 0;
  let credits = 0;
  let debits = 0;
  for (const tx of transactions) {
    totalAmount += tx.amount;
    if (tx.type === "credit") {
      credits += tx.amount;
    } else if (tx.type === "debit") {
      debits += tx.amount;
    }
  }
  return { totalAmount, credits, debits };
}

function sortTransactions(transactions) {
  return transactions.sort((a, b) => b.amount - a.amount);
}

function summarizeTransactions(transactions) {
  if (!Array.isArray(transactions)) {
    throw new Error("Expected an array of transaction records.");
  }

  const validTransactions = filterTransactions(transactions);
  const summary = calculateSummary(validTransactions);
  const sortedTransactions = sortTransactions(validTransactions);

  return {
    ...summary,
    processedTransactions: sortedTransactions,
  };
}

const transactions = [
  { id: "1", amount: 200, type: "credit" },
  { id: "2", amount: 50, type: "debit" },
  { id: "3", amount: -100, type: "debit" }, // Inválida
  { id: "4", amount: 150, type: "credit" },
  { id: "5", amount: 0, type: "debit" }, // Inválida
  { id: "6", amount: 50, type: "transfer" }, // Inválida
];

console.log(summarizeTransactions(transactions));
